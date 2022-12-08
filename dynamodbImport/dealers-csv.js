const fs = require('fs')
const parse = require('csv-parse')
const async = require('async')
const AWS = require('aws-sdk')

const FILENAME = '../content/dealers/motorsafety-org-dealers.csv'
const DYNAMODB_REGION = 'us-west-2'
const DYNAMODB_TABLE_NAME = 'Dealer-fskst7cs7rf2la5brgtffra4ly-dev'

const docClient = new AWS.DynamoDB.DocumentClient({
  region: DYNAMODB_REGION
})

function toSlug (text) {
  return text.trim().toLowerCase().replace(/\W+/g, '-').replace(/(^\W+)|(\W+$)/g, '')
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function toTitleCaseSlug (text) {
  const slug = toSlug(text)
  return slug.split('-').map(s => capitalizeFirstLetter(s)).join('-')
}

const isValidLat = val => val >= -90 && val <= 90
const isValidLng = val => val >= -180 && val <= 180

function getDealer (item) {
  const dealer = {}
  for (const key of Object.keys(item)) {
    // An AttributeValue may not contain an empty string
    if (item[key] !== '') {
      const attr = toSlug(key)
      if (attr === 'phone_number_service') {
        dealer[attr] = (item[key] + '').trim()
      } else {
        dealer[attr] = item[key]
      }
    }
  }
  const brands = dealer.brand.split(',')
  const brandItem = brands.map((brand) => {
    return brand.trim().replace(/\s+/g, '-')
  })
  dealer.brand = brandItem.join(',')
  if (dealer.city) {
    const city = toTitleCaseSlug(dealer.city)
    const state = dealer.state.trim()
    dealer.city_state_slug = `${city}.${state}`
  }
  dealer.slug = toSlug(dealer.name)
  if (!isValidLat(dealer.latitude) || !isValidLng(dealer.longitude)) {
    dealer.latitude = null
    dealer.longitude = null
  }
  if (typeof dealer.zip === 'string') {
    const val = dealer.zip.split('-')[0]
    dealer.zip = Number.isNaN(+val) ? null : +val
  }

  if (typeof dealer.id === 'string') {
    dealer.id = +dealer.id
  }

  // For elasticsearch geo location search
  if (dealer.latitude && dealer.longitude) {
    dealer.location = `${dealer.latitude},${dealer.longitude}`
  }

  return dealer
}

function importDataCSV () {
  const rs = fs.createReadStream(FILENAME)
  const parser = parse({
    columns: true,
    delimiter: ','
    // eslint-disable-next-line handle-callback-err
  }, (err, csvData) => {
    if (err) {
      console.log(err)
    }

    const splitArrays = []
    const size = 25
    const data = csvData
    let totalNumber = 0
    const uniqueCityStateSlugs = []

    while (data.length > 0) {
      splitArrays.push(data.splice(0, size))
    }
    let chunkNo = 1

    async.each(splitArrays, function (itemData, callback) {
      const params = {
        RequestItems: {}
      }
      params.RequestItems[DYNAMODB_TABLE_NAME] = []
      itemData.forEach((item) => {
        const dealer = getDealer(item)
        params.RequestItems[DYNAMODB_TABLE_NAME].push({
          PutRequest: {
            Item: {
              ...dealer
            }
          }
        })

        ++totalNumber;

        if (!uniqueCityStateSlugs.includes(dealer.city_state_slug)) {
          uniqueCityStateSlugs.push(dealer.city_state_slug)
        }
      })

      docClient.batchWrite(params, function (error, res, cap) {
        console.log('done going next')
        if (error == null) {
          console.log('Success chunk #' + chunkNo)
        } else {
          console.log(error)
          console.log('Fail chunk #' + chunkNo)
        }
        chunkNo++
        callback()
      })

      console.info(`Total number of dealers imported = ${totalNumber}`)
      console.info(`Total number of unique city states imported = ${uniqueCityStateSlugs.length}`)
    })
  })
  rs.pipe(parser)
}

importDataCSV()
