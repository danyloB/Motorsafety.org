<template>
  <ul class="dealer-state-list">
    <li v-for="state in states" :key="state.id">
      <NuxtLink :to="getPageRoute(state.id)">
        {{ state.text }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
import states from '@/utils/states'

export default {
  props: {
    nested: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      states
    }
  },
  methods: {
    getPageRoute (id) {
      return this.nested ? `/dealers/state/${id}/${this.$route.params.make}/` : `/dealers/state/${id}/`
    }
  }
}
</script>

<style scoped lang="scss">
.dealer-state-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(26, minmax(0, 1fr));
  grid-auto-flow: column;
  list-style-type: none;
  list-style: none;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(13, minmax(0, 1fr));
  }
}
</style>
