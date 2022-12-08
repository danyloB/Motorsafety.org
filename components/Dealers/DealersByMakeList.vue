<template>
  <ul class="dealer-make-list">
    <li v-for="make in makes" :key="make.id">
      <NuxtLink :to="getPageRoute(make.id)">
        {{ make.text }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
import makes from '@/utils/makes'

export default {
  props: {
    nested: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      makes
    }
  },
  methods: {
    getPageRoute (id) {
      return this.nested ? `/dealers/state/${this.$route.params.state}/${id.toLowerCase()}/` : `/dealers/make/${id.toLowerCase()}/`
    }
  }
}
</script>

<style scoped lang="scss">
.dealer-make-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(28, minmax(0, 1fr));
  grid-auto-flow: column;
  list-style-type: none;
  list-style: none;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(18, minmax(0, 1fr));
  }
}
</style>
