<template>
  <div class="recall-item">
    <div class="list-title">
      <h6>
        {{ item.name }}
        <span v-if="item.type">
          <em>Type: {{ item.type }}</em>
        </span>
      </h6>
      <div class="list-date">
        <a
          href="javascript://"
          class="collapse show"
          :aria-expanded="showDetail ? 'true' : 'false'"
          :aria-controls="`recall-info-item-${item.recall_id}`"
          @click="showDetail = !showDetail"
        >
          <font-awesome-icon :icon="['fas', 'angle-down']" />
        </a>
      </div>
    </div>
    <div class="list-desc">
      <div :id="`list-desc-${item.recall_id}`" class="desc">
        <h6>Brief Description</h6>
        <p :class="{ 'text-description': !showDetail }">
          {{ item.description }}
        </p>
        <b-collapse
          :id="`recall-info-item-${item.recall_id}`"
          v-model="showDetail"
          @show="handleCollapseShowHide('show', item.recall_id)"
          @hide="handleCollapseShowHide('hide', item.recall_id)"
        >
          <h6>Recall Risk</h6>
          <p>
            {{ item.risk }}
          </p>
          Repair information and service
          <div class="item-status d-flex justify-content-between">
            <div class="item-repair-status">
              <i class="icon-clock" />
              <div>
                <h5>Confirm with the Dealer</h5>
                Est. Repair time
              </div>
            </div>
            <div v-if="showSubscription" class="subscribe-recall d-block" @click="subscribeEmail">
              <div v-if="subscribeMessage === false && !user">
                <form
                  class="input-group mb-3"
                  @submit.prevent="submitNotification"
                >
                  <input
                    v-model="email"
                    required
                    type="email"
                    class="form-control"
                    placeholder="E.g. jamesdough@email.com"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-primary btn-submit-notification" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div v-else class="success-msg">
                <img src="../../assets/images/success.svg" alt="" />
                Thank you for subscribing to notifications
              </div>
            </div>
            <div v-else class="btn-cnt detail-schedule-btn">
              <div
                class="btn btn-primary btn-block btn-schedule"
                @click="switchNotification"
              >
                Sign up for notifications
              </div>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/utils/requests'
import gpl from 'graphql-tag'
import recallItem from '@/utils/mixins/recallItem'
import * as mutations from '@/graphql/mutations'
import * as queries from '@/graphql/queries'
const axios = require('axios')
export default {
  name: 'RecallItem',
  mixins: [recallItem],
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    summary: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showDetail: this.item && this.item.showDetail,
      showSubscription: false,
      subscribeMessage: false,
      email: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    item: {
      handler (old, val) {
        this.showDetail = val && val.showDetail
      }
    }
  },
  methods: {
    switchNotification () {
      this.showSubscription = true
    },
    gotoSignUp () {
      const { vin, make, model, year } = this.summary
      const zip = this.$route.query.zipcode
      const query = {
        vin,
        make,
        model,
        year,
        zip,
        signup: 'true'
      }
      this.$router.push({
        path: '/login/',
        query
      })
    },
    // TODO: the below  function needs user API key
    subscribeEmail () {
      console.log('subscription phase 0:', api, axios)
      // const vin = this.summary[0]
      // const res = api
      //   .subscribePost(
      //     {
      //       vin,
      //       is_email: true,
      //       is_sms: true,
      //       is_push: true,
      //       is_active: true
      //     }, axios
      //   )
      // console.log(res.data)
    },
    async submitNotification () {
      try {
        const { vin, make, model, year } = this.summary
        let action = mutations.createSubscribe
        const newData = {
          createdAt: new Date(),
          make,
          model,
          type: '',
          vin: (vin) || '',
          year
        }
        let data = [newData]
        const subscribers = await this.$appsyncClient.query({
          query: gpl(queries.getSubscribe),
          variables: {
            email: this.email
          }
        })
        // console.log(subscribers)
        if ((subscribers.data.getSubscribe) && ('data' in subscribers.data.getV2MotorsafetySubscribe)) {
          const subscriberData = subscribers.data.getSubscribe.data
          if (subscriberData) {
            data = subscriberData.map(item => ({
              createdAt: item.createdAt,
              make: item.make,
              model: item.model,
              type: (item.type) ? item.type : '',
              vin: (item.vin) ? item.vin : '',
              year: item.year
            }))
            data.push(newData)
            action = mutations.updateSubscribe
          }
        }

        await this.$appsyncClient
          .mutate({
            mutation: gpl(action),
            variables: {
              input: {
                email: this.email,
                data
              }
            }
          })
        this.subscribeMessage = true
        const zip = this.$route.query.zipcode
        const query = {
          email: this.email,
          vin,
          make,
          model,
          year,
          zip,
          signup: 'true'
        }
        this.$router.push({
          path: '/login/',
          query
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.recall-item ::v-deep{
  .subscribe-recall {
  background: #fafafa;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  flex-direction: column;
}

.subscribe-recall h5 {
  font-size: 14px;
  opacity: 0.7;
}

.subscribe-recall .btn-primary {
  height: auto;
}
@media screen and (max-width: 767px) {
  .subscribe-recall {
    height: auto;
    padding: 15px;
    margin-bottom: 15px;
    display: flex !important;
    justify-content: center;
    flex-direction: column;
  }
}
.input-group-prepend .btn, .input-group-append .btn{
  z-index: 1;
  line-height: 45px;
}

}

</style>
