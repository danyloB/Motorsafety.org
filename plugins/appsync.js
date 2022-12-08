import { Auth } from 'aws-amplify'
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'
import awsmobile from '../aws-exports'
const protectedRoutes = [
  'my-garage'
]

Auth.configure(awsmobile)

export default async ({ app, store, route, redirect }, inject) => {
  const credentials = await Auth.currentCredentials()
  const appSyncConfig = {
    url: awsmobile.aws_appsync_graphqlEndpoint,
    region: awsmobile.aws_appsync_region,
    auth: {
      type: AUTH_TYPE[awsmobile.aws_appsync_authenticationType],
      credentials: () => Auth.currentCredentials()
    },
    disableOffline: true // https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/102
  }

  const appSyncOptions = {
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network'
      }
    }
  }

  const client = new AWSAppSyncClient(appSyncConfig, appSyncOptions)
  const hydratedClient = await client.hydrated()
  inject('appsyncClient', hydratedClient)
  let user = null
  if (credentials.authenticated) {
    user = await Auth.currentAuthenticatedUser()
  } else if (process.client && protectedRoutes.includes(route.name)) {
    store.dispatch('setUser', null)
    window.onNuxtReady(() => { window.$nuxt.$router.push('/login/') })
  }
  store.dispatch('setUser', user)
}
