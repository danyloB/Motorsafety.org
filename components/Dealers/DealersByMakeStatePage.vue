<template>
  <div>
    <div>
      <InnerHeader />
      <div id="middle">
        <section class="mt-5">
          <div class="container">
            <template v-if="dealers && dealers.length > 0">
              <h2 class="section-heading">
                Recall Repair Centers
              </h2>
              <RecallRepairCenterList :dealers="dealers" />
            </template>
            <div v-else class="dealers-not-found">
              <h3>Sorry, We can not find any dealership</h3>
            </div>
          </div>
        </section>
        <section class="pt-5">
          <client-only>
            <RecallForm />
          </client-only>
        </section>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import InnerHeader from '@/components/Header/InnerHeader.vue'
import RecallRepairCenterList from '@/components/Recall/RecallRepairCenterList.vue'
import RecallForm from '@/components/RecallForm.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    InnerHeader,
    RecallRepairCenterList,
    RecallForm,
    Footer
  },
  props: {
    dealers: {
      type: Array,
      default: () => []
    }
  }
}
</script>
