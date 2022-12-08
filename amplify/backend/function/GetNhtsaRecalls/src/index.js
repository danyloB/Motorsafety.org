const axios = require('axios')

async function handler (event) {
  const { query } = event.arguments
  const { year, model, make } = query
  const url = `https://webapi.nhtsa.gov/api/Recalls/vehicle/modelyear/${year}/make/${make}/model/${model}?format=json`
  try {
    const res = await axios.get(url)
    return res.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

exports.handler = handler
