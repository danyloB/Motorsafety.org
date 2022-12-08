<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle">
        <section class="searchby-location">
          <div class="container">
            <h1>
              Dealerships with ZIP code {{ zip }}
              <!--              <span> Find your closest dealer around you. </span>-->
            </h1>
          </div>
        </section>

        <section id="repair-centers" class="repair-centers">
          <div class="container">
            <h2 class="section-heading">
              Recall Repair Centers
            </h2>
            <RecallRepairCenterList v-if="dealers.length" :dealers="dealers" />
            <div v-else class="dealers-not-found">
              <h3>Sorry, We can not find any dealership with ZIPCODE {{ zip }}</h3>
            </div>
          </div>
        </section>
        <section>
          <AdvBanner />
        </section>
        <section class="latest-news-section border-bottom">
          <div class="container">
            <h2 class="section-heading">
              Related Posts
            </h2>
            <RecallLatestNews :recall-news="recallNews" />
          </div>
        </section>
        <section class="check-recall-service pt-5">
          <client-only>
            <RecallForm />
          </client-only>
        </section>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import InnerHeader from '@/components/Header/InnerHeader.vue'
import AdvBanner from '@/components/Advertisement/Banner.vue'
import RecallRepairCenterList from '@/components/Recall/RecallRepairCenterList.vue'
import RecallLatestNews from '@/components/Home/RecallLatestNews.vue'
import RecallForm from '@/components/RecallForm.vue'
import Footer from '@/components/Footer.vue'
import content from '@/utils/content'

export default {
  name: 'CityDealers',
  components: {
    InnerHeader,
    AdvBanner,
    RecallRepairCenterList,
    RecallLatestNews,
    RecallForm,
    Footer
  },
  async asyncData ({ route, error, $content }) {
    const { params: { slug: zip } } = route

    if (zip && !Number.isNaN(+zip)) {
      const recallNews = await content.fetchPosts($content)
      const dealers = await content.fetchDealers($content, { zip })

      return {
        zip,
        dealers,
        recallNews
      }
    } else {
      error({ statusCode: 404, message: 'Invalid Zipcode: ' + zip })
    }
  }
}
</script>

<style scoped>
.searchby-location {
  margin: 80px 0;
}

.searchby-location h1 {
  font-size: 48px;
  margin: 0 0 80px;
}

.searchby-location h1 span {
  display: block;
  font-weight: 400;
  font-size: 20px;
  opacity: 0.7;
  margin-top: 15px;
}

.latest-news-section {
  padding-top: 46px;
}

.dealers-not-found {
  padding: 60px 0;
}
</style>
