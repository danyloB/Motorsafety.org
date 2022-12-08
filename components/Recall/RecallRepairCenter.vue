<template>
  <div class="repair-center-list">
    <div class="title-row">
      <h5>Recall Repair Centers</h5>
      <div class="ml-auto zip-input">
        <div v-if="hasInput">
          <b-input v-model="dealerZip" placeholder="Enter your zip" @keyup.enter="$emit('on-update-zip', dealerZip)" />
        </div>
        <template v-else>
          {{ dealers.length }} Location<span v-show="dealers.length !== 1">s</span> found
        </template>
      </div>
    </div>
    <ul>
      <li v-for="dealer in dealers" :key="dealer.dealer_id">
        <div class="sr">
          <i class="icon-map-pin" /> <span>{{ dealer.aggregate_review }}</span>
        </div>
        <div class="rrc-thumb">
          <cld-image cloud-name="motorsafety" :public-id="dealer.image_id" />
        </div>
        <nuxt-link
          class="dealer-title"
          :to="{
            name: 'dealers-city_state_slug-slug',
            params: {
              slug: dealer.dealerSlug,
              city_state_slug: dealer.city_state_slug
            }
          }"
        >
          {{ dealer.name }}
        </nuxt-link>
        <!--        <div v-if="dealer.is_trusted" class="in-stock">-->
        <!--          <i class="icon-settings" />Parts in stock-->
        <!--        </div>-->
        <p>{{ dealer.addressDisplay }}</p>

        <div class="contact-ctn">
          <div>
            <a v-if="dealer.phone" :href="`tel:${dealer.phone}`" class="btn btn-primary btn-call">Click to Call</a>
          </div>
          <div>
            <b-button
              variant="primary"
              class="btn-call"
              @click="updateChatInfoAndShow(dealer)"
            >
              Click to Chat
            </b-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RecallRepairCenter',
  props: {
    dealers: {
      type: Array,
      default: () => []
    },
    hasInput: {
      type: Boolean,
      default: false
    },
    zip: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dealerZip: this.zip
    }
  },
  watch: {
    zip (val) {
      this.dealerZip = val
    }
  },
  mounted () {
  },
  beforeDestroy () {
    if (this.$intercom) {
      this.$intercom.update({})
    }
  },
  methods: {
    ...mapActions(['showChat']),

    closePopover (elmId) {
      // this.$refs[elmId].$emit('close')
      if (this.$refs[elmId] && this.$refs[elmId].length) {
        this.$refs[elmId][0].$emit('close')
      }
    },
    gotoDealerDetailPage (dealer) {
      this.$router.push({
        name: 'dealers-city_state_slug-slug',
        params: {
          slug: dealer.dealerSlug,
          city_state_slug: dealer.city_state_slug
        }
      })
    },
    updateChatInfoAndShow (dealer) {
      if (this.$intercom) {
        const { name, ...chatData } = dealer
        this.$intercom.update(chatData)
        this.showChat()
      }
    }
  }
}
</script>
<style scoped lang="scss">
.zip-input {
  background: #fff;
  opacity: 1 !important;
  color: #333;

  input {
    border: 1px #333 solid;
  }
}

.dealer-title {
  cursor: pointer;
  color: #333;
}

.schedule-btn {
  min-width: 220px;
}

.repair-center-list .title-row {
  display: flex;
  padding: 15px 0;
}

.repair-center-list .title-row h5 {
  margin-bottom: 0;
  font-size: 20px;
}

.repair-center-list .title-row div {
  opacity: 0.3;
}

.repair-center-list ul {
  list-style-type: none;
  padding-left: 0;
  overflow-y: scroll;
  max-height: 400px;
}

.repair-center-list ul li {
  background: #fff;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 0 24px;
}

.repair-center-list ul li {
  position: relative;
  padding-left: 60px;
  padding-right: 90px;
  border-top: 4px solid transparent;
}

.repair-center-list ul li:hover {
  border-top: 4px solid #7abf64;
}

.repair-center-list ul li:hover .sr i:before {
  color: #7abf64;
}

.repair-center-list ul li .sr {
  position: absolute;
  top: 25px;
  left: 20px;
}

.repair-center-list ul li .sr i {
  position: absolute;
  font-size: 32px;
}

.repair-center-list ul li .sr i:before {
  color: #00b6f2;
}

.repair-center-list ul li .sr span {
  display: block;
  width: 32px;
  color: #fff;
  text-align: center;
  position: relative;
  z-index: 2;
  line-height: 24px;
}

.repair-center-list ul li .rrc-thumb {
  position: absolute;
  right: 20px;
  top: 25px;

  img {
    width: 53px;
    height: 53px;
    border-radius: 2px;
  }
}

.repair-center-list ul li h6 {
  font-size: 18px;
  font-weight: 500;
}

.repair-center-list ul li p {
  font-size: 14px;
  line-height: 22px;
}

.in-stock {
  display: flex;
  align-items: center;
  height: 26px;
  background: #e4f2e0;
  color: #395f2d;
  font-size: 13px;
  border-radius: 50px;
  padding: 0 10px;
  line-height: 26px;
  max-width: 130px;
  margin-bottom: 10px;
}

.in-stock i {
  font-size: 16px;
  margin-right: 5px;
}

.contact-ctn {
  .btn-call {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    line-height: 30px;
  }
}
</style>
