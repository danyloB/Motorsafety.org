<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle">
        <section class="searchby-location">
          <div class="container">
            <h1 class="city-name">
              {{ titleText }} {{ city }}
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
              <h3>Sorry, We can not find any dealership in {{ city }}</h3>
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
            <RecallLatestNews :recallNews="recallNews" />
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
  async asyncData ({ route, $content }) {
    const { params: { city_state_slug } } = route
    let city = city_state_slug

    const dealers = await content.fetchDealers($content, {
      cityStateSlug: city_state_slug
    })

    if (dealers.length > 0) {
      city = `${dealers[0].state} - ${dealers[0].city}`
    }

    const recallNews = await content.fetchPosts($content)
    return {
      city,
      dealers,
      recallNews
    }
  },
  data () {
    return {
      titleText: 'Dealerships in'
    }
  },
  head () {
    return {
      title: `${this.titleText} ${this.city} - Motorsafety`
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
.city-name {
  text-transform: capitalize;
}
</style>
