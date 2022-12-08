<template>
  <section class="latest-news-section">
    <div class="container">
      <h2 class="section-heading">
        Latest News
      </h2>
      <div class="row">
        <recall-news-item v-for="item in firstList" :key="item.key" :item="item" />

        <div class="col-12">
          <div class="ad-block">
            <cld-image loading="lazy" cloud-name="motorsafety" public-id="v2-motorsafety/assets/images/adv" />
            <h6 class="mb-0 text-gray">
              Advertisment
            </h6>
          </div>
        </div>

        <recall-news-item v-for="item in secondList" :key="item.key" :item="item" />
      </div>
    </div>
  </section>
</template>

<script>

import RecallNewsItem from './Recall/RecallNewsItem.vue'

export default {
  name: 'LatestNews',
  components: { RecallNewsItem },
  props: {
    recallNews: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      firstList: [],
      secondList: []
    }
  },
  watch: {
    recallNews: {
      handler (val) {
        this.separateList(val)
      },
      deep: true
    }
  },
  mounted () {
    this.separateList(this.recallNews)
  },
  methods: {
    separateList (recallNews) {
      if (recallNews.length >= 6) {
        this.firstList = recallNews.slice(0, 6)
        this.secondList = recallNews.slice(6)
      } else {
        this.firstList = recallNews.slice()
        this.secondList = []
      }
    }
  }
}
</script>
<style scoped>

  .ad-block {
    margin-bottom: 40px;
    background: #fbfbfb;
    border-radius: 6px;
    height: 210px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .ad-block h6 {
    margin: 15px 0 0 0;
    opacity: 30%;
  }
</style>
