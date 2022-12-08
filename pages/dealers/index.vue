<template>
  <LocaleDealerPage :recall-news="recallNews" />
</template>

<script>
import content from '@/utils/content'
import LocaleDealerPage from '@/components/Dealers/LocaleDealerPage'

export default {
  name: 'LocateDealerListing',
  components: {
    LocaleDealerPage
  },
  async asyncData ({ $content }) {
    const recallNews = await content.fetchPosts($content)
    return {
      recallNews
    }
  }
}
</script>

<style scoped>
</style>
