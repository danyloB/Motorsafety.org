/* Amplify Params - DO NOT EDIT
	API_V2MOTORSAFETYORG_APPOINTMENTTABLE_ARN
	API_V2MOTORSAFETYORG_APPOINTMENTTABLE_NAME
	API_V2MOTORSAFETYORG_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const DYNAMODB_TABLE_NAME = process.env.API_V2MOTORSAFETYORG_APPOINTMENTTABLE_NAME
const DYNAMODB_REGION = 'us-west-2'
const ses = new AWS.SES({ region: DYNAMODB_REGION })

const docClient = new AWS.DynamoDB.DocumentClient({
  region: DYNAMODB_REGION
})

const toAddresses = ['support@motorsafety.org']

const infoTitles = {
  dealership: 'Dealership',
  email: 'Email',
  name: 'Customer Name',
  phone_number: 'Phone Number',
  make: 'Make',
  model: 'Model',
  year: 'Year',
  zip: 'Zip code',
  vin: 'VIN'
}

function getEmailSubject (appointment) {
  const prefix = '[v2.motorsafety] New Appointment:'
  if (appointment.dealership) {
    return `${prefix} ${appointment.dealership} - ${appointment.name}`
  } else if (appointment.make && appointment.model && appointment.year) {
    return `${prefix} ${appointment.make} - ${appointment.model} -${appointment.year} - ${appointment.name}`
  } else if (appointment.vin) {
    return `${prefix} ${appointment.vin} - ${appointment.name}`
  } else {
    return `${prefix} - ${appointment.name}`
  }
}

function sendEmail (appointment) {
  return new Promise((resolve, reject) => {
    const subject = getEmailSubject(appointment)
    const params = {
      Destination: {
        ToAddresses: toAddresses
      },
      Message: {
        Body: {
          Text: { Data: JSON.stringify(appointment, null, 2) },
          Html: {
            Charset: 'UTF-8',
            Data: getEmailBody(appointment)
          }
        },

        Subject: { Data: subject }
      },
      Source: 'dev@adaptiadesign.com'
    }

    ses.sendEmail(params).promise()
      .then(() => {
        resolve(true)
      })
      .catch(reject)
  })
}

async function saveAppointment (appointment) {
  const params = {
    TableName: DYNAMODB_TABLE_NAME,
    Item: appointment
  }
  await docClient.put(params).promise()
}

async function handler (event) {
  const appointment = event.arguments.input
  await saveAppointment(appointment)
  await sendEmail(appointment)
  return appointment
}

function getAppointmentInfo (appointment) {
  let res = ''
  for (const key of Object.keys(appointment)) {
    if (infoTitles[key]) {
      res += `
          <tr>
            <td align="left"
                style="border-top:1px solid #e0e0e0;padding:10px 0;vertical-align:top;color:#656565">
              ${infoTitles[key]}
            </td>
            <td align="right"
                style="border-top:1px solid #e0e0e0;padding:10px 0;vertical-align:top"><span
              style="font-weight:bold">${appointment[key]}</span></td>
          </tr>
      `
    }
  }
  return res
}

function getEmailBody (appointment) {
  return `

  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Appointment</title>
</head>

<body>
<table bgcolor="#f2f2f2" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 30px !important;">
  <tbody>
  <tr>
    <td>
      <div style="max-width:600px;margin:0 auto;font-size:16px;line-height:24px">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
          <tr>
            <td>
              <table border="0" cellpadding="0" cellspacing="0"
                     class="m_6488255211252466240card-box m_6488255211252466240first" width="100%">
                <tbody>
                <tr>
                  <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                      <tr>
                        <td style="background-color:white;padding-top:30px;padding-bottom:30px">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                            <tr>
                              <td align="center" style="padding-top:0;padding-bottom:20px"><a
                                href="https://www.motorsafety.org/" target="_blank">
                                <img
                                  src="https://res.cloudinary.com/motorsafety/image/upload/v2-motorsafety/assets/images/logo"
                                  alt="" width="120" height="30" style="vertical-align:middle" class="CToWUd"> </a></td>
                            </tr>
                            <tr>
                              <td class="m_6488255211252466240card-row"
                                  style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px">
                                <h3
                                  style="margin-top:0;margin-bottom:0;font-family:'Montserrat',Helvetica,Arial,sans-serif;font-weight:700;font-size:20px;line-height:30px;color:#222">
                                  New appointment has been created
                                </h3></td>
                            </tr>

                            <tr>
                              <td class="m_6488255211252466240card-row"
                                  style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tbody>
                                  ${getAppointmentInfo(appointment)}
                                  <tr>
                                    <td colspan="2" style="line-height:0;border-top:1px solid #e0e0e0"></td>
                                  </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td class="m_6488255211252466240card-row"
                                  style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:10px">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tbody>
                                  <tr>
                                    <td
                                      style="font-size:16px;line-height:24px;background-color:#f9f9f9;padding:20px;font-style:italic">
                                      ${appointment.message}
                                    </td>
                                  </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td class="m_6488255211252466240card-row"
                                  style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:20px">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tbody>
                                  <tr>
                                    <td style="font-size:0;line-height:0">&nbsp;</td>
                                  </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td class="m_6488255211252466240card-row"
                                  style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:20px">
                                <div class="m_6488255211252466240full-width-divider">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                    <tr>
                                      <td style="font-size:0;line-height:0;border-top:3px solid #f2f2f2">&nbsp;</td>
                                    </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td class="m_6488255211252466240card-row"
                                  style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;word-break:break-word;padding-left:20px;padding-right:20px;padding-top:30px">
                                <div style="padding-top:10px">Thanks for your time,<br>Motorsafety Team</div>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
          <tr>
            <td align="center" width="100%"
                style="color:#656565;font-size:12px;line-height:24px;padding-bottom:30px;padding-top:30px">
              <a
                href="https://www.motorsafety.org/"
                style="color:#656565;text-decoration:underline" target="_blank">
                Unsubscribe
              </a>
              &nbsp; | &nbsp; <a href="https://dev.d2r617sbdas6l1.amplifyapp.com/privacy"
                                 style="color:#656565;text-decoration:underline" target="_blank">
              Privacy</a> &nbsp; | &nbsp;
              <a href="https://dev.d2r617sbdas6l1.amplifyapp.com/terms"
                 style="color:#656565;text-decoration:underline" target="_blank">
                Terms
              </a>
              <div style="font-family:Helvetica,Arial,sans-serif;word-break:normal"
                   class="m_6488255211252466240address-link">
                23131 Verdugo Dr. Laguna Hills, CA 92653
              </div>
              <div style="font-family:Helvetica,Arial,sans-serif;word-break:normal">
                © MotorSafety, Inc. All Rights Reserved.
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </td>
  </tr>
  </tbody>
</table>
</body>
</html>

  `
}

exports.handler = handler
