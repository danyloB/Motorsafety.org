import fs from 'fs'
import csvtojsonV2 from 'csvtojson/v2'
import { getImageId, getPhoneNumber } from '../utils'

const DEFAULT_JSON_SPACE = ''

const jsonSavable = (data, space = DEFAULT_JSON_SPACE) =>
  JSON.stringify(data, null, space)

const isValidLat = val => val >= -90 && val <= 90
const isValidLng = val => val >= -180 && val <= 180

const transformToSlug = text =>
  text.trim().toLowerCase().replace(/\W+/g, '+').replace(/(^\W+)|(\W+$)/g, '')
const transformToLowerCase = text => text.trim().toLowerCase()
const transformToNum = txt => +txt
const transformToBool = txt => ['true', '1'].includes(txt.toLowerCase())

const importData = (cb, space = DEFAULT_JSON_SPACE) => {
  Promise.resolve(cb()).then(({ summary = [], state_dealers = {} }) => {
    return Promise.all([
      summary.length > 0
        ? fs.promises.writeFile('./content/auto/dealers/list.json', jsonSavable(summary, space))
        : Promise.resolve(null),
      ...Object.keys(state_dealers).map((s) => {
        const list = state_dealers[s]
        if (list.length < 1) {
          return Promise.resolve(null)
        }
        return fs.promises.writeFile('./content/auto/dealers/' + s + '.json', jsonSavable(Object.values(list), space))
      })
    ])
  }).then(() => {
    console.log('Successfully imported dealers')
  }).catch((err) => {
    console.log('Failed to import dealers data: %s', err.message || err)
  })
}

const importDealers = (space = DEFAULT_JSON_SPACE) => {
  return importData(async () => {
    const dealers = await csvtojsonV2({
      trim: true,
      headers: [
        'id',
        'crm_id',
        'name',
        'dealerSlug',
        'city_state_slug',
        'brand',
        'website',
        'address',
        'city',
        'state',
        'zip',
        'latitude',
        'longitude',
        'phone_number_service',
        'phone_number_main',
        'service_hours',
        'utc_offset',
        'gplace_id',
        'gplace_url',
        'dealerID',
        'trusted'
      ],
      colParser: {
        id: transformToNum,
        crm_id: transformToNum,
        latitude: transformToNum,
        longitude: transformToNum,
        dealerID: transformToNum,
        gplace_id: transformToNum,
        trusted: transformToBool,
        dealerSlug: transformToSlug,
        zip: (txt) => {
          const val = txt.split('-')[0]
          return Number.isNaN(+val) ? null : +val
        },
        image_id: (txt) => {
          return getImageId(txt)
        },
        phone: (txt) => {
          return getPhoneNumber(txt)
        }
      }
    })
      .fromFile('./content/dealers/motorsafety-org-dealers.csv')
      .subscribe((data) => {
        data.image_id = getImageId(data.brand)
        data.phone = getPhoneNumber(data)
        data.cityStateSlug = transformToLowerCase(data.city_state_slug)
        data.slug = `${data.city_state_slug}/${data.dealerSlug}`

        if (!isValidLat(data.latitude) || !isValidLng(data.longitude)) {
          data.latitude = null
          data.longitude = null
        }
        if (data.latitude && data.longitude) {
          data.location = `${data.latitude},${data.longitude}`
        }

        data.brandsList = data.brand && data.brand.length > 0
          ? data.brand.toLowerCase().split(',')
          : []

        return data
      })

    const summary = []
    const state_dealers = {}
    for (const dealer of dealers) {
      if (!(dealer.state in state_dealers)) {
        state_dealers[dealer.state] = []
      }
      state_dealers[dealer.state].push(dealer)

      summary.push({
        id: dealer.id,
        zip: dealer.zip,
        slug: dealer.slug,
        state: dealer.state,
        city: dealer.city.replace(/\s/g, '-'),
        brandsList: dealer.brandsList,
        dealerSlug: dealer.dealerSlug,
        cityStateSlug: dealer.cityStateSlug
      })
    }

    return {
      summary,
      state_dealers
    }
  })
}

importDealers(process.env.JSON_SPACE || DEFAULT_JSON_SPACE)
