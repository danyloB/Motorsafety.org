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
        {{ `${tag.name}` }}
      </h1>
    </div>
  </RecallNewsListView>
</template>

<script>
// @ is an alias to /src
import content from '@/utils/content'
import RecallNewsListView from '@/components/RecallNewsListView'

export default {
  name: 'TagRecallNews',
  components: {
    RecallNewsListView
  },
  async asyncData ({ route, error, $content }) {
    return await content.wrap(error, async () => {
      // eslint-disable-next-line camelcase
      const page = 1
      const per_page = 10
      const slug = route.params.slug

      const tag = await content.fetchTag($content, slug)

      const params = {
        per_page,
        page,
        tag: tag.id,
        resolveTotal: true
      }
      return content.recallNewsData($content, params, {
        append: {
          tag
        }
      })
    })
  },
  data () {
    return {
    }
  },
  head () {
    const title = `${this.tag.name} | Motorsafety.org`
    return {
      title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: title },
        { hid: 'og:description', name: 'og:description', content: title }
      ]
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
