<template>
  <div>
    <b-form class="account-form" @submit="onSubmit">
      <b-form-group
        label="Email address"
        label-for="input-email"
      >
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        />
      </b-form-group>

      <b-form-group label="First Name" label-for="input-given-name">
        <b-form-input
          id="input-given-name"
          v-model="form.given_name"
          placeholder="Enter first name"
        />
      </b-form-group>
      <b-form-group label="Last Name" label-for="input-family-name">
        <b-form-input
          id="input-family-name"
          v-model="form.family_name"
          placeholder="Enter last name"
        />
      </b-form-group>

      <b-form-group label="Phone Number" label-for="phone_number">
        <vue-tel-input
          v-model="form.phone_number"
          class="tel-form-input"
          input-classes="form-control"
          @input="onPhoneInput"
        ></vue-tel-input>
      </b-form-group>

      <b-form-group label="Your ZIP Code" label-for="input-zip">
        <b-form-input
          id="input-zip"
          v-model="form.zip"
          required
          placeholder="Enter ZIP"
        />
      </b-form-group>

      <b-form-group label="Street address" label-for="address">
        <b-form-input
          id="address"
          v-model="form.address"
          placeholder="Enter street address"
        />
      </b-form-group>

      <b-form-group
        label="City"
        label-for="city-input"
      >
        <input
          id="city-input"
          v-model="form.city"
          type="text"
          class="form-control"
          placeholder="Enter location"
        >
      </b-form-group>

      <b-form-group label="State" label-for="state">
        <b-form-input
          id="state"
          v-model="form.state"
          placeholder="Enter city"
        />
      </b-form-group>

      <div class="button-row">
        <b-button :disabled="loading" type="submit" variant="primary">
          <span v-if="loading"><b-spinner small /></span>
          <span v-else>Submit</span>
        </b-button>

        <b-button :disabled="deleting" type="button" variant="danger" class="delete-button" @click="onDelete">
          <span v-if="deleting"><b-spinner small /></span>
          <span v-else>Delete Account</span>
        </b-button>
      </div>

      <GmapMap
        ref="gmap"
        :center="{lat:37, lng:-95}"
        :zoom="7"
        style="height: 0"
      />
    </b-form>
  </div>
</template>
<script>
import { Auth } from 'aws-amplify'
import gql from 'graphql-tag'
import { getState, getZip } from '@/utils'
import * as mutations from '@/graphql/mutations'

export default {
  name: 'AccountForm',
  data () {
    const user = this.$store.state.user
    const form = {}
    if (user) {
      form.given_name = user.attributes.given_name || ''
      form.family_name = user.attributes.family_name || ''
      form.zip = `${user.attributes['custom:zip']}` || ''
      form.state = user.attributes['custom:state'] || ''
      form.city = user.attributes['custom:city'] || ''
      form.email = user.attributes.email || ''
      form.address = user.attributes.address || ''
      form.phone_number = user.attributes.phone_number || ''
    }
    return {
      form,
      place: {},
      loading: false,
      deleting: false,
      phoneInput: {
        number: {}
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    user: {
      handler (val) {
        if (val) {
          this.form.about = val.attributes['custom:about'] || ''
          this.form.zip = `${val.attributes['custom:zip']}` || ''
          this.form.email = val.attributes.email || ''
          this.form.given_name = val.attributes.given_name || ''
          this.form.family_name = val.attributes.family_name || ''
          this.form.address = val.attributes.address || ''
        }
      },
      deep: true
    }
  },

  mounted () {
    this.$refs.gmap && this.$refs.gmap.$mapPromise.then((map) => {
      if (window.google) {
        const input = document.getElementById('city-input')
        const options = {
          types: ['(cities)'],
          componentRestrictions: { country: 'us' }
        }
        const autocomplete = new window.google.maps.places.Autocomplete(input, options)
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          this.form.city = place.formatted_address
          const state = getState(place)
          if (state) {
            this.form.state = state + ''
          }
          const zip = getZip(place)
          if (zip) {
            this.form.zip = zip + ''
          }
          this.place = place
        })
      }
    })
  },

  methods: {
    onPhoneInput (phone, input) {
      this.phoneInput = input
    },

    async onSubmit (event) {
      event.preventDefault()
      try {
        this.loading = true
        let user = await Auth.currentAuthenticatedUser()
        this.form.city = this.place.name
        const phoneNumber = this.phoneInput.number.e164 || ''
        await Auth.updateUserAttributes(user, {
          given_name: this.form.given_name || '',
          family_name: this.form.family_name || '',
          address: this.form.address || '',
          phone_number: phoneNumber,
          'custom:zip': this.form.zip || '',
          'custom:state': this.form.state || '',
          'custom:city': this.form.city || ''
        })
        this.$bvToast.toast('Update user information successfully', {
          title: 'Updated',
          autoHideDelay: 5000,
          variant: 'success',
          solid: true
        })
        user = await Auth.currentAuthenticatedUser()
        await this.$store.dispatch('setUser', user)
      } catch (err) {
        this.$bvToast.toast('Failed to update user information', {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
          solid: true
        })
      } finally {
        this.loading = false
      }
    },

    async onDelete (event) {
      event.preventDefault()

      try {
        this.deleting = true

        await this.deleteSubscription()
        const user = await Auth.currentAuthenticatedUser()

        user.deleteUser((error) => {
          if (error) {
            throw error
          }

          this.$store.dispatch('setUser', null)
          this.$router.push('/login/')
        })
      } catch (e) {
        this.$bvToast.toast('Failed to delete account', {
          title: 'Error',
          autoHideDelay: 5000,
          variant: 'danger',
          solid: true
        })
      } finally {
        this.deleting = false
      }
    },

    async deleteSubscription () {
      await this.$appsyncClient.mutate({
        mutation: gql(mutations.deleteSubscribe),
        variables: {
          input: {
            email: this.form.email
          }
        }
      })

      // delete RMBOUser
    }
  }
}
</script>
<style lang="scss" scoped>
  .button-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .delete-button {
      height: 56px;
    }
  }
</style>
