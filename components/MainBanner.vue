<template>
  <div class="row align-items-center">
    <div class="col-12 col-md-5 col-lg-8 position-relative">
      <div v-if="item.category && item.category.image" class="brand-logo">
        <img :src="item.category.image" alt>
      </div>
      <nuxt-link :to="`/${item.slug}/`">
        <cld-image v-if="item.cld_public_id" loading="lazy" cloud-name="motorsafety" :public-id="item.cld_public_id" class="recall-item-img">
          <cld-transformation width="768" fetchFormat="webp" crop="scale" />
        </cld-image>
        <img
          v-else
          :src="imageSrc"
          alt="car"
          class="banner-img img-fluid"
        >
      </nuxt-link>
    </div>
    <div class="col-12 col-md-7 col-lg-4">
      <div class="banner-text">
        <h1 v-html="item.title"></h1>
        <client-only>
          <p class="d-none d-md-block" v-html="item && item.excerpt" />
        </client-only>
        <div class="date">
          <span>{{ item && item.display_date }}</span>

          <a v-if="item.category" :href="`/category/${item.category.slug}/`">{{ item.category.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainBanner',
  props: {
    item: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    imageSrc () {
      return require('../assets/images/car4.png')
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
  .banner-img {
    cursor: pointer;
  }

  .recall-news-banner p {
    font-size: 18px;
    line-height: 24px;
  }

  .recall-news-banner h1 {
    font-size: 36px;
  }

  .recall-news-banner .date {
    font-size: 18px;
  }

  .banner-text {
    margin-left: 19px;
  }

  .banner-text p {
    font-size: 18px;
    line-height: 28px;
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

  @media screen and (max-width: 1199px) {
    .recall-news-banner h1 {
      font-size: 24px;
      line-height: 1.4;
    }
  }

  @media screen and (max-width: 991px) {
    .recall-news-banner {
      margin-top: 20px;
    }

    .recall-news-banner .container {
      padding-bottom: 36px;
    }
  }
</style>
