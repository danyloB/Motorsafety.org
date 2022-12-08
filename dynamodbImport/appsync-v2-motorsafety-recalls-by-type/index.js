// Load the AWS SDK for Node.js
const AWS = require('aws-sdk')
const DYNAMODB_REGION = 'us-west-2'
AWS.config.update({
  region: DYNAMODB_REGION
})

// Create the DynamoDB service object
const DYNAMODB_TABLENAME = 'V2FlatRecall-fskst7cs7rf2la5brgtffra4ly-dev'
const DYNAMODB_COUNT_TABLENAME = 'V2FlatRecallCountByType-fskst7cs7rf2la5brgtffra4ly-dev'
const AWS_CREDENTIALS_PROFILE = 'Motorsafety'
// const credentials = new AWS.SharedIniFileCredentials({
//   profile: AWS_CREDENTIALS_PROFILE
// })
// AWS.config.credentials = credentials
const docClient = new AWS.DynamoDB.DocumentClient({
  region: DYNAMODB_REGION
})

const types = [
  'air-bags',
  'autonomous-driver-assist',
  'brakes',
  'communications',
  'electrical-system',
  'engine-and-cooling',
  'equipment',
  'fuel-system',
  'hybrid-ev',
  'latches',
  'lighting-systems',
  'power-train',
  'seating',
  'steering',
  'structure',
  'suspension',
  'tires-wheels',
  'unknown-other',
  'visibility'
]

async function updateCount () {
  for (const type of types) {
    const params = {
      TableName: DYNAMODB_TABLENAME,
      IndexName: 'recallsByType',
      KeyConditionExpression: '#type = :type',
      ExpressionAttributeNames: { '#type': 'type' },
      ExpressionAttributeValues: { ':type': type }
    }
    const data = await docClient
      .query(params)
      .promise()
    await docClient
      .put({
        TableName: DYNAMODB_COUNT_TABLENAME,
        Item: {
          type,
          count: data.Count
        }
      })
      .promise()
    console.log(type, data.Count)
  }
}

updateCount()
