<template>
  <div>
    <ul class="recall-list">
      <li v-for="item in items" :key="item.id">
        <recall-item-by-type v-if="recallByType" :item="item" />
        <recall-item v-else :item="item" :summary="summary" />
      </li>
    </ul>

    <b-modal
      id="appointment-modal"
      title="Schedule Appointment"
      hide-header
      hide-footer
      centered
    >
      <ScheduleAppointment :apointment-class="apointmentClass" />
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ScheduleAppointment from '@/components/ScheduleAppointment'
import RecallItem from '@/components/Recall/RecallItem'
import RecallItemByType from '@/components/Recall/RecallItemByType'
export default {
  name: 'RecallSearchDetailedTitle',
  components: {
    ScheduleAppointment,
    RecallItem,
    RecallItemByType
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    isVin: {
      type: Boolean,
      default: false
    },
    recallByType: {
      type: Boolean,
      default: false
    },
    summary: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      apointmentClass: 'scheduel-modal',
      modalVisible: false
    }
  },
  mounted () {
    const chatData = this.getRecallChatInfo()
    if (this.$intercom && chatData) {
      this.$intercom.update(chatData)
    }
  },
  methods: {
    ...mapActions(['showChat']),
    closePopover (refName) {
      if (this.$refs[refName] && this.$refs[refName].length) {
        this.$refs[refName][0].$emit('close')
      }
    },

    getRecallChatInfo () {
      const { make, year, model, zipcode, vin } = this.$route.query
      switch (this.$route.name) {
        case 'type-slug':
          return {
            recall_type: this.$route.params.slug
          }
        case 'recall-search-detailed':
          return {
            make,
            year,
            model,
            zip: zipcode,
            vin
          }
        default:
          return null
      }
    }
  }
}
</script>
<style lang="scss">
.recall-info {
  margin-bottom: 10px;
}

.recall-label {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 0;
}

.popover {
  background: none !important;
  border: none !important;
}

.popover .arrow {
  display: none !important;
}

.b-popover .arrow {
  display: none;
}

.popover .close {
  position: absolute;
  right: -40px;
  top: 10px;
  color: #333 !important;
}

.popover .btn {
  display: flex;
  align-items: center;
  min-width: 250px;
  margin-bottom: 15px;
  justify-content: center;
}

.popover .btn i {
  margin-right: 10px;
}

ul.recall-list,
.repair-center-list ul {
  list-style-type: none;
  padding-left: 0;
}

ul.recall-list li,
.repair-center-list ul li {
  background: #fff;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 0 24px;
}

ul.recall-list h6 {
  font-size: 20px;
  margin-bottom: 16px;
}

ul.recall-list li h6 span {
  display: block;
  font-size: 14px;
  opacity: 0.7;
  font-weight: 400;
  margin-top: 5px;
}

ul.recall-list li h6 span em {
  font-style: normal;
  margin-right: 20px;
}

ul.recall-list p span {
  display: block;
  font-size: 14px;
}

ul.recall-list .info-label {
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
}

.listing-title-row .title-row {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.listing-title-row .title-row h5 {
  font-size: 20px;
  margin-bottom: 0;
}

.listing-title-row .title-row span {
  opacity: 0.7;
}

.current-recall-cnt .navbar-toggler {
  padding: 0;
}

.list-title {
  display: flex;
  justify-content: space-between;
}

.list-title h6 {
  font-size: 20px;
  line-height: 1.2;
}

ul.recall-list .list-desc {
  display: flex;
  justify-content: space-between;
}

ul.recall-list .list-desc .list-btn {
  width: 265px;
}

ul.recall-list .list-desc .desc.w-100 {
  max-width: 100%;
}

ul.recall-list .list-desc h6 {
  font-size: 16px;
  margin-bottom: 0;
}

ul.recall-list .list-desc {
  font-size: 14px;
  line-height: 22px;
}

ul.recall-list .list-desc p {
  line-height: 22px;
}

ul.recall-list .list-desc .btn-primary {
  padding: 0 25px;
  text-align: center;
  line-height: 50px;
}

ul.recall-list .list-desc .item-repair-status {
  /*height: 61px;*/
  padding: 10px 15px 0;
  height: 100%;
}

ul.recall-list .list-desc .btn-cnt {
  width: 50%;
}

.list-date {
  color: #00b6f2;
  font-weight: 500;
}

.list-date i {
  margin: 0 5px;
}

.list-date a {
  margin-left: 10px;
  color: #000;
}

.item-status {
  font-size: 14px;
}

.item-status h5 {
  font-size: 20px;
  margin: 0;
}

.item-part-status,
.item-repair-status {
  width: 49%;
  padding: 15px;
  display: flex;
  border-radius: 6px;
  background: #eee;
}

.item-part-status i,
.item-repair-status i {
  margin-right: 15px;
  font-size: 20px;
}

.item-part-status.yes {
  background: #e4f2e0;
  color: #395f2d;
}

.item-part-status.yes h5 {
  color: #395f2d;
}

.item-part-status.no {
  background: #f8ebeb;
  color: #882323;
}

.item-part-status.no h5,
.item-part-status.no i:before {
  color: #882323;
}

.item-part-status i {
  font-size: 22px;
}

.item-repair-status {
  background: #eef6f9;
  color: #3086a3;
}

.item-repair-status h5 {
  color: #3086a3;
}

#appointment-modal .modal-dialog {
  max-width: 640px;
}

.schedule-modal .form-control {
  height: 60px !important;
  font-size: 18px;
  line-height: 60px;
}

ul.recall-list .list-desc .list-btn {
  text-align: right;
}

ul.recall-list .list-desc .list-btn .btn-secondary {
  padding: 0 33px;
}

@media screen and (max-width: 991px) {
  ul.recall-list .list-desc {
    flex-flow: column;
  }

  .item-status {
    flex-wrap: wrap;
  }

  .item-part-status,
  .item-repair-status {
    width: 100%;
    margin-bottom: 15px;
  }

  ul.recall-list .list-desc .btn-cnt {
    width: 100%;
  }
}

.schedule-modal-container {
  background: transparent !important;
  border: none;
  max-width: 300px;
}

.schedule-modal-container .modal-body {
  border: none !important;
}

.schedule-modal-container .modal-header {
  border: none !important;
}

.schedule-modal-container .modal-footer {
  border: none !important;
}

.schedule-modal-container button {
  margin-top: 20px;
}

.schedule-modal-container span.close {
  cursor: pointer;
}

.btn-schedule {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.btn-schedule-ctn {
  min-width: 235px;
  padding-top: 15px;
}

.text-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.detail-schedule-btn {
  display: flex;
}

.detail-schedule-btn .btn-schedule {
  height: 100%;
  line-height: 58px;
}

.schedule-popover-container {
  .schedule-appt {
    background: #fff;
    padding: 10px 30px 0 30px;
    width: 310px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.btn-group-call {
  margin-top: 10px;
  text-align: right;
  display: flex;
  justify-content: space-between;
  padding-left: 30px;

  .btn-call {
    width: 45%;
    line-height: 50px;
  }
}

@media screen and (max-width: 767px) {
  ul.recall-list .list-desc .list-btn {
    text-align: left;
  }
  ul.recall-list .list-desc .list-btn .btn-secondary {
    padding: 0 15px;
  }
}
</style>
