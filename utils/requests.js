const subscribeUrl = 'https://app.recallmasters.com/api/v1/subscriptions/?use_type=rm_mobile_ios'
const createRMBOUserUrl = 'https://app.recallmasters.com/api/v1/auth/register/?use_type=rm_mobile_ios'
const getRMBOAPIKeyUrl = 'https://app.recallmasters.com/api/v1/auth/login/?use_type=rm_mobile_ios'

export default {
  createRMBOUser: (data, axios) => axios.post(createRMBOUserUrl, data),
  getRMBOAPIKey: (data, axios) => axios.post(getRMBOAPIKeyUrl, data),
  subscribePost: (data, axios) => axios.post(subscribeUrl, data)
}
