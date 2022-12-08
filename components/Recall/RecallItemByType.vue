<template>
  <div>
    <div class="list-title">
      <h6>
        {{ item.component }}
      </h6>
      <div class="list-date">
        <!--            <i class="icon-calendar"></i> AUG 2003-->
        <a
          href="javascript://"
          class="collapse show"
          :aria-expanded="showDetail ? 'true' : 'false'"
          :aria-controls="`recall-info-item-${item.recall_id}`"
          @click="showDetail = !showDetail"
        >
          <font-awesome-icon :icon="['fas', 'angle-down']" />
        </a>
      </div>
    </div>
    <div class="recall-info">
      <div><span class="recall-label">Recall Date: </span> {{ item.date }}</div>
      <div><span class="recall-label">Make: </span> {{ item.make }}</div>
      <div><span class="recall-label">Model: </span> {{ item.model }}</div>
      <div><span class="recall-label">Year: </span> {{ item.model_year }}</div>
    </div>
    <div class="list-desc">
      <div :id="`list-desc-${item.recall_id}`" class="desc">
        <h6>Brief Description</h6>
        <p :class="{'text-description': !showDetail}">
          {{ item.description }}
        </p>
        <b-collapse
          :id="`recall-info-item-${item.recall_id}`"
          v-model="showDetail"
          @show="handleCollapseShowHide('show', item.recall_id)"
          @hide="handleCollapseShowHide('hide', item.recall_id)"
        >
          <h6>Recall Risk</h6>
          <p>
            {{ item.risk }}
          </p>
          Repair information and service
          <div class="item-status d-flex justify-content-between">
            <div class="item-repair-status">
              <i class="icon-clock" />
              <div>
                <h5>Confirm with the Dealer</h5>
                Est. Repair time
              </div>
            </div>
            <div class="btn-cnt detail-schedule-btn">
              <div
                v-b-modal.appointment-modal
                class="btn btn-primary btn-block btn-schedule"
              >
                Schedule Appointment
              </div>
            </div>
          </div>
        </b-collapse>
      </div>
      <div v-if="showDetail" :id="`list-btn-${item.recall_id}`" class="list-btn btn-schedule-ctn">
        <div
          v-b-modal.appointment-modal
          class="btn btn-primary btn-block btn-schedule"
        >
          Schedule Appointment
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import recallItem from '@/utils/mixins/recallItem'

export default {
  name: 'RecallItemByType',
  mixins: [recallItem],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showDetail: this.item && this.item.showDetail
    }
  },
  watch: {
    item: {
      handler (old, val) {
        this.showDetail = val && val.showDetail
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
