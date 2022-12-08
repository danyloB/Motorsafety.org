const fs = require('fs')
const parse = require('csv-parse')
const async = require('async')
const AWS = require('aws-sdk')
const { getType } = require('./types.js')

// --- start user config ---

const AWS_CREDENTIALS_PROFILE = 'motorsafety'
// const CSV_FILENAME = './FLAT_RCL-FLAT_RCL.csv'
const CSV_FILENAME = './nhtsa_vehicle_recalls.csv'
const DYNAMODB_REGION = 'us-west-2'
const DYNAMODB_TABLENAME = 'V2FlatRecall-fskst7cs7rf2la5brgtffra4ly-dev'

// --- end user config ---

const makes = [
  'aston martin', 'bmw', 'mini',
  'rolls royce', 'mercedes benz', 'smart',
  'alfa romeo', 'chrysler', 'dodge',
  'fiat', 'jeep', 'maserati',
  'ram', 'ferrari', 'ford',
  'lincoln', 'mercury', 'buick',
  'caddilac', 'chevrolet', 'gsmc',
  'hummer', 'oldsmobile', 'pontiac',
  'saturn', 'corvette', 'acura',
  'honda', 'genesis', 'hyundai',
  'kia', 'isuzu', 'mazda',
  'mclaren', 'infiniti', 'mitsubishi',
  'nissan', 'saab', 'suzuki',
  'jaguar', 'land rover', 'tesla',
  'lexus', 'scion', 'toyota',
  'audi', 'bentley', 'bugatti',
  'lamborghini', 'porsche', 'volkswagen',
  'lotus', 'volvo'
]

function nomalize (text) {
  return text ? text.toLowerCase().split('-').join(' ') : ''
}

function sentenceCase (input) {
  input = (input === undefined || input === null) ? '' : input.toLowerCase()
  return input.toString().replace(/(^|\. *)([a-z])/g, function (match, separator, char) {
    return separator + char.toUpperCase()
  })
}

const capitalize = str =>
  (str || '').toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())

// const credentials = new AWS.SharedIniFileCredentials({
//   profile: AWS_CREDENTIALS_PROFILE
// })

// AWS.config.credentials = credentials
const docClient = new AWS.DynamoDB.DocumentClient({
  region: DYNAMODB_REGION
})

const rs = fs.createReadStream(CSV_FILENAME)
const parser = parse({
  columns: true,
  delimiter: ',',
  relax_column_count: true,
// eslint-disable-next-line handle-callback-err
}, function (err, csvData) {
  if (err) {
    console.log(err)
  }
  const data = csvData.filter(record => makes.includes(nomalize(record.MAKETXT)))
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
    const tableRequestItems = []
    itemData.forEach((item) => {
      for (const key of Object.keys(item)) {
        // An AttributeValue may not contain an empty string
        if (item[key] === '') {
          delete item[key]
        }
      }
      item.recall_id = item.RECORD_ID

      const requestItem = {
        recall_id: +item.RECORD_ID,
        make: capitalize(item.MAKETXT),
        model: capitalize(item.MODELTXT),
        model_year: item.YEARTXT,
        manufacturer: item.MFGTXT,
        summary: sentenceCase(item.DESC_DEFECT),
        name: item.CAMPNO,
        nhtsa_campaign_number: item.CAMPNO,
        component: item.COMPNAME,
        notes: sentenceCase(item.NOTES),
        conequence: sentenceCase(item.CONEQUENCE_DEFECT),
        remedy: sentenceCase(item.CORRECTIVE_ACTION),
        type: getType(item.COMPNAME),
        recall_date: item.RCDATE
      }
      tableRequestItems.push({
        PutRequest: {
          Item: requestItem
        }
      })
    })
    params.RequestItems[DYNAMODB_TABLENAME] = tableRequestItems

    docClient.batchWrite(params, function (err, res, cap) {
      console.log('done going next')
      if (err == null) {
        console.log('Success chunk #' + chunkNo)
      } else {
        console.log(tableRequestItems[0])
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
