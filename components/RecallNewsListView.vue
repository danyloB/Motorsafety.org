<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle">
        <div id="recall-news-page">
          <div class="container">
            <slot name="page-title"></slot>
          </div>

          <section
            v-if="banner"
            :class="{
              'recall-news-banner': true,
              'has-more-news': recallNews.length > 0
            }"
          >
            <div class="container">
              <MainBanner :item="banner" />
            </div>
          </section>

          <LatestNews v-if="recallNews.length > 0" :recall-news="recallNews" />

          <div v-if="numOfPages > 0" class="overflow-auto mb-4">
            <b-pagination-nav
              use-router
              align="center"
              :link-gen="linkGen"
              :number-of-pages="numOfPages"
            />
          </div>

          <section v-if="categories && categories.length > 0" class="recall-by-brand">
            <div class="container">
              <h2 class="section-heading">
                Recalls by Brand
              </h2>
              <RecallByBrand :categories="categories" />
            </div>
          </section>

          <ArchivePosts />

          <client-only>
            <RecallForm />
          </client-only>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecallNewsListView',
  components: {
    RecallByBrand: () => import('@/components/Home/RecallByBrand'),
    ArchivePosts: () => import('@/components/ArchivePosts'),
    InnerHeader: () => import('@/components/Header/InnerHeader.vue'),
    MainBanner: () => import('@/components/MainBanner.vue'),
    LatestNews: () => import('@/components/LatestNews.vue'),
    RecallForm: () => import('@/components/RecallForm.vue'),
    Footer: () => import('@/components/Footer.vue')
  },
  props: {
    page: {
      type: Number,
      default: 1
    },
    per_page: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    banner: {
      type: Object,
      default: () => {
      }
    },
    recallNews: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentPage: this.page
    }
  },
  computed: {
    numOfPages () {
      return this.total > 0 ? Math.ceil(this.total / this.per_page) : 0
    }
  },
  watch: {
    page (val) {
      this.currentPage = val
    }
  },
  methods: {
    linkGen (pageNum) {
      const prefix = this.getRoutePrefix()
      return pageNum === 1 ? prefix.replace('page/', '') : `${prefix}${pageNum}/`
    },

    getRoutePrefix () {
      const routeName = this.$route.name
      const params = this.$route.params
      let prefix = '/recall-news/page/'
      switch (routeName) {
        case 'recall-news':
        case 'recall-news-page-num':
          prefix = '/recall-news/page/'
          break
        case 'author-slug':
        case 'author-slug-page-num':
          prefix = `/author/${params.slug}/page/`
          break
        case 'category-slug':
        case 'category-slug-page-num':
          prefix = `/category/${params.slug}/page/`
          break
        case 'tag-slug':
        case 'tag-slug-page-num':
          prefix = `/tag/${params.slug}/page/`
          break
        case 'year-month':
        case 'year-month-page-num':
          prefix = `/${params.year}/${params.month}/page/`
          break
        default:
          prefix = '/recall-news/page/'
          break
      }
      return prefix
    },

    goToRecallNewsPage (page) {
      const prefix = this.getRoutePrefix()
      this.$router.push({
        path: `${prefix}${page}/`
      })
    }
  }
}
</script>
<style scoped>

.recall-news-banner {
  margin-top: 30px;
}

.recall-news-banner .container {
  padding-bottom: 54px;
}

.recall-news-banner.has-more-news .container {
  margin-bottom: 30px;
  border-bottom: 1px solid #e7e7e7;
}
</style>
