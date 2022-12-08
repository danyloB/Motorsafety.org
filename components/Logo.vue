<template>
  <div class="logo">
    <cld-image
      :public-id="headerLogo === 'Black' ? 'v2-motorsafety/assets/images/logo' : 'v2-motorsafety/assets/images/logo-alt'"
      alt="MotorSafety"
      loading="lazy"
    />
  </div>
</template>

<script>
export default {
  name: 'Logo',
  data () {
    return {
      headerLogo: 'Black'
    }
  },
  beforeCreate () {
  },
  created () {
    if (this.$route.name === 'index') {
      this.headerLogo = 'White'
    } else {
      this.headerLogo = 'Black'
    }
  }
}
</script>
