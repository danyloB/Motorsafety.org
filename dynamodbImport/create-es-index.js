const AWS = require('aws-sdk')

// --- start user config ---

const AWS_CREDENTIALS_PROFILE = 'Motorsafety'
const DYNAMODB_REGION = 'us-west-2'
const DYNAMODB_TABLENAME = 'V2_Motorsafety_Dealers'
const ES_ENDPOINT = 'https://search-amplify-elasti-ut295d47m01m-xgct3f6kzstbglqorava2ezlb4.us-west-2.es.amazonaws.com/'
const INDEX_NAME = 'dealer'
// --- end user config ---

const credentials = new AWS.SharedIniFileCredentials({
  profile: AWS_CREDENTIALS_PROFILE
})
AWS.config.credentials = credentials
const docClient = new AWS.DynamoDB.DocumentClient({
  region: DYNAMODB_REGION
})

const { Client } = require('@elastic/elasticsearch')
const { createAWSConnection } = require('@acuris/aws-es-connection')

// const awsCredentials = await awsGetCredentials()
const AWSConnection = createAWSConnection(credentials)
const client = new Client({
  node: ES_ENDPOINT,
  Connection: AWSConnection
})

const createIndex = async () => {
  try {
    const exists = await client.indices.exists({
      index: INDEX_NAME
    })
    if (!exists.body) {
      await client.indices.create({
        index: INDEX_NAME,
        body: {
          mappings: {
            doc: {
              properties: {
                location: {
                  type: "geo_point"
                }
              }
            }
          }
        }
      })
      console.log('Created dealers index')
    } else {
      console.log('Index already existed')
    }
  } catch (err) {
    console.log(err)
  }
}

async function indexDealers () {
  await createIndex()
  const params = { TableName: DYNAMODB_TABLENAME }
  let items
  do {
    items = await docClient.scan(params).promise()
    const count = items.Items.length
    console.log(`Fetched ${count} items from DynamoDB`)
    for (const item of items.Items) {
      if (item.longitude && item.latitude) {
        item.location = `${item.latitude},${item.longitude}`
      }
      try {
        await client.update({
          index: INDEX_NAME,
          id: item.id,
          body: {
            doc: item,
            doc_as_upsert: true
          }
        })
      } catch (err) {
        console.log('-------------------')
        console.log(JSON.stringify(err.meta.body, null, 2))
        console.log(item)
      }
    }
    console.log(`Indexed for ${count} items`)
    params.ExclusiveStartKey = items.LastEvaluatedKey
  } while (typeof items.LastEvaluatedKey !== 'undefined')
  console.log('create all records in ES')
}

// indexDealers()

createIndex()
