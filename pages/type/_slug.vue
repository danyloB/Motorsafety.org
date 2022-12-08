<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle">
        <div id="recall-search-result" class="two">
          <RecallSearchTypeTitle
            :total="total"
            :summary="summary"
          />
          <div id="fix-map-cnt" class="fix-map-cnt d-none d-md-block" />

          <div class="container list-recall-container">
            <div class="row">
              <div class="col-12 col-sm-6 col-lg-5 col-xl-4">
                <RecallFilter />
              </div>
              <div class="col-12 col-sm-6 col-lg-7 col-xl-8">
                <div class="listing-title-row">
                  <div class="title-row">
                    <h5>Recalls</h5>
                    <span>{{ total }} recalls available</span>
                  </div>
                  <RecallLoader v-show="showLoader" />
                  <div v-show="!showLoader">
                    <div v-if="recalls.length">
                      <RecallSearchDetailedList :items="recalls" recall-by-type />
                      <div class="paging-container">
                        <div class="prev">
                          <b-button :disabled="prevTokens.length < 2" @click="toPrevPage">
                            Prev
                          </b-button>
                        </div>
                        <div class="next">
                          <b-button :disabled="!nextToken" @click="toNextPage">
                            Next
                          </b-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    <div id="appt-btns-overlay" class="cnt-overlay" style="display:none">
      <div class="overlay-content" />
    </div>
    <Footer />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import filter from 'lodash/filter'
import * as queries from '@/graphql/queries'
import InnerHeader from '@/components/Header/InnerHeader.vue'
import RecallSearchDetailedList from '@/components/Recall/RecallSearchDetailedList.vue'
import RecallLoader from '@/components/Recall/RecallLoader.vue'
import types from '@/utils/types'
import RecallFilter from '@/components/RecallFilter'
import RecallSearchTypeTitle from '@/components/Recall/RecallSearchTypeTitle'
import Footer from '@/components/Footer.vue'
import { getDealers, transformDealers } from '@/utils/dealers'

export default {
  name: 'RecallByType',
  components: {
    RecallSearchTypeTitle,
    RecallFilter,
    InnerHeader,
    RecallSearchDetailedList,
    RecallLoader,
    Footer
  },

  async asyncData ({ route, $content, error }) {
    try {
      const { zipcode } = route.query
      let dealers = []
      if (zipcode) {
        const { body } = await getDealers($content)
        const filteredDealers = filter(body, item => item.Zip === zipcode)

        dealers = transformDealers(filteredDealers).map((item) => {
          item.addressDisplay = `${item.address} ${item.city}, ${item.state} ${item.zip} United States`
          return item
        })
      }
      return {
        dealers
      }
    } catch (e) {
      console.error(e)
      error({ statusCode: 404, message: e.toString() })
    }
  },

  data () {
    return {
      showLoader: true,
      showList: false,
      timer: null,
      loaderWidth: 20,
      recalls: [],
      page_size: 50,
      total: 0,
      summary: {},
      loading: true,
      prevTokens: [null],
      nextToken: null
    }
  },
  computed: {},
  mounted () {
    this.fetchTypeCount()
    this.fetchData()
    this.timer = setInterval(() => {
      if (this.loaderWidth === 100) {
        clearInterval(this.timer)
        this.timer = null
        this.showLoader = false
        this.showList = true
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
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      window.addEventListener('scroll', this.setMap)
      this.$nextTick().then(() => document.body.classList.add('no-footer'))
    }
  },
  destroyed () {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      document.body.classList.remove('no-footer')
      window.removeEventListener('scroll', this.setMap)
    }
  },
  methods: {
    fetchData () {
      const slug = this.$route.params.slug
      this.showLoader = true
      this.$appsyncClient
        .query({
          query: gql(queries.recallsByType),
          variables: {
            type: slug,
            limit: this.page_size,
            nextToken: this.nextToken
          }
        })
        .then(({ data }) => {
          const recalls = data.recallsByType.items
            .map((item) => {
              item.description = item.summary
              item.risk = item.conequence
              item.id = item.recall_id
              if (item.recall_date && item.recall_date.length === 8) {
                // YYYYMMDD ==> MM/DD/YYYY
                const day = item.recall_date.substr(6, 2)
                const month = item.recall_date.substr(4, 2)
                const year = item.recall_date.substr(0, 4)
                item.date = `${month}/${day}/${year}`
              } else {
                item.date = ''
              }
              return item
            })
          this.recalls = recalls
          this.nextToken = data.recallsByType.nextToken
        })
        .catch(console.error)
        .finally(() => {
          this.showLoader = false
          this.scrollTop()
        })
    },
    toNextPage () {
      if (this.nextToken) {
        this.prevTokens.push(this.nextToken)
        this.fetchData()
      }
    },
    toPrevPage () {
      const len = this.prevTokens.length
      if (len > 1) {
        this.nextToken = this.prevTokens[len - 2]
        const arr = JSON.parse(JSON.stringify(this.prevTokens))
        arr.length--
        this.prevTokens = arr
      }
      this.fetchData()
    },
    scrollTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    fetchTypeCount () {
      this.$appsyncClient
        .query({
          query: gql(queries.listV2FlatRecallCountByTypes)
        })
        .then(({ data }) => {
          const items = data.listV2FlatRecallCountByTypes.items
          const slug = this.$route.params.slug
          // eslint-disable-next-line no-unused-vars
          for (const item of items) {
            if (item.type === slug) {
              this.total = item.count
              if (types[item.type]) {
                this.summary = {
                  type: item.type,
                  name: types[item.type].name,
                  image: types[item.type].image
                }
              }
              break
            }
          }
        })
        .catch(console.error)
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
<style scoped lang="scss">

  .list-recall-container {
    margin-top: 100px;
  }
  .paging-container {
    display: flex;
    width: 100%;
    padding: 20px 0;
    div {
      width: 50%;
      &.prev {
        text-align: right;
        margin-right: 5px;
      }
      &.next {
        text-align: left;
        margin-left: 5px;
      }
    }
  }
  #recall-search-result {
    padding-top: 127px;
    padding-bottom: 60px;
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

    #recall-search-result {
      padding-top: 200px;
    }
  }

  @media screen and (max-width: 767px) {
    #recall-search-result {
      padding-top: 0;
    }
  }

  .recall-form-container {
    background: #fff;
    padding: 25px;
    margin-top: 65px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &>div {
      padding-top: 10px;
    }
  }

  .result-footer {
    background: #fff;
    padding: 25px;
    margin: 0 auto;
  }
</style>
