<template>
  <div>
    <client-only>
      <carousel
        v-if="!loading"
        :loop="true"
        :margin="10"
        :nav="false"
        :dots="false"
        :autoplay="true"
        :autoplay-timeout="7000"
        :responsive="responsive"
        class="recall-type-owl"
      >
        <div v-for="(item, index) in itemList" :key="index" class="item">
          <div class="card" @click="gotoRecallTypePage(item)">
            <cld-image cloud-name="motorsafety" :public-id="`v2-motorsafety/assets/recall-components/${item.image}`">
              <cld-transformation quality="auto" width="200" crop="scale" />
            </cld-image>
            <div class="card-img-overlay">
              <!--              <span v-show="showIcon" class="icon">-->
              <!--                <i :class="item.icon_class" />-->
              <!--              </span>-->
              <h4 class="card-title">
                {{ item.title }}
              </h4>
              <p class="card-text">
                {{ item.recall }} Recalls
              </p>
            </div>
          </div>
        </div>
      </carousel>
    </client-only>
  </div>
</template>

<script>
// import gql from 'graphql-tag'
// import * as queries from '@/graphql/queries'
// import types from '@/utils/types'

export default {
  name: 'RecentRecalls',
  props: {
    showIcon: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      itemList: [],
      loading: true
    }
  },
  mounted () {
    this.fetchTypes()
  },
  methods: {
    fetchTypes () {
      this.loading = true
      // this.$appsyncClient
      //   .query({
      //     query: gql(queries.listV2FlatRecallCountByTypes)
      //   })
      //   .then(({ data }) => {
      //     const items = data.listV2FlatRecallCountByTypes.items
      //     items.sort((a, b) => a.type.localeCompare(b.type))
      //     const itemList = []
      //     items.forEach((item) => {
      //       if (types[item.type]) {
      //         itemList.push({
      //           image: types[item.type].image,
      //           icon_class: types[item.type].icon,
      //           title: types[item.type].name,
      //           type: item.type,
      //           recall: item.count
      //         })
      //       }
      //     })
      //     this.itemList = itemList
      //   })
      //   .catch(console.error)
      //   .finally(() => {
      //     this.loading = false
      //   })
    },
    gotoRecallTypePage (item) {
      this.$router.push(`/type/${item.type}/`)
    }
  }
}
</script>
<style scoped lang="scss">
  .item .card {
    overflow: hidden;
    cursor: pointer;
    height: 311px;
    width: 230px;
    border-radius: 4px;
    border: 0;
  }

  .item .card:hover img.card-img {
    transform: scale(1.1);
    transition: all 0.5s ease;
  }

  .item .card-img-overlay {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-flow: column;
    background: url(https://res.cloudinary.com/motorsafety/image/upload/v2-motorsafety/assets/images/gradient) no-repeat bottom center;
    background-size: cover;
    color: #fff;
    border-radius: 4px;
  }

  .item img.card-img {
    border-radius: 4px;
    transform: scale(1);
    transition: all 0.5s ease;
  }

  .item .card-img-overlay h4 {
    font-size: 24px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 5px;
  }

  .component-icon {
    color: #fff;
  }

  .component-icon > svg {
    fill: #fff !important;
  }
</style>
