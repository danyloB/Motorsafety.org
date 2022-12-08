<template>
  <div id="current-recall-cnt" class="current-recall-cnt">
    <div class="container">
      <div class="row row-eq-height">
        <div class="col-12 col-md-12 col-lg-12 col-xl-3 pr-0 active-view">
          <div class="recalls-info">
            <div class="position-relative">
              <div class="alert-cnt">
                <strong>
                  <i class="icon-alert" /> {{ total }} Recalls available
                </strong>
              </div>
              <h4 class="mb-0">
                Current recall
              </h4>
            </div>
            <p>
              <button
                v-b-toggle.vehicle-info
                class="navbar-toggler collapsed d-inline-block d-md-none"
                type="button"
                data-toggle="collapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle info"
              >
                <font-awesome-icon :icon="['fas', 'angle-down']" />
              </button>
              Information for this vehicle
            </p>
          </div>
        </div>
        <b-collapse
          id="vehicle-info"
          class="col-12 col-md-6 col-lg-7 col-xl-5 collapse"
        >
          <ul class="current-item-details justify-content-around">
            <li>
              <img
                v-if="image"
                :src="image"
                alt=""
                class="img-fluid car-image"
              >
            </li>
            <li>
              <div class="label">
                Make
              </div>
              {{ summary.make }}
            </li>
            <li>
              <div class="label">
                Model
              </div>
              {{ summary.model }}
            </li>
            <li>
              <div class="label">
                Year
              </div>
              {{ summary.year }}
            </li>
          </ul>
          <div class="subscribe-recall d-block d-md-none pt-4">
            <div v-show="subscribeMessage === true" class="success-msg">
              <img src="../../assets/images/success.svg" alt="">
              Thank you for
              subscribing to notifications
            </div>
            <div v-show="subscribeMessage === false && !user">
              <h5>Enter email to create account and subscribe to recall notifications</h5>
              <form class="input-group mb-3" @submit.prevent="submitNotification">
                <input
                  v-model="email"
                  required
                  type="email"
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
        </b-collapse>
        <div class="col-12 col-md-6 col-lg-5 col-xl-4">
          <div class="subscribe-recall d-none d-md-block pt-4">
            <div v-show="subscribeMessage" class="success-msg">
              <img src="../../assets/images/success.svg" alt=""> Thank you for
              subscribing to notifications
            </div>
            <div v-show="!subscribeMessage">
              <template v-if="!showVinForm">
                <h5>Enter email to create account and subscribe to recall notifications</h5>
                <form class="input-group mb-3" @submit.prevent="submitNotification">
                  <input
                    v-model="email"
                    required
                    type="email"
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
              </template>
              <template v-else>
                <h5>Enter your VIN for the most accurate results</h5>
                <form class="input-group mb-3" @submit.prevent="submitNotification">
                  <input
                    v-model="vin"
                    required
                    class="form-control"
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
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import gpl from 'graphql-tag'
import * as mutations from '@/graphql/mutations'
import * as queries from '@/graphql/queries'
const apiKey = process.env.FUEL_API_KEY

export default {
  name: 'RecallSearchDetailedTitle',
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
      email: '',
      vin: null,
      showVinForm: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    summary: {
      handler (val) {
        this.fetchModelImage()
        this.vin = val.vin || this.$route.query.vin
      },
      deep: true
    }
  },
  mounted () {
    this.fetchModelImage()
  },
  methods: {
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
        if ((subscribers.data.getSubscribe) && ('data' in subscribers.data.getSubscribe)) {
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
    },
    async fetchModelImage () {
      const baseApiUrl = 'https://api.fuelapi.com/v1/json'
      if (this.summary.model && this.summary.make && this.summary.year) {
        const vehicles = await this.$axios
          .get(`${baseApiUrl}/vehicles`, {
            params: {
              ...this.summary,
              api_key: apiKey
            }
          })
        if (vehicles && vehicles.data && vehicles.data.length) {
          const productId = vehicles.data[0].id
          const { data } = await this.$axios
            .get(`${baseApiUrl}/vehicle/${productId}`, {
              params: {
                productID: 2,
                productFormatIDs: 34,
                api_key: apiKey
              }
            })
          if (data && data.products.length &&
            data.products[0].productFormats.length &&
            data.products[0].productFormats[0].assets.length) {
            this.image = data.products[0].productFormats[0].assets[0].url
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.car-image {
  width: 120px;
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
