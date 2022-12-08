
import filter from 'lodash/filter'

import { getImageId, getPhoneNumber } from '.'

export const DEALERS_PER_PAGE = 15

const isValidLat = val => val >= -90 && val <= 90
const isValidLng = val => val >= -180 && val <= 180

export function transformDealers (dealers) {
  return dealers.map((dealer) => {
    return transformDealer(dealer)
  })
}

export function transformDealer (dealerObject) {
  const dealer = {}

  // eslint-disable-next-line no-unused-vars
  for (const key of Object.keys(dealerObject)) {
    if (dealerObject[key] !== '') {
      const attr = toSlug(key)
      if (attr === 'phone_number_service') {
        dealer[attr] = (dealerObject[key] + '').trim()
      } else if (attr === 'dealer_slug') {
        dealer.slug = (dealerObject[key] + '').trim()
      } else {
        dealer[attr] = dealerObject[key]
      }
    }
  }
  // const brands = dealer.brand.split(',')
  // const brandItem = brands.map((item) => {
  //   return item.trim().replace(/\s+/g, '-')
  // })
  // dealer.brand = brandItem.join(',')
  if (typeof dealer.latitude === 'string' || typeof dealer.longitude === 'string') {
    dealer.latitude = +dealer.latitude
    dealer.longitude = +dealer.longitude
  }
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

  dealer.imageId = getImageId(dealer.brand)
  dealer.phone = getPhoneNumber(dealer)

  // For elasticsearch geo location search
  if (dealer.latitude && dealer.longitude) {
    dealer.location = `${dealer.latitude},${dealer.longitude}`
  }

  return dealer
}

export function toSlug (text) {
  return text.trim().toLowerCase().replace(/\W+/g, '+').replace(/(^\W+)|(\W+$)/g, '')
}

export async function getDealers (content) {
  return await content('dealers/motorsafety-org-dealers').fetch()
}

export async function getDealer (content, city_state_slug, dealer_slug) {
  const { body } = await getDealers(content)

  const dealer = filter(body, (item) => {
    return item.city_state_slug.toLowerCase() === city_state_slug.toLowerCase() &&
      item.dealer_slug.toLowerCase() === dealer_slug.toLowerCase()
  })

  return transformDealer(dealer[0])
}
