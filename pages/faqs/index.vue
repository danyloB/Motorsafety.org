<template>
  <div>
    <div id="main-container" class="main-container">
      <div id="inner-container" class="inner-container">
        <InnerHeader />
        <div class="faq-container">
          <div class="title">
            <h1>Frequently Asked Questions</h1>
            <p>Please check out our FAQs below. If you don't find the answer you need, feel free to reach out to our team.</p>
          </div>
          <b-list-group>
            <b-list-group-item
              v-for="faq in faqs"
              :id="faq.id"
              :key="faq.id"
            >
              <div
                class="d-flex w-100 justify-content-between faq-toggle"
                @click="faq.visible = !faq.visible"
              >
                <h6 class="mb-1">
                  {{ faq.title }}
                </h6>
                <small class="text-muted">
                  <font-awesome-icon :icon="['fas', 'angle-down']" class="ml-auto" />
                </small>
              </div>
              <b-collapse v-model="faq.visible">
                <p class="mb-1" v-html="faq.detail" />
              </b-collapse>
            </b-list-group-item>
          </b-list-group>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
<script>
import faqs from '@/utils/faqs'
import InnerHeader from '@/components/Header/InnerHeader'
import Footer from '@/components/Footer.vue'

export default {
  name: 'FAQ',
  components: { InnerHeader, Footer },
  data () {
    return {
      faqs
    }
  },
  jsonld () {
    const items = this.faqs.map((faq, index) => ({
      '@type': 'Question',
      name: faq.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.description
      }
    }))
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items
    }
  },
  mounted () {
    const hash = window.location.hash
    if (hash) {
      let found = false
      const id = hash.substr(1)
      this.faqs = this.faqs.map((faq) => {
        if (faq.id === id) {
          faq.visible = true
          found = true
        }
        return faq
      })
      if (found) {
        this.$nextTick(() => {
          const elm = document.getElementById(id)
          const top = elm.offsetTop
          setTimeout(function () {
            window.scrollTo(0, top)
          }, 500)
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .faq-container {
    margin: auto;
    max-width: 1100px;
    padding-top: 100px;
    padding-bottom: 60px;
  }
  .title {
    text-align: center;
    padding-bottom: 30px;
  }
  .faq-toggle {
    cursor: pointer;
  }
</style>
