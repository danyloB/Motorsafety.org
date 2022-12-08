export const state = () => ({
  token: '',
  appsyncClient: null,
  user: null,
  device: 'desktop',
  appointmentInfo: {}
})

export const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_APPSYNC_CLIENT (state, client) {
    state.appsyncClient = client
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_DEVICE (state, device) {
    state.device = device
  },
  SET_APPOINTMENT_INFO (state, info) {
    state.appointmentInfo = info
  }
}

export const actions = {
  nuxtServerInit (store, { req, app }) {
  },
  setAppsyncClient ({ commit }, client) {
    commit('SET_APPSYNC_CLIENT', client)
  },
  setUser ({ commit }, user) {
    commit('SET_USER', user)
  },
  showChat () {
    if (this._vm && this._vm.$intercom) {
      this._vm.$intercom.showMessages()
    }
  },
  setDevice ({ commit }, device) {
    commit('SET_DEVICE', device)
  },
  setAppointmentInfo ({ commit }, info) {
    commit('SET_APPOINTMENT_INFO', info)
  }
}

export const getters = {
  isMobile: state => state.device === 'mobile'
}
