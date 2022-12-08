<template>
  <div>
    <div class="motorsafety-seo-link">
      <a v-for="item in recallNews" :key="item.id" :href="`/${item.slug}/`">{{ item.title }}</a>
    </div>
    <client-only>
      <carousel
        id="news-recall"
        ref="carousel"
        :loop="true"
        :nav="false"
        :dots="false"
        :autoplay="true"
        :autoplay-timeout="7000"
        :responsive="{
          0: {
            items: 1.2
          },
          600: {
            items: 2
          },
          768: {
            items: 2.2
          },
          1000: {
            items: 3
          }
        }"
        @initialized="updateMaxHeight"
        @resized="updateMaxHeight"
        @translated="updateMaxHeight"
      >
        <div v-for="item in recallNews" :key="item.id" class="item">
          <div class="card border-0 position-relative card-no-shadow" @click="goToDetailPage(item)">
            <div v-if="item.category && item.category.image" class="brand-logo">
              <img :src="item.category.image" alt="">
            </div>
            <img class="card-img-top" :src="item.featured_image" :alt="item.altText">
            <div class="card-body pl-0 pr-0">
              <h4 class="card-title" v-html="item.title">
              </h4>
              <div class="card-text">
                <p class="d-none d-md-block" v-html="item.excerpt" />
                <div class="date">
                  <span>{{ item.display_date }}</span>
                  <span
                    v-if="item.category"
                    class="link-btn"
                    @click="gotoCategoryNews(item.category)"
                  >{{ item.category.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </carousel>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'RecallLatestNews',
  props: {
    recallNews: {
      type: Array,
      default: () => []
    },
    skip: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loading: true,
      items: []
    }
  },
  methods: {
    updateMaxHeight () {
      if (process.client) {
        const container = document.getElementById('news-recall')
        if (container) {
          let maxHeight = 0
          container
            .querySelectorAll('#news-recall .owl-item.active')
            .forEach((activeItem) => {
              if (activeItem.offsetHeight > maxHeight) {
                maxHeight = activeItem.offsetHeight
              }
            })
          container.style.height = maxHeight + 'px'
          container.style.maxHeight = maxHeight + 'px'
        }
      }
    },

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
  #news-recall {
    overflow-y: hidden;
  }
  #news-recall .item {
    padding: 15px;
    width: 400px;
  }
  #news-recall .item .card {
    width: 95%;
    height: auto;
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

  @media screen and (min-width: 768px) and (max-width: 1199px) {
    .latest-news-section h4.card-title {
      font-size: 20px;
    }

    #news-recall .item .card {
      width: 280px;
      height: auto;
    }
  }

  @media screen and (max-width: 767px) {
    #news-recall .item .card {
      width: 250px;
      height: auto;
    }
  }
  .card-no-shadow {
    box-shadow: none;
  }
</style>
