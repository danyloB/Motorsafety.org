const tableName = 'V2FlatRecall'
const AWS_CREDENTIALS_PROFILE = 'Motorsafety'

const scanParams = {
  TableName: tableName
}
const AWS = require('aws-sdk')
const DYNAMODB_REGION = 'us-west-2'
const credentials = new AWS.SharedIniFileCredentials({
  profile: AWS_CREDENTIALS_PROFILE
})
AWS.config.credentials = credentials
const docClient = new AWS.DynamoDB.DocumentClient({
  region: DYNAMODB_REGION
})
docClient.scan(scanParams, function (err, data) {
  if (err) {
    console.log(err)
    // eslint-disable-next-line brace-style
  } else {
    data.Items.forEach(function (obj, i) {
      console.log(i)
      console.log(obj)
      const params = {
        TableName: tableName,
        Key: {
          recall_id: obj.recall_id
        }
      }

      docClient.delete(params, function (err, data) {
        // eslint-disable-next-line brace-style
        if (err) { console.log(err) } // an error occurred
        else { console.log(data) } // successful response
      })
    })
  }
})
