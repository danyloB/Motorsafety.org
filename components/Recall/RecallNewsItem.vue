<template>
  <div class="col-12 col-md-4">
    <div class="card border-0 position-relative" @click="goToDetailPage(item)">
      <div v-if="item.category && item.category.image" class="brand-logo">
        <img :src="item.category.image" alt>
      </div>
      <!--            <img class="card-img-top" :src="item.featured_image" :alt="item.altText">-->
      <cld-image v-if="item.cld_public_id" loading="lazy" cloud-name="motorsafety" :public-id="item.cld_public_id" class="recall-item-img">
        <cld-transformation width="510" fetchFormat="webp" crop="scale" />
      </cld-image>
      <div class="card-body pl-0 pr-0">
        <h4 class="card-title" v-html="item.title">
        </h4>
        <div class="card-text">
          <p class="d-none d-md-block" v-html="item.excerpt" />
          <div class="date">
            <span>{{ item.display_date }} </span>
            <!--            <font-awesome-icon :icon="['fas', 'circle']" />-->
            &nbsp;
            <a v-if="item.category" :href="`/category/${item.category.slug}/`">{{ item.category.name }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecallNewsItem',
  props: {
    item: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    goToDetailPage (item) {
      this.$router.push({
        name: 'slug',
        params: {
          slug: item.slug
        }
      })
    },
    gotoCategoryNews (category) {
      this.$router.push({
        path: `/category/${category.slug}/`
      })
    }
  }
}
</script>
<style scoped>
  .card {
    padding: 0;
    cursor: pointer;
  }

  .brand-logo {
    position: absolute;
    top: 15px;
    right: 30px;
    width: 43px;
    height: 43px;
    background: #fff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .brand-logo img {
    max-width: 32px;
    max-height: 32px;
  }

  .latest-news-section {
    padding-top: 46px;
  }

  .latest-news-section .card {
    margin-bottom: 20px;
  }

  .latest-news-section .brand-logo {
    right: 15px;
  }

  .latest-news-section h4.card-title {
    font-size: 24px;
    line-height: 1.4;
  }
</style>
