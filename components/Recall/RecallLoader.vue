<template>
  <div>
    <div class="search-loader flex-column">
      <div id="step-1" class="text-center">
        <div class="icon">
          <cld-image loading="lazy" cloud-name="motorsafety" public-id="v2-motorsafety/assets/images/car-insurance-1" />
        </div>
        <h5>Search for recalls on your vehicle...</h5>
      </div>
      <div id="step-2" class="text-center" style="display:none;">
        <div class="icon">
          <cld-image loading="lazy" cloud-name="motorsafety" public-id="v2-motorsafety/assets/images/search-in-area" />
        </div>
        <h5>Finding dealears in your area...</h5>
      </div>
      <div id="step-3" class="text-center" style="display:none;">
        <div class="icon">
          <cld-image loading="lazy" cloud-name="motorsafety" public-id="v2-motorsafety/assets/images/notification_loader" />
        </div>
        <h5>Free recall alerts (SMS, Email, Notifications)...</h5>
      </div>
      <!-- <b-progress :value="25" variant="success"></b-progress> -->
      <div class="loader">
        <span id="loader-span" style="width:20%;" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecallLoader'
}
</script>

<style scoped>
  .search-loader {
    display: flex;
    width: 100%;
    height: calc(100vh - 250px);
    justify-content: center;
    align-items: center;
  }

  .loader {
    display: block;
    width: 500px;
    height: 8px;
    border-radius: 50px;
    background: #deecda;
    overflow: hidden;
  }

  .search-loader h5 {
    font-size: 18px;
    margin: 10px 0;
  }

  .loader span {
    display: block;
    height: 8px;
    background: #7abf64;
  }

  @media screen and (max-width: 991px) {
    .loader {
      width: 80%;
    }
  }

  @media screen and (max-width: 576px) {
    .loader {
      width: 80%;
    }
  }
</style>
