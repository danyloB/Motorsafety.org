<template>
  <div class="repair-center-list">
    <ul>
      <li v-for="dealer in dealers" :key="dealer.id">
        <div class="dealer-header">
          <NuxtLink
            class="dealer-title"
            :to="{
              name: 'dealers-city_state_slug-slug',
              params: {
                slug: dealer.dealerSlug,
                city_state_slug: dealer.city_state_slug
              }
            }"
          >
            {{ dealer.name }}
          </NuxtLink>
          <div class="thumb">
            <cld-image cloud-name="motorsafety" :public-id="dealer.image_id" />
          </div>
        </div>
        <div v-if="dealer.trusted" class="trusted-tag">
          <font-awesome-icon :icon="['fa', 'star']" class="icon icon-left" />
          Trusted Dealer
        </div>
        <p>{{ dealer.addressDisplay }}</p>
        <div style="padding-top: 15px">
          <a v-if="dealer.phone" :href="`tel:${dealer.phone}`" class="btn btn-secondary btn-sm btn-call">Click to Call</a>
        </div>
        <div>
          <button
            class="btn btn-secondary text-black-50 btn-sm btn-call"
            @click="updateChatInfoAndShow(dealer)"
          >
            Click to Chat
          </button>
        </div>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RepairCenterList',
  props: {
    dealers: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    this.fetchDealers()
  },
  beforeDestroy () {
    if (this.$intercom) {
      this.$intercom.update({})
    }
  },
  methods: {
    ...mapActions(['showChat']),

    fetchDealers () {
      this.loading = true
    },
    gotoDealerDetailPage (dealer) {
      this.$router.push({
        name: 'dealers-city_state_slug-slug',
        params: {
          slug: dealer.dealerSlug,
          city_state_slug: dealer.city_state_slug
        }
      })
    },
    updateChatInfoAndShow (dealer) {
      if (this.$intercom) {
        const { name, ...chatData } = dealer
        this.$intercom.update(chatData)
        this.showChat()
      }
    }
  }
}
</script>

<style scoped lang="scss">

  .dealer-header {
    display: flex;

    .dealer-title {
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 600;
      flex: 1;
      color: #333;
    }

    .thumb {
      width: 55px;
      height: 55px;

      img {
        width: 100%;
      }
    }
  }

  .repair-centers .repair-center-list ul {
    justify-content: space-between;
    flex-flow: row;
    display: flex;
    flex-wrap: wrap;
  }

  .repair-center-list ul {
    list-style-type: none;
    padding-left: 0;
  }

  ul {
    padding: 0;
  }

  .repair-centers .repair-center-list ul li {
    width: 32%;
    padding-left: 30px;
    padding-right: 30px;
  }

  .repair-center-list ul li:hover {
    border-top: 4px solid #7abf64;
  }

  .repair-center-list ul li {
    position: relative;
    padding-left: 60px;
    padding-right: 90px;
    border-top: 4px solid transparent;
  }

  ul.recall-list li,
  .repair-center-list ul li {
    background: #fff;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    margin: 0 0 24px;
  }

  .trusted-tag {
    background: #f2f2f2;
    max-width: 150px;
    font-weight: 600;
    color: rgba(14, 14, 14, 0.5);
  }

  .trusted-tag .icon {
    color: #f2c94c;
    font-size: 16px;
    margin-right: 8px;
  }

  // .repair-center-list {
  //   border-bottom: 1px solid #e7e7e7;
  // }

  .repair-center-list ul {
    justify-content: space-between;
    flex-flow: row;
    display: flex;
    flex-wrap: wrap;
  }

  .repair-center-list ul li {
    width: 32%;
    padding-left: 30px;
    padding-right: 30px;
  }

  .repair-center-list ul li .btn {
    margin: 0 10px 10px 0;
  }

  .repair-center-list ul li p {
    font-size: 14px;
    line-height: 22px;
  }

  .trusted-tag {
    display: flex;
    align-items: center;
    height: 26px;
    font-size: 13px;
    border-radius: 50px;
    padding: 0 10px;
    line-height: 26px;
    margin-bottom: 10px;
    background: #f2f2f2;
    max-width: 150px;
    font-weight: 600;
    color: rgba(14, 14, 14, 0.5);
  }
  .btn-call {
    width: 100%;
  }

  .repair-center-list ul li h6 {
    font-size: 18px;
    font-weight: 500;
  }

  @media screen and (max-width: 767px) {
    .repair-centers .repair-center-list ul li {
      width: 100%;
      margin: 0 auto 15px;
    }
  }
</style>

<style>
.thumb .cld-image {
  padding-left: 5px;
}

.thumb .cld-image img {
  width: 55px;
  height: 55px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
</style>
