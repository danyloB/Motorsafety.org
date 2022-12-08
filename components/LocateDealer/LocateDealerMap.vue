<template>
  <div class="location-map">
    <iframe
      :src="`https://maps.google.com/maps?q=${dealer.latitude}, ${dealer.longitude}&z=15&output=embed`"
      frameborder="0"
      allowfullscreen
      width="100%"
      height="100%;"
    />
  </div>
</template>

<script>
export default {
  name: 'LocateDealerMap',
  props: {
    dealer: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped>
  .location-map {
    height: 500px;
    margin-bottom: 30px;
  }
</style>
