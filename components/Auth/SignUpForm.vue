<template>
  <b-form class="sign-up-section" @submit.stop.prevent="signup">
    <div class="form-group">
      <label class="label-text">Email Address *</label>
      <b-form-input
        v-model="form.email"
        type="email"
        required
        placeholder="Email"
        class="email-input"
        name="email"
      />
    </div>

    <div class="form-group">
      <label class="label-text">Password *</label>
      <b-form-input
        v-model="form.password"
        type="password"
        name="password"
        required
        placeholder="Password"
        class="email-input"
      />
    </div>
    <div class="form-group">
      <label class="label-text">First name</label>
      <b-form-input
        v-model="form.given_name"
        type="text"
        name="given_name"
        placeholder="First name"
        class="email-input"
      />
    </div>
    <div class="form-group">
      <label class="label-text">Last name</label>
      <b-form-input
        v-model="form.family_name"
        type="text"
        name="family_name"
        placeholder="Last name"
        class="email-input"
      />
    </div>
    <div class="form-group">
      <label class="label-text">Phone (Required for Recall Notifications)</label>
      <vue-tel-input
        v-model="form.phone_number"
        class="tel-form-input"
        input-classes="form-control"
        @input="onPhoneInput"
      ></vue-tel-input>
    </div>
    <div class="form-group">
      <label class="label-text">VIN (Required for Recall Notifications)</label>
      <b-form-input
        v-model="form.vin"
        name="vin"
        type="text"
        placeholder="VIN"
        class="email-input"
      />
    </div>

    <div class="form-group">
      <label class="label-text">Zip code</label>
      <b-form-input
        v-model="form.zip"
        name="zip"
        type="text"
        placeholder="ZIP"
        class="email-input"
      />
    </div>

    <div>Vehicle Information</div>
    <div class="form-group">
      <label class="label-text">Year</label>
      <b-form-input
        v-model="form.year"
        class="email-input"
        @input="onYearChange"
      />
    </div>
    <div class="form-group">
      <label>Make</label>

      <v-select
        v-model="form.make"
        :options="makeOptions"
        label="text"
        class="form-select-filter"
        :clearable="false"
        :reduce="item => item.text"
        @input="onMakeSelected"
      >
        <template #search="{attributes, events}">
          <input
            class="vs__search"
            v-bind="attributes"
            v-on="events"
          >
        </template>

        <template #no-options>
          Please enter year first
        </template>
      </v-select>
    </div>
    <div class="form-group">
      <label>Model</label>
      <v-select
        v-model="form.model"
        :options="models"
        class="form-select-filter"
        :clearable="false"
      >
        <template #search="{attributes, events}">
          <input
            class="vs__search"
            v-bind="attributes"
            v-on="events"
          >
        </template>

        <template #no-options>
          <template v-if="loading.models">
            <b-spinner small label="Spinning" />
            Loading
          </template>
          <template v-else>
            {{
              !form.year || !form.make
                ? 'Please input year and make first'
                : 'Sorry, no matching options.'
            }}
          </template>
        </template>
      </v-select>
    </div>
    <div class="signup-footer">
      <div class="switch-text">
        <span>Have an account? <a href="javascript: void(0)" @click="gotoSignIn">Sign in</a></span>
      </div>
      <div class="submit-btn-ctn">
        <b-button variant="primary" type="submit" :disabled="loading.submit">
          <b-spinner v-if="loading.submit" label="Loading..." small></b-spinner>
          <span v-else>Create account</span>
        </b-button>
      </div>
    </div>
  </b-form>
</template>
<script>
import { AuthState } from '@aws-amplify/ui-components'
import { Hub } from '@aws-amplify/core'
import gpl from 'graphql-tag'
import { Auth } from 'aws-amplify'
import api from '@/utils/requests'
import * as queries from '@/graphql/queries'
import makes from '@/utils/makes'
import * as mutations from '@/graphql/mutations'
const axios = require('axios')

export default {
  name: 'SignUpForm',
  data () {
    return {
      form: {
        make: null,
        model: null,
        given_name: '',
        family_name: '',
        year: '',
        phone_number: '',
        password: '',
        zip: ''
      },
      phoneInput: {
        number: {}
      },
      state: AuthState,
      loading: {
        makes: false,
        models: false,
        submit: false
      },
      makes,
      models: [],
      makeOptions: []
    }
  },
  mounted () {
    if (this.$route) {
      const { email = '', zip = '', vin, make, model, year } = this.$route.query
      this.form.email = email
      this.form.zip = zip
      if (vin) {
        this.form.vin = vin
      } else if (make && model && year) {
        this.form.year = year
        this.form.make = make
        this.form.model = model
        this.makeOptions = makes
        this.fetchModels()
      }
    }
  },
  methods: {
    onPhoneInput (phone, input) {
      this.phoneInput = input
    },
    gotoSignIn () {
      Hub.dispatch('UI Auth', {
        event: 'AuthStateChange',
        message: AuthState.SignIn
      })
    },
    onMakeSelected () {
      this.form.model = null
      this.fetchModels()
    },
    onYearChange () {
      this.models = []
      if (this.form.year.length === 4) {
        this.makeOptions = makes
        this.fetchModels()
      } else {
        this.makeOptions = []
      }
    },
    fetchModels () {
      if (!this.form.make || !this.form.year) {
        return
      }
      this.loading.models = true
      this.$appsyncClient
        .query({
          query: gpl(queries.getModel),
          variables: {
            make: this.form.make.toLocaleLowerCase(),
            year: this.form.year
          }
        })
        .then(({ data }) => {
          this.models = data.getModel && data.getModel.models
            ? data.getModel.models
            : []
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          this.loading.models = false
        })
    },
    async signup () {
      try {
        const data = this.form
        data.phone_number = this.phoneInput.number.e164 || ''
        this.loading.submit = true
        const createRMBOUserRes = await api
          .createRMBOUser(
            {
              username: this.form.email.substring(0, 30),
              password: this.form.password
            }, axios
          )
        console.log(createRMBOUserRes)

        const getRMBOAPIKeyRes = await api
          .getRMBOAPIKey(
            {
              username: this.form.email,
              password: this.form.password
            }, axios
          )
        console.log(getRMBOAPIKeyRes)
        const rmboAPIKey = getRMBOAPIKeyRes.data.auth_token
        const userData = await Auth.signUp({
          username: data.email,
          password: data.password,
          attributes: {
            phone_number: data.phone_number,
            'custom:zip': data.zip,
            'custom:subscribe': '1',
            'custom:rmbo_api_key': rmboAPIKey
          }
        })
        const { make, year, model, vin } = this.form
        const createdAt = new Date()
        const myGarageData = []
        if (vin && vin.length === 17) {
          myGarageData.push({
            vin,
            createdAt
          })
        }
        if (make && model && year) {
          myGarageData.push({
            make,
            model,
            year,
            createdAt
          })
        }

        if (myGarageData.length) {
          await this.$appsyncClient
            .mutate({
              mutation: gpl(mutations.createMyGarage),
              variables: {
                input: {
                  username: this.form.email,
                  data: myGarageData
                }
              }
            })
        }

        if (userData.userConfirmed) {
          // Hub.dispatch('UI Auth', {
          //   event: 'AuthStateChange',
          //   message: AuthState.SignIn
          // })
          await Auth
            .signIn({
              username: data.email,
              password: data.password
            })
          const user = await Auth.currentAuthenticatedUser()
          await this.$store.dispatch('setUser', user)
          await this.$router.push('/my-garage/')
          console.log(user)
        } else {
          Hub.dispatch('UI Auth', {
            event: 'AuthStateChange',
            message: AuthState.ConfirmSignUp
          })
        }
      } catch (err) {
        console.log(err)
        const message = err.message ? err.message : err.toString()
        this.$bvToast.toast(message, {
          title: 'Error',
          autoHideDelay: 10000,
          variant: 'danger'
        })
      } finally {
        this.loading.submit = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.sign-up-section {
  position: relative;
  margin-bottom: var(--margin-bottom);
  background-color: #ffffff;
  text-align: left;
  display: inline-block;
  box-shadow: var(--box-shadow);
  box-sizing: border-box;
  font-family: var(--font-family);
  width: 100%;
  min-width: var(--min-width);
  padding: 35px 40px;

  .header {
    color: #152939;
    font-size: var(--header-size);
    font-weight: 700;
    margin-bottom: 0.75rem;
  }
}

.signup-footer {
  font-family: var(--footer-font-family);
  font-size: var(--footer-font-size);
  color: #828282;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-around;

  .submit-btn-ctn {
    width: 100%;

    button {
      width: 100%;
    }
  }
}

@media (min-width: 672px) {
  .sign-up-section {
    width: var(--width);
  }

  .signup-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;

    .submit-btn-ctn {
      width: 180px;
    }
  }
}

.tel-form-input {
  border: 1px solid #E7E7E7;
}
</style>
