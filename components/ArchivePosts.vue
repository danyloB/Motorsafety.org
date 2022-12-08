<template>
  <section class="archives-post">
    <div class="container">
      <h3>Archives</h3>
      <div>
        <ul class="archives-list">
          <li v-for="post in archives" :key="post.name" class="archive-item">
            <nuxt-link :to="`/${post.year}/${post.month}/`">
              {{ post.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import { getArchives } from '@/utils'

export default {
  name: 'ArchivePosts',
  data () {
    return {
      archives: []
    }
  },
  created () {
    this.archives = getArchives()
  }
}
</script>

<style lang="scss" scoped>
.archives-post {
  padding-top: 1.5rem;
  .archives-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-column-gap: 10px;
    list-style-type: none;
  }
}
</style>
