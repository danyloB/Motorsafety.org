<template>
  <div class="product-information">
    <h5>Detailed information</h5>
    <div class="row">
      <div class="col-lg-6 col-md-6 info-content">
        <div class="info-block address-info">
          <div class="info-icon">
            <i class="icon-location" />
          </div>
          <div class="info-details">
            <h6>Address</h6>
            <p>
              {{ dealer.address }}
              <br>
              {{ `${dealer.city}, ${dealer.state} ${dealer.zip}` }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 info-content">
        <div class="info-block hours-info">
          <div class="info-icon">
            <i class="icon-clock" />
          </div>
          <div class="info-details">
            <div>
              <h6>Service hours</h6>
              <div v-for="hour in dealer.hours" :key="hour">
                {{ hour }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="brands">
      <h5>Brands</h5>
      <div class="list-brands-wrapper">
        <div v-for="brandItem in dealer.listBrands" :key="brandItem.name" class="brand-item">
          <cld-image cloud-name="motorsafety" :public-id="brandItem.image_id">
            <cld-transformation quality="auto" width="48" crop="scale" />
          </cld-image>
          <div>{{ brandItem.name }}</div>
        </div>
      </div>
    </div>

    <div class="info-button-block">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <a v-if="dealer.phone" :href="`tel:${dealer.phone}`" class="btn cmn-round-btn btn-lg btn-purple-light">Call</a>
        </div>
        <div class="col-lg-6 col-md-6">
          <button
            type="button"
            class="btn cmn-round-btn btn-lg btn-sky-light-solid"
            @click="updateChatInfoAndShow"
          >
            Click to chat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LocateDealerDetaildInfo',
  props: {
    dealer: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  },
  beforeDestroy () {
    if (this.$intercom) {
      this.$intercom.update({})
    }
  },
  methods: {
    ...mapActions(['showChat']),
    updateChatInfoAndShow () {
      if (this.$intercom) {
        const { name, ...chatData } = this.dealer
        this.$intercom.update(chatData)
        this.showChat()
      }
    }
  }
}
</script>
<style scoped>
  .product-information {
    margin-top: 30px;
  }

  .product-information h5 {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 30px;
  }

  .info-block {
    display: flex;
    align-items: center;
  }

  .info-block .info-icon {
    min-width: 48px;
    width: 48px;
    height: 48px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    font-size: 20px;
    background: #eee;
  }

  .info-block .info-details h6 {
    font-size: 16px;
    color: #0e0e0e;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .info-block .info-details p {
    color: rgba(41, 41, 41, 0.7);
    font-size: 18px;
  }

  .address-info .info-icon {
    background: #eef6f9;
    color: #00b6f2;
  }

  .hours-info .info-icon {
    background: rgba(122, 191, 100, 0.2);
    color: #7abf64;
  }

  .info-button-block {
    margin-top: 30px;
  }

  .info-button-block .btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
  }

  .info-button-block .btn i {
    margin-right: 10px;
  }

  .list-brands-wrapper {
    display: flex;
  }

  .list-brands-wrapper .brand-item {
    padding-right: 1.1rem;
  }
</style>
