import brands from './brandImages'

export function uuidv4 () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function sanitizeText (text) {
  return text.replace(/[^a-zA-Z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-')
}

export function toSlug (text) {
  return sanitizeText(text).toLowerCase()
}

export function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getImageId (brand) {
  const defaultImage = 'v2-motorsafety/assets/images/default-logo'
  if (!brand) {
    return defaultImage
  }
  const list = brand.split(',')
  const len = list.length
  for (let i = 0; i < len; i++) {
    const name = list[i].trim().toLowerCase()
    if (brands[name]) {
      return brands[name]
    }
  }
  return defaultImage
}

export function getListBrands (brand) {
  const defaultImage = 'v2-motorsafety/assets/images/default-logo'
  const res = []
  if (!brand) {
    return []
  }
  const list = brand.split(',')
  const len = list.length
  for (let i = 0; i < len; i++) {
    const brandName = list[i].trim()
    const key = list[i].trim().toLowerCase()
    const image_id = brands[key] ? brands[key] : defaultImage
    res.push({
      name: brandName,
      image_id
    })
  }
  return res
}
export function resizeImage (url, size = 'w_45,c_scale') {
  const prefix = 'https://res.cloudinary.com/motorsafety/image/upload/'
  const index = prefix.length
  if (url && url.startsWith(prefix)) {
    return url.substring(0, index) + size + '/' + url.substr(index)
  }
  return url
}

export function getArchives () {
  const now = new Date()
  let y = now.getFullYear()
  let m = now.getMonth()
  const res = []
  const end = {
    year: 2015,
    month: 3
  }
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  while (y > end.year || (y === end.year && m >= end.month)) {
    res.push({
      name: `${monthNames[m]} ${y}`,
      month: `0${m + 1}`.substr(-2),
      year: y
    })
    m = m - 1
    if (m < 0) {
      m = 11
      y = y - 1
    }
  }
  return res
}

export function getPhoneNumber (dealer) {
  const phoneString = dealer.phone_number_service || dealer.phone_number_main
  if (!phoneString) { return null }
  return phoneString.replace(/\D/g, '')
}

const types = {
  'air-bags': ['AIR BAGS'],
  'autonomous-driver-assist': [
    'BACK OVER PREVENTION',
    'ELECTRONIC STABILITY CONTROL',
    'FORWARD COLLISION AVOIDANCE',
    'LANE DEPARTURE',
    'TRACTION CONTROL SYSTEM',
    'VEHICLE SPEED CONTROL'
  ],
  brakes: [
    'PARKING BRAKE',
    'SERVICE BRAKES',
    'SERVICE BRAKES, AIR',
    'SERVICE BRAKES, ELECTRIC',
    'SERVICE BRAKES, HYDRAULIC'
  ],
  communications: ['COMMUNICATIONS'],
  'electrical-system': ['ELECTRICAL SYSTEM'],
  'engine-and-cooling': ['ENGINE AND ENGINE COOLING', 'ENGINE'],
  equipment: ['EQUIPMENT'],
  'fuel-system': ['FUEL SYSTEM'],
  'hybrid-ev': ['HYBRID PROPULSION SYSTEM'],
  latches: ['LATCHES/LOCKS/LINKAGES', 'TRAILER HITCHES'],
  'lighting-systems': ['INTERIOR LIGHTING', 'EXTERIOR LIGHTING'],
  'power-train': ['POWER TRAIN'],
  seating: ['CHILD SEAT', 'SEATS', 'SEAT BELTS'],
  steering: ['STEERING'],
  structure: ['STRUCTURE'],
  suspension: ['SUSPENSION'],
  'tires-wheels': ['TIRES', 'WHEELS'],
  'unknown-other': [],
  visibility: ['VISIBILITY']
}

const defaultType = 'unknown-other'

export function getType (text) {
  for (const key of Object.keys(types)) {
    for (const prefix of types[key]) {
      if (text.startsWith(prefix)) {
        return toSlug(key)
      }
    }
  }

  return defaultType
}

export function chunkArray (arr, size) {
  const arrayLength = arr.length
  const res = []

  for (let index = 0; index < arrayLength; index += size) {
    const chucked = arr.slice(index, index + size)
    res.push(chucked)
  }

  return res
}

export function getState (place) {
  let state = ''
  place.address_components.forEach((comp) => {
    if (comp.types.includes('administrative_area_level_1')) {
      state = comp.short_name
    }
  })
  return state
}

export function getCity (place) {
  let city = place.name
  const matches = city.match(/\d+/g)
  if (matches && matches.length > 1) {
    const splits = city.split(matches[matches.length - 1])
    city = splits[splits.length - 1].trim()
  }
  return city
}

export function getZip (place) {
  let zip
  place.address_components.forEach((comp) => {
    if (comp.types.includes('postal_code')) {
      zip = comp.short_name
    }
  })
  return zip
}
