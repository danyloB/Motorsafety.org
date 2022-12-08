<template>
  <div id="accordion" class="panel-group">
    <div
      v-for="faq in faqs"
      :key="faq.id"
      class="panel panel-default"
    >
      <div class="panel-heading" role="tab">
        <a
          role="button"
          data-toggle="collapse"
          data-parent="#accordion"
          aria-expanded="true"
          @click="faq.visible = !faq.visible"
        >
          {{ faq.title }}
          <font-awesome-icon :icon="['fas', 'angle-down']" class="ml-auto" />
        </a>
      </div>
      <b-collapse
        v-model="faq.visible"
        class="panel-collapse collapse in show"
        role="tabpanel"
      >
        <div class="panel-body">
          <p>{{ faq.description }}</p>
          <a :href="`/faqs/#${faq.id}`">Read More</a>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import faqs from '@/utils/faqs'
export default {
  name: 'Faq',
  data () {
    return {
      faqs
    }
  },
  methods: {
    gotoFaqPage (faq) {
      this.$router.push(`/faqs/#${faq.id}`)
    }
  }
}
</script>
<style scoped>
  .panel {
    border-bottom: 1px solid #eeeeee;
    padding: 20px 30px;
  }

  .panel:last-child {
    border: none;
  }

  .panel-heading a {
    display: flex;
    width: 100%;
    color: #193b6f;
    align-items: center;
    font-weight: 500;
    cursor: pointer;
  }

  .panel-body {
    padding-top: 15px;
    font-size: 14px;
  }
</style>
