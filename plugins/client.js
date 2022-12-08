import Vue from 'vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import carousel from 'vue-owl-carousel'
import VueSelect from 'vue-select'
import VueIntercom from 'vue-intercom'
import VueTelInput from 'vue-tel-input'

Vue.use(VueTelInput, {
  preferredCountries: ['US'],
  defaultCountry: 'US',
  enabledCountryCode: true,
  inputOptions: { showDialCode: false }
})
Vue.component('Carousel', carousel)
Vue.component('VSelect', VueSelect)
Vue.use(PerfectScrollbar)
Vue.use(VueIntercom, { appId: 'i1eeo5wk' })
