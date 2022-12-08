<template>
  <b-form class="contact-us-form" @submit.prevent.stop="save">
    <b-form-group id="input-group-2" label="Your Name:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="form.name"
        required
        placeholder="Enter name"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-1"
      label="Email address:"
      label-for="input-2"
    >
      <b-form-input
        id="input-2"
        v-model="form.email"
        type="email"
        required
        placeholder="Enter email"
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-3" label="Department:" label-for="input-3">
      <b-form-radio-group id="input-3" v-model="form.department">
        <b-form-radio
          value="Recall Information"
        >
          Recall Information
        </b-form-radio>
        <b-form-radio
          value="Customer Support"
        >
          Customer Support
        </b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <b-form-group id="input-group-4" label="Message:" label-for="input-4">
      <b-form-textarea
        id="input-4"
        v-model="form.message"
        required
        rows="3"
        placeholder="Enter message"
      ></b-form-textarea>
    </b-form-group>

    <b-button type="submit" variant="primary" class="form-submit" :disabled="sent || loading">
      <b-spinner v-if="loading" small />
      <template v-else>
        Submit
      </template>
    </b-button>
    <b-button variant="secondary" class="form-submit" @click="$store.dispatch('showChat')">
      Chat
    </b-button>
  </b-form>
</template>
<script>
import * as mutations from '@/graphql/mutations'
import gpl from 'graphql-tag'
import { uuidv4 } from '@/utils'
export default {
  name: 'ContactUsForm',
  data () {
    return {
      loading: false,
      sent: false,
      form: {
        department: 'Recall Information'
      }
    }
  },
  methods: {
    async save () {
      this.loading = true
      try {
        const data = { ...this.form }
        data.id = uuidv4()
        data.createdAt = new Date()
        await this.$appsyncClient
          .mutate({
            mutation: gpl(mutations.createContactUs),
            variables: {
              input: data
            }
          })
        this.sent = true
        this.$bvToast.toast('Your information has been sent to us', {
          title: 'Sent',
          autoHideDelay: 5000,
          variant: 'success',
          solid: true
        })
      } catch (err) {
        this.$bvToast.toast('Can not send your information', {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
          solid: true
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.contact-us-form {
  .form-submit {
    height: 50px;
    width: 120px;
    margin-right: 0.5rem;
  }
}
</style>
