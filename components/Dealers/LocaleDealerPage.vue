<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle">
        <section class="searchby-location">
          <div class="container">
            <h1 class="mb-4 mb-lg-5">
              Locate your dealer
              <span> Find your closest dealer around you. </span>
            </h1>
            <SearchbyLocation />
          </div>
        </section>

        <section class="pt-5">
          <div class="container">
            <h2 class="section-heading">
              Browse Dealers By Make
            </h2>
            <DealersByMakeList />
          </div>
        </section>

        <section class="pt-5">
          <div class="container">
            <h2 class="section-heading">
              Browse Dealers By State
            </h2>
            <DealersByStateList />
          </div>
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

        <section class="motorsafety-seo-link">
          <template v-for="group in groupDealers">
            <NuxtLink
              v-for="item in group.items"
              :key="`${item.city_slug}.${item.state}`"
              :to="`/dealers/${item.city_slug}.${item.state}`"
            >
              {{ `${item.city_slug}.${item.state}` }}
            </NuxtLink>
          </template>
        </section>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import InnerHeader from '@/components/Header/InnerHeader.vue'
import SearchbyLocation from '@/components/LocateDealer/SearchbyLocation.vue'
import DealersByMakeList from '@/components/Dealers/DealersByMakeList.vue'
import DealersByStateList from '@/components/Dealers/DealersByStateList.vue'
import RecallLatestNews from '@/components/Home/RecallLatestNews.vue'
import RecallForm from '@/components/RecallForm.vue'
import topDealers from '@/utils/topDealers'
import Footer from '@/components/Footer.vue'

export default {
  name: 'LocaleDealerPage',
  components: {
    InnerHeader,
    SearchbyLocation,
    DealersByMakeList,
    DealersByStateList,
    RecallLatestNews,
    RecallForm,
    Footer
  },
  props: {
    recallNews: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      groupDealers: topDealers.groupDealers,
      page: Number.isNaN(+this.$route.params.num) ? 1 : +this.$route.params.num
    }
  }
}
</script>

<style scoped lang="scss">
.searchby-location {
  margin: 60px 0;
  margin-bottom: 0;
}

.searchby-location h1 {
  font-size: calc(175% + 1vw + 1vh);
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

.dealers-paging {
  text-align: center;
  a {
    height: auto;
    line-height: 1.2rem;
    font-size: 1.2rem;
    vertical-align: middle;
    padding-top: 13px;
    padding-bottom: 13px;
    margin-bottom: 16px;
  }
}

@media screen and (max-width: 767px) {
  #middle {
    padding-top: 20px;
  }
}
</style>
