<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle">
        <div id="recall-search-result" class="two">
          <RecallSearchDetailedTitle
            :total="total"
            :summary="summary"
          />
          <div id="fix-map-cnt" class="fix-map-cnt d-none d-md-block" />

          <div class="container">
            <div class="row">
              <RecallLoader v-show="showLoader" class="col-12" />
              <div v-show="!showLoader" class="col-12 col-md-6 col-lg-7 col-xl-8">
                <div class="listing-title-row">
                  <div class="title-row">
                    <h5>Recalls</h5>
                    <span>{{ total }} recalls available</span>
                  </div>
                  <div>
                    <div v-if="recalls.length">
                      <RecallSearchDetailedList :items="recalls" :is-vin="isVinSearch" :summary="summary" />
                    </div>
                    <NoRecallFound
                      v-else
                      :summary="summary"
                    />
                  </div>
                </div>
              </div>
              <div v-show="!showLoader" class="col-12 col-md-6 col-lg-5 col-xl-4">
                <RecallRepairCenter :dealers="dealers" />
                <div class="map-cnt">
                  <RecallMap :height="mapHeight" :dealers="dealers" :google="google" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="result-footer container">
          MotorSafety.org obtains its information from public AND OTHER AVAILABLE RECORDS AND DOES NOT WARRANT THE ACCURACY
          OF THE INFORMATION. IN THE EVENT OF AN INACCURACY, ALL RECOURSE, claims and inquiries SHALL BE ADDRESSED SOLELY TO
          THE ORIGINAL SOURCE(S) OF SUCH INFORMATION.
        </div>
        <Footer />
      </div>
      <!-- <ScheduleAppointmentOption /> -->
    </div>
    <div id="appt-btns-overlay" class="cnt-overlay" style="display:none">
      <div class="overlay-content" />
    </div>
    <GmapMap
      ref="map"
      :center="{lat:37, lng:-95}"
      :zoom="7"
      style="height: 0"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import gpl from 'graphql-tag'
import { mapActions } from 'vuex'
import * as queries from '@/graphql/queries'
import InnerHeader from '@/components/Header/InnerHeader.vue'
import RecallSearchDetailedTitle from '@/components/Recall/RecallSearchDetailedTitle.vue'
import RecallSearchDetailedList from '@/components/Recall/RecallSearchDetailedList.vue'
import RecallMap from '@/components/Recall/RecallMap.vue'
import RecallRepairCenter from '@/components/Recall/RecallRepairCenter.vue'
import RecallLoader from '@/components/Recall/RecallLoader.vue'
import NoRecallFound from '@/components/Recall/NoRecallFound.vue'
import Footer from '@/components/Footer.vue'
import { getImageId, getPhoneNumber, getType } from '@/utils'
import types from '@/utils/types'

export default {
  name: 'RecallSearchResultDetailed',
  components: {
    InnerHeader,
    RecallSearchDetailedTitle,
    RecallSearchDetailedList,
    RecallMap,
    RecallRepairCenter,
    NoRecallFound,
    RecallLoader,
    Footer
  },

  data () {
    return {
      mapHeight: '500px',
      showLoader: true,
      timer: null,
      loaderWidth: 20,
      recalls: [],
      page: 1,
      page_size: 10,
      total: 0,
      isVinSearch: false,
      summary: {},
      google: null,
      dealers: []
    }
  },
  async mounted () {
    const { vin } = this.$route.query
    this.isVinSearch = !!vin
    this.setupTimer()

    await this.fetchData()

    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      window.addEventListener('scroll', this.setMap)
      this.$nextTick().then(() => document.body.classList.add('no-footer'))
    }
  },
  beforeDestroy () {
    this.setAppointmentInfo({})
  },
  destroyed () {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      document.body.classList.remove('no-footer')
      window.removeEventListener('scroll', this.setMap)
    }
  },
  methods: {
    ...mapActions(['setAppointmentInfo']),

    setupTimer () {
      this.timer = setInterval(() => {
        if (this.loaderWidth === 100) {
          clearInterval(this.timer)
          this.timer = null
        }
        const spanLoader = document.getElementById('loader-span')
        const step1 = document.getElementById('step-1')
        const step2 = document.getElementById('step-2')
        const step3 = document.getElementById('step-3')

        if (spanLoader) {
          spanLoader.style.width = `${this.loaderWidth}%`
        }
        this.loaderWidth += 20
        if (this.loaderWidth <= 40) {
          step1.style.display = 'block'
          step2.style.display = 'none'
          step3.style.display = 'none'
        } else if (this.loaderWidth <= 80) {
          step1.style.display = 'none'
          step2.style.display = 'block'
          step3.style.display = 'none'
        } else if (this.loaderWidth <= 100) {
          step1.style.display = 'none'
          step2.style.display = 'none'
          step3.style.display = 'block'
        }
      }, 1000)
    },

    getLocation (zipcode) {
      return new Promise((resolve, reject) => {
        this.$refs.map && this.$refs.map.$mapPromise.then(() => {
          const geocoder = new window.google.maps.Geocoder()
          geocoder.geocode({ address: zipcode }, function (results, status) {
            let location = null
            if (status === window.google.maps.GeocoderStatus.OK) {
              location = `${results[0].geometry.location.lat()},${results[0].geometry.location.lng()}`
            }
            resolve(location)
          })
        })
      })
    },

    async getDealers (make) {
      const client = this.$appsyncClient
      if (!make) {
        make = this.$route.query.make
      }
      const variables = {
        make
      }
      const { zipcode } = this.$route.query
      if (zipcode) {
        const location = await this.getLocation(zipcode)
        variables.zip = zipcode
        if (location) {
          variables.location = location
        }
        const dealersResponse = await client
          .query({
            query: gpl(queries.searchByDistance),
            variables
          })

        this.dealers = dealersResponse.data.searchByDistance.items.map((item) => {
          item.addressDisplay = `${item.address} ${item.city}, ${item.state} ${item.zip} United States`
          item.image_id = getImageId(item.brand)
          item.phone = getPhoneNumber(item)
          return item
        })
      }
    },

    getSummary () {
      if (this.isVinSearch) {
        if (this.vinRecall) {
          this.summary = {
            make: this.vinRecall.make,
            model: this.vinRecall.model_name,
            year: this.vinRecall.model_year,
            vin: this.$route.query.vin
          }
        } else {
          this.summary = {}
        }
      } else {
        const { make, model, year } = this.$route.query
        this.summary = {
          make,
          model,
          year
        }
      }
      this.setAppointmentInfo(this.summary)
    },
    async fetchData () {
      if (this.isVinSearch) {
        await this.fetchVinRecalls()
      } else {
        this.getSummary()
        const requests = [this.getDealers(), this.fetchRecalls()]
        await Promise.all(requests)
      }
      this.showLoader = false
    },
    async fetchVinRecalls () {
      this.showLoader = true
      const { vin } = this.$route.query
      if (vin) {
        try {
          const { data } = await this.$appsyncClient
            .query({
              query: gpl(queries.listVinRecalls),
              variables: { vin }
            })
          this.vinRecall = data.listVinRecalls
          this.total = this.vinRecall.recall_count || 0
          this.recalls = this.vinRecall.recalls || []
          this.getSummary()
          const make = this.vinRecall.make
          await this.getDealers(make)
        } catch (e) {
          console.error('An error occured fetching vin recalls...')
        }
      }
    },
    async fetchRecalls () {
      const { make, model, year } = this.$route.query
      if (make && model && year) {
        this.showLoader = true
        try {
          const res = await this.$appsyncClient.query(
            {
              query: gpl(queries.listNhtsaRecalls),
              variables: {
                query: {
                  make,
                  model,
                  year
                }
              }
            }
          )
          const data = res.data.listNhtsaRecalls
          this.total = data.Count
          this.recalls = data.Results.map((item) => {
            item.name = item.NHTSACampaignNumber
            item.description = item.Summary
            item.remedy = item.Remedy
            item.recall_id = item.NHTSACampaignNumber
            item.risk = item.Conequence
            const type = getType(item.Component)
            if (type && types[type]) {
              item.type = types[type].name
            }
            return item
          })
        } catch (e) {
          console.error('An error occured fetching recalls...')
        }
      }
    },
    setMap: () => {
      const fixMap = document.getElementById('fix-map-cnt')
      const fixTitleHeader = document.getElementById('current-recall-cnt')

      if (typeof fixMap !== 'undefined') {
        const scroll = window.scrollY
        if (scroll >= 200) {
          fixMap.classList.add('stickymap')
          fixTitleHeader.classList.add('cnt-sticky-top')
        } else {
          fixMap.classList.remove('stickymap')
          fixTitleHeader.classList.remove('cnt-sticky-top')
        }
      }
    }
  }
}
</script>
<style scoped>
  #recall-search-result {
    position: relative;
    background: #f7f7f7;
  }

  #recall-search-result.two .current-recall-cnt {
    border-bottom: 1px solid #e8e8e8;
  }

  .listing-title-row .title-row {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cnt-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }

  .overlay-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .custom-btn {
    position: relative;
  }

  .overlay-content .close {
    position: absolute;
    right: 50px;
    top: 50px;
    color: #fff;
  }

  #appt-btns-overlay {
    z-index: 22;
  }

  @media screen and (max-width: 1199px) and (min-width: 768px) {
    .current-recall-cnt {
      padding-top: 20px;
    }
  }

  .result-footer {
    background: #fff;
    padding: 25px;
    margin: 0 auto;
  }
</style>
