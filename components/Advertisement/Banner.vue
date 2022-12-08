<template>
  <div class="ad-block">
    <cld-image loading="lazy" cloud-name="motorsafety" public-id="v2-motorsafety/assets/images/adv" />
    <h6 class="mb-0 text-gray">
      Advertisment
    </h6>
  </div>
</template>

<script>
export default {
  name: 'AdBanner'
}
</script>

<style scoped>
  .ad-block {
    /*margin-bottom: 40px;*/
    background: #fbfbfb;
    border-radius: 6px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .ad-block img {
    max-width: 650px;
  }

  .ad-block h6 {
    margin: 15px 0 0 0;
    opacity: 30%;
  }

  @media screen and (max-width: 991px) {
    .ad-block {
      height: auto;
      padding: 30px;
    }

    .ad-block img {
      max-width: 100%;
    }
  }
</style>
