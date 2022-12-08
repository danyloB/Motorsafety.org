const axios = require('axios')

async function handler (event) {
  const token = '4dd7da65f953f2091f970ef8b2fad47ca2872ad3'
  const { vin } = event.arguments
  const url = `https://api.recallmasters.com/api/v2/lookup/${vin}`
  try {
    const options = {
      headers: {
        Authorization: `Token ${token}`
      }
    }
    const res = await axios.get(url, options)
    return res.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

exports.handler = handler
