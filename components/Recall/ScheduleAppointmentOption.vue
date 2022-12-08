<template>
  <div>
    <div
      id="schedule-appt"
      class="cnt-overlay"
      style="display:none;"
      @click="hidePopup()"
    >
      <div class="overlay-content">
        <span class="close" @click="hidePopup()">
          <font-awesome-icon icon="times" />
        </span>
        <div id="custom-btn" class="d-flex flex-column custom-btn">
          <button
            type="button"
            class="btn cmn-round-btn btn-lg btn-purple-light"
          >
            <i class="icon-phone" /> Call/SMS
          </button>
          <button
            v-b-modal.appointment-modal
            type="button"
            class="btn cmn-round-btn btn-lg btn-blue-light"
          >
            <i class="icon-email" /> Leave a message
          </button>
        </div>
      </div>
    </div>
    <b-modal
      id="appointment-modal"
      title="BootstrapVue"
      hide-header
      hide-footer
      centered
      @show="hidePopup()"
    >
      <ScheduleAppointment :apointment-class="apointmentClass" />
    </b-modal>
  </div>
</template>

<script>
import ScheduleAppointment from '@/components/ScheduleAppointment.vue'

export default {
  name: 'ScheduleAppointmentOption',
  components: {
    ScheduleAppointment
  },
  data () {
    return {
      apointmentClass: 'scheduel-modal'
    }
  },
  methods: {
    hidePopup: () => {
      const schdlOtpion = document.getElementById('schedule-appt')
      schdlOtpion.style.display = 'none'
    }
  }
}
</script>
<style scoped>
  .cnt-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }

  .overlay-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .custom-btn {
    position: relative;
  }

  .overlay-content .close {
    position: absolute;
    right: 50px;
    top: 50px;
    color: #fff;
  }

  .overlay-content .btn {
    display: flex;
    align-items: center;
    min-width: 250px;
    margin-bottom: 15px;
    justify-content: center;
  }

  .overlay-content .btn i {
    margin-right: 10px;
  }

  #appointment-modal .modal-dialog {
    max-width: 640px;
  }

  .schedule-modal .form-control {
    height: 60px !important;
    font-size: 18px;
    line-height: 60px;
  }
</style>
