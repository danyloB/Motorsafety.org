<template>
  <section class="locate-banner-section">
    <gmap-street-view-panorama
      v-if="dealer.latitude && dealer.longitude"
      :zoom="1"
      :position="{
        lat: dealer.latitude,
        lng: dealer.longitude
      }"
      class="pano"
    />
  </section>
</template>

<script>
export default {
  name: 'LocateDealerBanner',
  props: {
    dealer: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped>
  .locate-banner-section {
    margin-bottom: 40px;
  }

  .locate-banner-section .pano {
    width: 100%;
    height: 426px;
  }
</style>
