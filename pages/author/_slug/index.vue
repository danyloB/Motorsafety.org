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
      <div class="recall-news-author-info">
        <div
          v-if="authorInfo && authorInfo.avatar_urls && Object.keys(authorInfo.avatar_urls).length"
          class="author-avatar"
        >
          <img :src="Object.values(authorInfo.avatar_urls).pop()" alt="author" />
        </div>

        <h1 class="recall-news-page-title">
          {{ `${authorInfo.name}` }}
        </h1>
      </div>
    </div>

    <p>AUTHOR INFO: {{ authorInfo }}</p>
  </RecallNewsListView>
</template>

<script>
// @ is an alias to /src
import content from '@/utils/content'
import RecallNewsListView from '@/components/RecallNewsListView'

export default {
  name: 'AuthorRecallNews',
  components: {
    RecallNewsListView
  },
  async asyncData ({ route, $content, error }) {
    return await content.wrap(error, async () => {
      // eslint-disable-next-line camelcase
      const per_page = 10
      const page = 1
      const slug = route.params.slug

      const authorInfo = await content.fetchAuthor($content, slug)

      const params = {
        per_page,
        page,
        author: authorInfo.id,
        resolveTotal: true
      }
      return content.recallNewsData($content, params, {
        append: {
          authorInfo
        }
      })
    })
  },
  data () {
    return {}
  },
  head () {
    const description = `${this.authorInfo.name} | Protecting Drivers Everywhere`
    return {
      title: `${this.authorInfo.name} | Motorsafety.org`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:description', name: 'og:description', content: description }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
.recall-news-banner {
  margin-top: 65px;
}

.recall-news-banner .container {
  border-bottom: 1px solid #e7e7e7;
  padding-bottom: 54px;
}
</style>
