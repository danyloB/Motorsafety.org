<template>
  <DealersByMakeStatePage :dealers="dealers" />
</template>

<script>
import DealersByMakeStatePage from '@/components/Dealers/DealersByMakeStatePage.vue'
import DealersMakeStatePageMixin from '@/utils/mixins/dealersMakeStatePage'

export default {
  name: 'LocateDealerByMakePage',
  components: {
    DealersByMakeStatePage
  },
  mixins: [DealersMakeStatePageMixin]
}
</script>
