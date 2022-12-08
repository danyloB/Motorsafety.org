<template>
  <RecallNewsListView
    :page="page"
    :per_page="per_page"
    :total="total"
    :banner="banner"
    :recall-news="recallNews"
    :categories="categories"
  >
    <div slot="page-title">
      <h1 class="recall-news-page-title">
        {{ `${category.name} Recalls` }}
      </h1>
    </div>
  </RecallNewsListView>
</template>

<script>
// @ is an alias to /src
import content from '@/utils/content'
import RecallNewsListView from '@/components/RecallNewsListView'

export default {
  name: 'CategoryRecallNewsByPage',
  components: {
    RecallNewsListView
  },
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.num)
  },
  async asyncData ({ route, error, $content }) {
    return await content.wrap(error, async () => {
      // eslint-disable-next-line camelcase
      const per_page = 10
      let page = +route.params.num
      if (!page) { page = 1 }
      const slug = route.params.slug

      const category = await content.fetchCategory($content, slug)

      const params = {
        page,
        per_page,
        resolveTotal: true,
        category: category.id
      }
      return content.recallNewsData($content, params, {
        append: {
          category
        }
      })
    })
  },
  data () {
    return {
    }
  },
  head () {
    const description = `${this.category.description} | Motorsafety.org`
    return {
      title: `${this.category.name} | Motorsafety.org`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:description', name: 'og:description', content: description }
      ]
    }
  },
  watchQuery: ['page']
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
