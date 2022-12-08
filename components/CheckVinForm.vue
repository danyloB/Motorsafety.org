<template>
  <div class="row">
    <div class="col-12  col-xl-6">
      <div class="text">
        <h2 class="section-heading">
          Check your recall service today
        </h2>
        <p>
          Subscribe for push notification to get up to date email information on
          your vehicle
        </p>
      </div>
    </div>
    <div class="col-12 col-xl-6">
      <div class="recall-form-wrap">
        <div class="form-group">
          <label class="form-label">Check your VIN</label>
          <input
            v-model="vinNumber"
            type="text"
            placeholder="Enter VIN"
            class="form-control input-lg"
          >
          <small class="note">
            Can't find your Vehicle Make? <span class="link-btn">Search by VIN</span>.
          </small>
        </div>
        <div class="form-group">
          <div v-show="$root.isMobile()">
            <label class="form-label" @click="scanOff">Scan Barcode</label>
            <div class="input-icon-wrap scanner-section">
              <i
                v-show="!showBarcodeScanner"
                class="icon-camera"
                @click="showScanner()"
              />
              <StreamBarcodeReaderCustom
                v-show="showBarcodeScanner"
                ref="scannerRef"
                @decode="onDecode"
                @loaded="onLoaded"
              />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Zip Code</label>
          <input
            type="text"
            placeholder="Zip Code"
            class="form-control input-lg"
          >
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-lg text-center text-md-left">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StreamBarcodeReaderCustom from './StreamBarcodeReaderCustom.vue'

export default {
  name: 'CheckVinForm',
  components: {
    StreamBarcodeReaderCustom
  },
  data () {
    return {
      showBarcodeScanner: false,
      vinNumber: ''
    }
  },
  methods: {
    onDecode (result) {
      this.vinNumber = result
    },
    onLoaded () {
    },
    showScanner () {
      this.showBarcodeScanner = true
      this.$refs.scannerRef.start()
    },
    scanOff () {
      this.showBarcodeScanner = false
      this.$refs.scannerRef.stop()
    }
  }
}
</script>

<style scoped>
  .text {
    opacity: 0.7;
    font-size: 24px;
    font-weight: 500;
    margin-right: 15px;
  }

  .check-recall-service p {
    max-width: 500px;
  }

  .check-recall-service button {
    margin-top: 38px;
  }

  p:last-child {
    margin-bottom: 0;
  }

  .recall-form-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .recall-form-wrap .form-group {
    width: 48%;
    margin-right: 2%;
  }

  .input-icon-wrap {
    display: flex;
    align-items: center;
  }

  .input-icon-wrap .form-control {
    width: calc(100% - 50px);
  }

  .input-icon-wrap i {
    font-size: 50px;
    margin-right: 20px;
    color: #9a9da3;
  }

  .success-msg {
    background: #fff;
    display: flex;
    align-items: center;
    padding: 20px;
  }

  .success-msg img {
    margin-right: 15px;
  }

  .scanner-section i {
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    .check-recall-service .d-flex {
      flex-flow: column;
    }

    .recall-form-wrap .form-group {
      width: 100%;
      margin-right: 0;
    }

    .check-recall-service .btn {
      display: block;
      width: 100%;
      margin: 15px 0;
    }
  }

  @media screen and (max-width: 1199px) and (min-width: 768px) {
    .news-details-banner {
      height: 380px;
    }

    .check-recall-service p {
      max-width: 100%;
    }

    .check-recall-service .d-flex {
      flex-wrap: wrap;
      justify-content: flex-start !important;
    }

    .check-recall-service .form-group {
      /* margin-right: 25px; */
      margin-top: 15px;
    }
  }
</style>
