<template>
  <div>
    <div :class="showAll? '': 'hidden-item'" class="all-brands-ctn">
      <ul class="recall-brand-list">
        <li v-for="(item, index) in categories" :key="index">
          <nuxt-link :to="`/category/${item.slug}/`">
            <h5> {{ item.name }}</h5>
            <span class="icon">
              <img :src="item.image" alt="">
            </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <span
      class="all-link link-btn"
      @click="showAll=!showAll"
    >Show all Brands <font-awesome-icon icon="arrow-right" /></span>
  </div>
</template>

<script>
export default {
  name: 'RecallByBrand',
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showAll: false,
      navText: ['<font-awesome-icon icon="arrow-left" />', '<font-awesome-icon icon="arrow-right" />']
    }
  },
  methods: {
  }

}
</script>
<style scoped>
  .all-brands-ctn {
    margin-bottom: 1rem;
  }

  .hidden-item {
    max-height: 630px;
    overflow-y: hidden;
  }

  .recall-brand-list li {
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #e7e7e7;
    overflow: hidden;
    background: #fff;
    margin-bottom: 20px;
  }

  .recall-brand-list li a{
    display: flex;
    align-items: center;
    height: 58px;
  }

  .recall-brand-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-column-gap: 15px;
  }

  .recall-brand-list li a .icon {
    margin-left: auto;
    padding: 15px;
  }

  .recall-brand-list li a .icon img {
    max-width: 30px;
    max-height: 30px;
  }

  .recall-brand-list li a span.icon img {
    max-width: 44px;
    max-height: 44px;
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

  .recall-brand-list li:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    border-color: #cddfee;
  }

  .alpha-list {
    display: block;
    text-align: center;
    padding: 15px;
  }

  .alpha-list span {
    display: block;
    width: 30px;
    height: 30px;
    background: #e7e7e7;
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    border-radius: 50px;
    margin: 0 auto;
  }
</style>
