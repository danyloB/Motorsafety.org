<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle">
        <div id="locate-dealer-page">
          <LocateDealerBanner :dealer="dealer" />
          <section class="locate-content">
            <div class="container">
              <div class="row">
                <div class="col-lg-8">
                  <LocateDealerIntro :dealer="dealer" />
                  <LocateDealerDetailedInfo :dealer="dealer" />
                  <recall-map
                    width="100%"
                    height="500px"
                    :dealers="[dealer]"
                    :fit-markers="false"
                    show-detail
                  />
                </div>
                <div class="col-lg-4 right-sidebar">
                  <div class="subscribe-recall pt-4">
                    <div v-show="subscribeMessage" class="success-msg">
                      <img src="../../../../assets/images/success.svg" alt /> Thank you for
                      subscribing to notifications
                    </div>
                    <div v-show="!subscribeMessage &&!user">
                      <h5>Enter your email to create an account and subscribe to recall notifications for your vehicle</h5>
                      <form class="input-group mb-3" @submit.prevent="submitNotification">
                        <input
                          v-model="email"
                          type="email"
                          required
                          class="form-control"
                          placeholder="E.g. jamesdough@email.com"
                        />
                        <div class="input-group-append">
                          <button class="btn btn-primary" type="submit">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="container">
                    <div class="find-form">
                      <h2>Find Recalls</h2>
                      <p>More than 1 in 4 vehicles on the road have an unrepaired call.</p>
                      <client-only>
                        <HomeRecallForm :new-line-switch="true" />
                      </client-only>
                    </div>
                  </div>
                  <div v-if="!loadingRequest">
                    <div v-if="isEdit" class="claim-dealer">
                      <div class="claim-icon">
                        <cld-image
                          loading="lazy"
                          cloud-name="motorsafety"
                          public-id="v2-motorsafety/assets/icons/claim"
                        />
                      </div>
                      <div class="btn-ctn">
                        <nuxt-link
                          class="btn-claim"
                          :to="`/dealers/${dealer.city_state_slug}/${dealer.dealerSlug}/claim/?edit=1`"
                        >
                          Edit listing
                        </nuxt-link>
                      </div>
                    </div>
                    <div v-else class="claim-dealer">
                      <div class="claim-icon">
                        <cld-image
                          loading="lazy"
                          cloud-name="motorsafety"
                          public-id="v2-motorsafety/assets/icons/claim"
                        />
                      </div>
                      <h5>Is this your dealership?</h5>
                      <p>
                        Claim your dealership to update listing information, respond to recall requests,
                        and more!
                      </p>
                      <div class="btn-ctn">
                        <nuxt-link
                          class="btn-claim"
                          :to="`/dealers/${dealer.city_state_slug}/${dealer.dealerSlug}/claim/`"
                        >
                          Claim your dealership
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <RecallForm />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import gpl from 'graphql-tag'
import { Cloudinary } from 'cloudinary-core'
import InnerHeader from '@/components/Header/InnerHeader.vue'
import LocateDealerBanner from '@/components/LocateDealer/LocateDealerBanner.vue'
import LocateDealerIntro from '@/components/LocateDealer/LocateDealerIntro.vue'
import LocateDealerDetailedInfo from '@/components/LocateDealer/LocateDealerDetailedInfo.vue'
import HomeRecallForm from '@/components/Home/HomeRecallForm.vue'
import RecallForm from '@/components/RecallForm.vue'
import Footer from '@/components/Footer.vue'
import * as queries from '@/graphql/queries'
import { getListBrands } from '@/utils'
import RecallMap from '@/components/Recall/RecallMap'
import content from '@/utils/content'

export default {
  name: 'LocaleDealerDetail',
  components: {
    RecallMap,
    InnerHeader,
    LocateDealerBanner,
    LocateDealerIntro,
    LocateDealerDetailedInfo,
    HomeRecallForm,
    RecallForm,
    Footer
  },
  async asyncData ({ route, error, $content }) {
    const { slug, city_state_slug } = route.params
    const dealer = await content.fetchDealer($content, slug, city_state_slug)

    if (dealer) {
      dealer.listBrands = getListBrands(dealer.brand)
      if (dealer.service_hours) {
        dealer.hours = dealer.service_hours.split('|').map(i => i.trim())
      } else {
        dealer.hours = []
      }
      return {
        dealer
      }
    } else {
      error({ statusCode: 404, message: 'This page could not be found' })
    }
  },
  data () {
    return {
      loadingRequest: true,
      isEdit: false,
      subscribeMessage: false,
      email: ''
    }
  },
  jsonld () {
    if (this.dealer) {
      const cl = Cloudinary.new({ cloud_name: 'motorsafety' })
      const image = this.dealer.image_id ? cl.url(this.dealer.image_id) : ''
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: this.dealer.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: this.dealer.address,
          addressLocality: this.dealer.city,
          addressRegion: this.dealer.state,
          postalCode: this.dealer.zip
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: this.dealer.latitude,
          longitude: this.dealer.longitude
        },
        telephone: this.dealer.phone_number_main,
        url: this.dealer.website,
        image
      }
    } else {
      return {}
    }
  },
  head () {
    const title = this.dealer
      ? `${this.dealer.name}- ${this.dealer.city} - ${this.dealer.state} - Motorsafety.org`
      : 'Motorsafety.org'
    const defaultDescription = this.dealer
      ? `Contact ${this.dealer.name}. Visit MotorSafety to find your nearest recall repair center or dealership in ${this.dealer.city}, ${this.dealer.state} today.`
      : 'MotorSafety.org'
    return {
      title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: defaultDescription
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: defaultDescription
        },
        { hid: 'og:title', name: 'og:title', content: title },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: title
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    this.fetchRequest()
  },
  methods: {
    async fetchRequest () {
      const requests = await this.$appsyncClient.query({
        query: gpl(queries.searchDealerClaimRequests),
        variables: {
          filter: {
            dealer_id: {
              eq: this.dealer.id
            },
            status: {
              eq: 1
            }
          }
        }
      })
      this.isEdit = !!requests.data.searchDealerClaimRequests.items.length
      this.loadingRequest = false
    },
    submitNotification () {
      this.$router.push(`/login/?email=${this.email}`)
    }
  }
}
</script>

<style scoped lang="scss">
#middle {
  padding-top: 80px;
}
.subscribe-recall {
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
  }
}
.claim-dealer {
  text-align: center;
  padding: 25px;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  background: #fff;
  margin-top: 30px;

  .claim-icon {
    padding-bottom: 25px;

    img {
      width: 60px;
      height: auto;
    }
  }

  .btn-ctn {
    padding-top: 25px;

    .btn-claim {
      color: #2b273c;
      font-weight: 600;
      padding: 8px 16px;
      border: 1px solid #bbbac0;
      border-radius: 4px;
    }
  }
}
</style>
