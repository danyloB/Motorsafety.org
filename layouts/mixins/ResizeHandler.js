
const WIDTH = 768 // refer to Bootstrap's responsive design

export default {
  beforeMount () {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted () {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      this.$store.dispatch('setDevice', 'mobile')
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile () {
      if (process.client) {
        const rect = document.body.getBoundingClientRect()
        return rect.width - 1 < WIDTH
      }
    },
    $_resizeHandler () {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        this.$store.dispatch('setDevice', isMobile ? 'mobile' : 'desktop')
      }
    }
  }
}
