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
  name: 'RecallNews',
  components: {
    RecallNewsListView
  },
  async asyncData ({ route, error, $content }) {
    return await content.wrap(error, () => {
      // eslint-disable-next-line camelcase
      const page = 1
      const per_page = 10

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
  },
  watchQuery: ['page']
}
</script>
<style scoped>
</style>
