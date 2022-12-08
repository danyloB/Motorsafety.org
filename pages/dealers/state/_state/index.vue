<template>
  <div>
    <InnerHeader />

    <div id="middle">
      <section class="mt-5">
        <div class="container">
          <h2 class="section-heading">
            Browse By Make
          </h2>
          <DealersByMakeList nested />
        </div>
      </section>
    </div>

    <section class="pt-5">
      <client-only>
        <RecallForm />
      </client-only>
    </section>

    <Footer />
  </div>
</template>

<script>
import DealersByMakeList from '@/components/Dealers/DealersByMakeList'
import Footer from '@/components/Footer.vue'
import InnerHeader from '@/components/Header/InnerHeader.vue'
import RecallForm from '@/components/RecallForm.vue'

export default {
  name: 'LocateDealerByStateListing',
  components: {
    DealersByMakeList,
    Footer,
    InnerHeader,
    RecallForm
  }
}
</script>
