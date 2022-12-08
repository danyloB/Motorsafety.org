<template>
  <div class="news-side-panel">
    <ul class="recall-brand-list">
      <li v-for="category in item.categories" :key="category.id" @click="gotoCategoryNews(category)">
        <h5>{{ category.name }}</h5>
        <span v-if="category.image" class="icon">
          <img :src="category.image" alt="">
        </span>
      </li>
    </ul>

    <div v-if="item.acf && item.acf.nhtsa_campaign_number">
      <div class="nhtsa-id">
        NHTSA Campaign Number
      </div>
      <p>{{ item.acf.nhtsa_campaign_number }}</p>
    </div>
    <div v-if="item.acf && item.acf.recall_master_id">
      <div class="rm-id">
        RM ID
      </div>
      <p>{{ item.acf.recall_master_id }}</p>
    </div>
    <div v-if="item.acf && item.acf.recall_date">
      <div class="recall-date">
        Recall Date
      </div>
      <p>{{ item.acf.recall_date }}</p>
    </div>

    <div class="share-cnt">
      <div class="social-links">
        Share : <a href="https://www.facebook.com/motorsafety.org/"><font-awesome-icon :icon="['fab', 'facebook-f']" /> </a>
        <a href="https://twitter.com/motorsafetyorg"><font-awesome-icon :icon="['fab', 'twitter']" /> </a>
      </div>
    </div>

    <div v-if="item.tags && item.tags.length" class="article-tags mb-4">
      <h5>Tags: </h5>
      <div>
        <div v-for="tag in item.tags" :key="tag.slug" class="post-tag">
          <nuxt-link :to="`/tag/${tag.slug}/`">
            {{ tag.name }}
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="author-detail">
      <h5>Author: </h5>
      <div v-for="author in item.author_info" :key="author.slug" class="author-info-container">
        <div class="avatar">
          <img v-if="author.avatar_urls && author.avatar_urls && author.avatar_urls['48']" :src="author.avatar_urls['48']" :alt="author.name">
        </div>
        <nuxt-link :to="`/author/${author.slug}/`">
          {{ author.name }}
        </nuxt-link>
        <p>{{ author.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NewsDetailSummary',
  props: {
    item: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    status () {
      if (this.item.status === 'publish') {
        return 'Published'
      }
      return this.item.status
    }
  },
  mounted () {
  },
  methods: {
    gotoCategoryNews (category) {
      this.$router.push({
        path: `/category/${category.slug}/`
      })
    },
    gotoAuthorNews (author) {
      this.$router.push({
        path: `/author/${author.slug}/`
      })
    }
  }
}
</script>

<style scoped>
  .share-cnt {
    border-top: 1px solid #e7e7e7;
    padding-top: 20px;
    color: #6a6a6a;
  }

  .share-cnt a {
    color: #6a6a6a;
    margin: 0 10px;
  }

  .share-cnt a:hover {
    color: #000;
  }

  .news-side-panel p {
    opacity: 0.7;
  }

  .news-side-panel h6 {
    margin-bottom: 10px;
  }

  .news-side-panel p,
  .news-side-panel ul {
    margin-bottom: 25px;
  }

  .recall-brand-list {
    margin: 0;
    padding: 0;
  }

  .recall-brand-list li {
    height: 56px;
    margin-bottom: 15px;
    cursor: pointer;
    display: flex;
    border-radius: 4px;
    align-items: center;
    border: 1px solid #e7e7e7;
    overflow: hidden;
    background: #fff;
  }

  .recall-brand-list h5 {
    margin: 0 10px;
  }

  .recall-brand-list h5 em {
    display: block;
    font-size: 14px;
    opacity: 0.5;
    font-weight: 400;
    font-style: normal;
  }

  .recall-brand-list li .icon {
    margin-left: auto;
    padding: 15px;
  }

  .recall-brand-list li .icon img {
    max-width: 30px;
    max-height: 30px;
  }

  .recall-brand-list li:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    border-color: #cddfee;
  }

  @media screen and (max-width: 767px) {
    .news-side-panel {
      border-top: 1px solid #e7e7e7;
      padding-top: 20px;
    }

    .news-side-panel .recall-brand-list li {
      width: 100%;
    }
  }
  .author-name {
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 500;
    color: #0E0E0E;
  }

</style>
