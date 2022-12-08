const async = require('async')
const AWS = require('aws-sdk')
const xlsx = require('xlsx')

// --- start user config ---

const AWS_CREDENTIALS_PROFILE = 'Motorsafety'
const FILENAME = './1652ddb14de43258.xlsx'
const DYNAMODB_REGION = 'us-west-2'
const DYNAMODB_TABLE_NAME = 'V2_Motorsafety_Dealers'

// --- end user config ---

const credentials = new AWS.SharedIniFileCredentials({
  profile: AWS_CREDENTIALS_PROFILE
})

AWS.config.credentials = credentials
const docClient = new AWS.DynamoDB.DocumentClient({
  region: DYNAMODB_REGION
})

function toSlug (text) {
  return text.toLowerCase().replace(/[^a-z0-9+-_\s]/g, '') // remove invalid chars
    .replace(/\s+/g, '+') // collapse whitespace and replace by -
    .replace(/-+/g, '+')
    .replace(/\++/g, '+')
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function toTitleCaseSlug (text) {
  const slug = toSlug(text)
  return slug.split('+').map(s => capitalizeFirstLetter(s)).join('+')
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
  const brandItem = brands.map((item) => {
    return item.trim().replace(/\s+/g, '-')
  })
  dealer.brand = brandItem.join(', ')
  if (dealer.city) {
    const city = toTitleCaseSlug(dealer.city)
    dealer.city_state_slug = `${city}.${dealer.state}`
  }
  dealer.slug = toSlug(dealer.name)
  if (!isValidLat(dealer.latitude) || !isValidLng(dealer.longitude)) {
    dealer.latitude = null
    dealer.longitude = null
  }
  if (typeof dealer.zip === 'string') {
    const val = dealer.zip.split('-')[0]
    const zip = Number.isNaN(+val) ? null : +val
    console.log('convert zip from ', dealer.zip, ' to ', zip)
    dealer.zip = zip
  }
  return dealer
}

function importData () {
  const wb = xlsx.readFile(FILENAME)
  const sheetName = wb.SheetNames[0]
  const dealers = xlsx.utils.sheet_to_json(wb.Sheets[sheetName])
  const splitArrays = []
  const size = 25
  while (dealers.length > 0) {
    splitArrays.push(dealers.splice(0, size))
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
    })

    docClient.batchWrite(params, function (err, res, cap) {
      console.log('done going next')
      if (err == null) {
        console.log('Success chunk #' + chunkNo)
      } else {
        console.log(err)
        console.log('Fail chunk #' + chunkNo)
      }
      chunkNo++
      callback()
    })
  })
}

importData()
