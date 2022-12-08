<template>
  <div class="cmn-border-box" :class="apointmentClass">
    <h5>
      Schedule Appointment
      <font-awesome-icon icon="times" class="float-right close-btn" @click="closeModal()" />
    </h5>
    <div v-if="appointmentInfo && appointmentInfo.vin || appointmentInfo.make" class="appointment-info">
      <h6>Vehicle info</h6>
      <div v-if="appointmentInfo.vin">
        <span>Vin: </span> {{ appointmentInfo.vin }}
      </div>
      <div v-if="appointmentInfo.make">
        <span>Make: </span> {{ appointmentInfo.make }}
      </div>
      <div v-if="appointmentInfo.model">
        <span>Model: </span> {{ appointmentInfo.model }}
      </div>
      <div v-if="appointmentInfo.year">
        <span>Year: </span> {{ appointmentInfo.year }}
      </div>
    </div>
    <form v-if="showAppointment" @submit.stop.prevent="submitAppointment">
      <div class="form-group">
        <label class="form-label" for="fullName">Full Name</label>
        <input
          id="fullName"
          v-model="form.name"
          type="text"
          class="form-control"
          placeholder="Enter Full Name"
          required
        >
      </div>
      <div class="schedule-modal-group">
        <div class="form-group">
          <label class="form-label" for="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            v-model="form.email"
            type="email"
            class="form-control"
            placeholder="Enter Email Address"
            required
          >
        </div>
        <div class="form-group" style="padding-top: 8px">
          <label class="label-text">Phone number</label>
          <vue-tel-input
            v-model="form.phone_number"
            class="tel-form-input"
            input-classes="form-control"
            required
            @input="onPhoneInput"
          ></vue-tel-input>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="message">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          class="form-control"
          rows="3"
          required
          placeholder="Start typing here..."
        />
      </div>
      <button v-if="loading" type="submit" class="btn btn-primary" disabled>
        <b-spinner small />
      </button>
      <button v-else type="submit" class="btn btn-primary">
        Send
      </button>
    </form>
    <div v-else>
      Created appointment
    </div>
  </div>
</template>

<script>
import gpl from 'graphql-tag'
import * as mutations from '@/graphql/mutations'
import { uuidv4 } from '@/utils'
export default {
  name: 'ScheduleAppointments',
  props: {
    apointmentClass: {
      type: String,
      default: 'dealerModal'
    },
    dealer: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      form: {
        name: '',
        phone_number: '',
        email: '',
        message: ''
      },
      loading: false,
      showAppointment: true,
      phoneInput: {
        number: {}
      }
    }
  },
  computed: {
    appointmentInfo () {
      return this.$store.state.appointmentInfo
    }
  },
  methods: {
    closeModal () {
      this.$bvModal.hide('appointment-modal')
    },
    onPhoneInput (phone, input) {
      this.phoneInput = input
    },
    submitAppointment () {
      this.loading = true
      const id = uuidv4()
      const vehicleInfo = this.$store.state.appointmentInfo || {}
      const data = {
        id,
        ...this.form,
        ...vehicleInfo
      }
      if (this.dealer && this.dealer.id) {
        data.dealer_id = this.dealer.id
        data.dealership = this.dealer.name
      }
      data.phone_number = this.phoneInput.number.e164
      this.$appsyncClient
        .mutate({
          mutation: gpl(mutations.saveAppointment),
          variables: {
            input: data
          }
        })
        .then(() => {
          this.showAppointment = false
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style scoped lang="scss">
  .close-btn {
    cursor: pointer;
  }

  .dealerModal .close-btn {
    display: none;
  }

  .cmn-border-box h5 {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .tel-form-input {
    border: 1px solid #E7E7E7;
  }

  .appointment-info {
    &>div>span {
      font-weight: 600;
      width: 100px;
      display: inline-block;
    }
  }
</style>
