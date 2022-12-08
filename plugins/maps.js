import Vue from 'vue'

import * as VueGoogleMaps from '@/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_MAPS_API_KEY,
    libraries: 'places'
  }
  // load: { key: 'AIzaSyCMyTz7yjEvThjWScRL2kiO9y8ktJVhnlQ' }
})
