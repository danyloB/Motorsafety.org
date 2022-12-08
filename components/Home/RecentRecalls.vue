<template>
  <div>
    <ul class="home-recall-list-cnt">
      <li v-for="item in items" :key="item.id">
        <div class="recall-list-item">
          <nuxt-link :to="`/${item.slug}/`" class="recall-list-item-url">
            <span class="icon">
              <img v-if="item.category" :src="item.category.image" alt="">
            </span>
            <h5>
              <template v-if="item.category" href="#">
                {{ item.category.name }}
              </template>
              <span> {{ timeAgo(item.createdAt) }} ago</span>
            </h5>
          </nuxt-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  parseISO,
  formatDistanceToNow
} from 'date-fns'

export default {
  name: 'RecentRecalls',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  methods: {
    timeAgo (dt) {
      return formatDistanceToNow(parseISO(dt))
    },

    goToDetailPage (item) {
      this.$router.push({
        name: 'slug',
        params: {
          slug: item.slug
        }
      })
    }
  }
}
</script>
<style scoped>
  .recent-recalls {
    padding-top: 41px;
  }

  .home-recall-list-cnt {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .home-recall-list-cnt li {
    margin-bottom: 25px;
  }

  .recall-list-item {
    cursor: pointer;
    display: flex;
    border-radius: 4px;
    height: 76px;
    align-items: center;
    border: 1px solid #e7e7e7;
    overflow: hidden;
    background: #fff;
  }

  .recall-list-item span.icon {
    width: 76px;
    height: 75px;
    background: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .recall-list-item span.icon img {
    max-width: 44px;
    max-height: 44px;
  }

  .recall-list-item h5 {
    margin: 0 10px;
  }

  .recall-list-item h5 span {
    display: block;
    font-size: 14px;
    opacity: 0.5;
    font-weight: 400;
    font-style: normal;
  }

  .recall-list-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    border-color: #cddfee;
  }

  .recall-list-item:hover span.icon {
    background: #e1ebf4;
  }

  .faq-sec .home-recall-list-cnt {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .home-recall-list-cnt li {
    width: 49%;
  }

  .recall-list-item-url {
    display: flex;
  }

  .recall-list-item-url h5 {
    padding-top: 10px;
  }

  @media screen and (max-width: 576px) {
    .home-recall-list-cnt li {
      width: 100%;
      max-width: 100%;
    }

    .home-recall-list-cnt li .recall-list-item {
      width: 100%;
    }
  }
</style>
