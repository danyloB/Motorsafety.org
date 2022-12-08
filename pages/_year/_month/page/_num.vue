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
  name: 'AchievementPostsPaginationPage',
  components: {
    RecallNewsListView
  },
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.year) && /^\d+$/.test(params.month) && /^\d+$/.test(params.num)
  },
  async asyncData ({ route, $content, error }) {
    return await content.wrap(error, () => {
      // eslint-disable-next-line camelcase
      const per_page = 10
      let page = +route.params.num
      if (!page) { page = 1 }
      const { year, month } = route.params

      const params = {
        page,
        year,
        month,
        per_page,
        resolveTotal: true
      }
      return content.recallNewsData($content, params)
    })
  },
  data () {
    return {
    }
  },
  head () {
    const description = 'Protecting Drivers Everywhere'
    return {
      title: ' Motorsafety.org',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:description', name: 'og:description', content: description }
      ]
    }
  }
}
</script>
<style scoped>
</style>
