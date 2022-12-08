const fs = require('fs')
const parse = require('csv-parse')
const async = require('async')
const AWS = require('aws-sdk')
const { TYPES, getColumnValue } = require('./utils')

// --- start user config ---

const AWS_CREDENTIALS_PROFILE = 'Motorsafety'
const CSV_FILENAME = './output.csv'
const DYNAMODB_REGION = 'us-west-2'
const DYNAMODB_TABLENAME = 'DealerOutput   dd'

// --- end user config ---

const credentials = new AWS.SharedIniFileCredentials({
  profile: AWS_CREDENTIALS_PROFILE
})
AWS.config.credentials = credentials
const docClient = new AWS.DynamoDB.DocumentClient({
  region: DYNAMODB_REGION
})
const selectedColumns = {
  id: TYPES.STRING,
  dealership: TYPES.STRING,
  has_deals: TYPES.BOOLEAN,
  has_people: TYPES.BOOLEAN,
  city: TYPES.STRING,
  city_key: TYPES.STRING,
  phone: TYPES.STRING,
  postal_code: TYPES.STRING,
  zip: TYPES.STRING,
  address: TYPES.STRING,
  state: TYPES.STRING,
  website: TYPES.STRING,
  brand: TYPES.STRING,
  service_website: TYPES.STRING,
  brand_score: TYPES.NUMBER,
  city_score: TYPES.NUMBER,
  overall_score: TYPES.NUMBER,
  unique: TYPES.STRING,
  service_appointment_system: TYPES.STRING,
  region: TYPES.STRING,
  local_phone_number: TYPES.STRING,
  latitude: TYPES.STRING,
  longitude: TYPES.STRING,
  poc_phone: TYPES.STRING
}
const keys = Object.keys(selectedColumns)

const rs = fs.createReadStream(CSV_FILENAME)
const parser = parse({
  columns: true,
  delimiter: ','
}, function (err, data) {
  if (err) {
    console.log(err)
  }
  const splitArrays = []
  const size = 25

  while (data.length > 0) {
    splitArrays.push(data.splice(0, size))
  }
  let chunkNo = 1

  async.each(splitArrays, function (itemData, callback) {
    const params = {
      RequestItems: {}
    }
    params.RequestItems[DYNAMODB_TABLENAME] = []
    itemData.forEach((item) => {
      for (const key of Object.keys(item)) {
        // An AttributeValue may not contain an empty string
        if (item[key] === '' || !keys.includes(key)) {
          delete item[key]
        } else {
          item[key] = getColumnValue(item[key], selectedColumns[key])
        }
      }
      item.id = item.id || item.dealer_id
      if (item.id) {
        params.RequestItems[DYNAMODB_TABLENAME].push({
          PutRequest: {
            Item: {
              ...item
            }
          }
        })
      }
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
  }, function () {
    // run after loops
    console.log('all data imported....')
  })
})
rs.pipe(parser)
