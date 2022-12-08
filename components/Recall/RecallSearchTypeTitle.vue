<template>
  <div id="current-recall-cnt" class="current-recall-cnt fixed-top">
    <div class="container">
      <div class="row row-eq-height">
        <b-collapse
          id="vehicle-info"
          class="col-12 col-md-6 col-lg-7 col-xl-8 collapse"
        >
          <AdBanner />
        </b-collapse>
        <div class="col-12 col-md-6 col-lg-5 col-xl-4">
          <div class="subscribe-recall d-none d-md-block pt-4">
            <div v-show="subscribeMessage" class="success-msg">
              <img src="../../assets/images/success.svg" alt=""> Thank you for
              subscribing to notifications
            </div>
            <div v-show="!subscribeMessage &&!user">
              <h5>Enter email to create account and subscribe to recall notifications</h5>
              <form class="input-group mb-3" @submit.prevent="submitNotification">
                <input
                  v-model="email"
                  type="email"
                  required
                  class="form-control"
                  placeholder="E.g. johdoe@email.com"
                >
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdBanner from '@/components/Advertisement/Banner'
// import gpl from 'graphql-tag'
// import * as queries from '@/graphql/queries'
// import * as mutations from '@/graphql/mutations'
export default {
  name: 'RecallSearchTypeTitle',
  components: { AdBanner },
  props: {
    total: {
      type: Number,
      default: 0
    },
    summary: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      subscribeMessage: false,
      image: '',
      email: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
  },
  methods: {
    submitNotification () {
      // try {
      //   const subscribers = await this.$appsyncClient.query({
      //     query: gpl(queries.getV2MotorsafetySubscribe),
      //     variables: {
      //       email: this.email
      //     }
      //   })
      //   const subscriberData = {
      //     createdAt: new Date().getTime(),
      //     type: this.summary.type
      //   }
      //   let data = [subscriberData]
      //   let action = mutations.createV2MotorsafetySubscribe
      //   if (subscribers.data.getV2MotorsafetySubscribe) {
      //     action = mutations.updateV2MotorsafetySubscribe
      //     data = subscribers.data.getV2MotorsafetySubscribe.data
      //     if (data) {
      //       data = data.map(item => ({
      //         createdAt: item.createdAt,
      //         make: item.make,
      //         model: item.model,
      //         year: item.year,
      //         type: item.type
      //       }))
      //     }
      //     const search = data.find(item => item.type === subscriberData.type)
      //     if (!search) {
      //       data.push(subscriberData)
      //     }
      //   }
      //   await this.$appsyncClient
      //     .mutate({
      //       mutation: gpl(action),
      //       variables: {
      //         input: {
      //           email: this.email,
      //           data
      //         }
      //       }
      //     })
      //   this.subscribeMessage = true
      // } catch (err) {
      //   console.log(err)
      // }
      this.$router.push(`/login/?email=${this.email}`)
    }
  }
}
</script>
<style scoped>
  .car-image {
    height: 120px;
  }
  .recalls-info {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
  }

  .recalls-info .alert-cnt {
    padding: 0 8px;
    font-size: 13px;
    left: 160px;
    font-weight: 500;
  }

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

  .current-recall-cnt {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    min-height: 127px;
    z-index: 2;
    background: #fff;
  }

  .current-recall-cnt.cnt-sticky-top {
    top: 45px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.02);
  }

  .current-item-details {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    min-height: 127px;
    align-items: center;
    padding-left: 0;
    margin: 0;
  }

  .current-item-details li {
    font-size: 20px;
  }

  .current-item-details li a {
    font-size: 16px;
    text-decoration: underline;
    color: #0e0e0e;
    opacity: 0.5;
  }

  .current-item-details li a:hover {
    opacity: 1;
  }

  .current-item-details .label {
    font-size: 14px;
    opacity: 0.3;
  }

  .alert-cnt {
    position: absolute;
    left: 180px;
    background: #f8ebeb;
    border-radius: 50px;
    height: 28px;
    width: 170px;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 300;
    color: #882323;
    line-height: 28px;
  }

  p:last-child {
    margin-bottom: 0;
  }

  .active-view p {
    opacity: 0.7;
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

  @media screen and (min-width: 768px) {
    #vehicle-info.collapse {
      display: block !important;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1199px) {
    .current-recall-cnt {
      padding-top: 20px;
    }

    .current-item-details {
      min-height: auto;
    }
  }

  @media screen and (max-width: 767px) {
    .current-recall-cnt {
      min-height: auto;
      top: 60px;
      border-bottom: 1px solid #ccc;
    }

    .alert-cnt {
      left: 140px;
    }

    .active-view p {
      margin: 5px 0;
    }

    .current-item-details {
      min-height: auto;
    }

    .current-item-details {
      flex-wrap: wrap;
    }

    .subscribe-recall {
      height: auto;
      padding: 15px;
      margin-bottom: 15px;
    }
  }
</style>
