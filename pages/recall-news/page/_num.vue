<template>
  <RecallNewsListView
    :page="page"
    :per_page="per_page"
    :total="total"
    :banner="banner"
    :recall-news="recallNews"
    :categories="categories"
  />
</template>

<script>
// @ is an alias to /src
import content from '@/utils/content'
import RecallNewsListView from '@/components/RecallNewsListView'

export default {
  name: 'RecallNewsByPage',
  components: {
    RecallNewsListView
  },
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.num)
  },
  async asyncData ({ $content, error, route }) {
    return await content.wrap(error, () => {
      // eslint-disable-next-line camelcase
      const per_page = 10
      let page = +route.params.num
      if (!page) { page = 1 }

      const params = {
        page,
        per_page,
        resolveTotal: true
      }
      return content.recallNewsData($content, params)
    })
  },
  data () {
    return {
      per_page: 10
    }
  }
}
</script>
<style scoped>
  .recall-news-banner {
    margin-top: 65px;
  }

  .recall-news-banner .container {
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 54px;
  }
</style>
