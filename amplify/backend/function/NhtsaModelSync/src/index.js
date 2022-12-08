/* Amplify Params - DO NOT EDIT
	API_V2MOTORSAFETYORG_GRAPHQLAPIIDOUTPUT
	API_V2MOTORSAFETYORG_MODELTABLE_ARN
	API_V2MOTORSAFETYORG_MODELTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require('axios')
const AWS = require('aws-sdk')

const makes = [
  'aston martin',
  'bmw',
  'mini',
  'rolls-royce',
  'mercedes-benz',
  'smart',
  'alfa romeo',
  'chrysler',
  'dodge',
  'fiat',
  'jeep',
  'maserati',
  'ram',
  'ferrari',
  'ford',
  'lincoln',
  'mercury',
  'buick',
  'cadillac',
  'chevrolet',
  'gmc',
  'hummer',
  'oldsmobile',
  'pontiac',
  'saturn',
  'corvette',
  'acura',
  'honda',
  'genesis',
  'hyundai',
  'kia',
  'isuzu',
  'mazda',
  'mclaren',
  'infiniti',
  'mitsubishi',
  'nissan',
  'saab',
  'suzuki',
  'jaguar',
  'land rover',
  'tesla',
  'lexus',
  'scion',
  'toyota',
  'audi',
  'bentley',
  'bugatti',
  'lamborghini',
  'porsche',
  'volkswagen',
  'lotus',
  'volvo'
]

const DYNAMODB_REGION = process.env.REGION
const DYNAMODB_TABLE_NAME = process.env.API_V2MOTORSAFETYORG_MODELTABLE_NAME

const docClient = new AWS.DynamoDB.DocumentClient({
  region: DYNAMODB_REGION
})
// https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/2015?format=json
const baseAPI = 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make'

async function fetchModels (make, year) {
  const url = `${baseAPI}/${make}/modelyear/${year}?format=json`
  const { data: { Results } } = await axios.get(url)
  return Array.from(new Set(Results.map(model => model.Model_Name)))
}

async function putModel (make, year, models) {
  try {
    await docClient.put({
      TableName: DYNAMODB_TABLE_NAME,
      Item: {
        make,
        year,
        models
      }
    }).promise()
    console.log('Updated models of ', make, year)
  } catch (e) {
    console.log(e)
  }
}

async function updateModel (make, year) {
  try {
    const models = await fetchModels(make, year)
    putModel(make, year, models)
  } catch (err) {
    console.log('Failed to get models of ', make, year)
    console.log(err)
  }
}

exports.handler = async (event) => {
  console.log('Start NhtsaModelSync')
  console.log('event', event)
  const currentYear = new Date().getFullYear()
  const nextYear = currentYear + 1

  const fromYear = event.fromYear || currentYear
  const chunk = 4
  const length = makes.length

  for (let year = fromYear; year <= nextYear; year++) {
    for (let i = 0; i < length; i += chunk) {
      const temp = makes.slice(i, i + chunk)
      const promises = []
      for (const make of temp) {
        promises.push(updateModel(make, year))
      }
      await Promise.allSettled(promises)
    }
  }
  console.log('Update models successfully')
}


