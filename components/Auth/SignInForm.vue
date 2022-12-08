<template>
  <b-form class="sign-in-form" @submit.stop.prevent="signIn">
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
      <span class="reset-password">Forgot your password?
        <a href="javascript: void(0)" @click="resetPassword">Reset password</a>
      </span>
    </div>
    <div class="signup-footer">
      <div class="switch-text">
        <span>No account? <a href="javascript: void(0)" @click="gotoSignUp">Create account</a></span>
      </div>
      <div class="submit-btn-ctn">
        <b-button variant="primary" type="submit">
          <b-spinner v-if="loading.submit" label="Loading..." small></b-spinner>
          <span v-else>Sign In</span>
        </b-button>
      </div>
    </div>
  </b-form>
</template>
<script>
import { AuthState } from '@aws-amplify/ui-components'
import { Hub } from '@aws-amplify/core'
import { Auth } from 'aws-amplify'

export default {
  name: 'SignUpForm',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      state: AuthState,
      loading: {
        submit: false
      }
    }
  },
  methods: {
    gotoSignUp () {
      Hub.dispatch('UI Auth', {
        event: 'AuthStateChange',
        message: AuthState.SignUp
      })
    },
    resetPassword () {
      Hub.dispatch('UI Auth', {
        event: 'AuthStateChange',
        message: AuthState.ForgotPassword
      })
    },

    signIn () {
      this.loading.submit = true
      Auth
        .signIn({
          username: this.form.email,
          password: this.form.password
        })
        .then(async (res) => {
          const user = await Auth.currentAuthenticatedUser()
          this.$store.dispatch('setUser', user)
          this.$router.push('/my-garage/')
        })
        .catch((err) => {
          console.log(err)
          const message = err.message ? err.message : err.toString()
          this.$bvToast.toast(message, {
            title: 'Error',
            autoHideDelay: 10000,
            variant: 'danger'
          })
        })
        .finally(() => {
          this.loading.submit = false
        })
    }
  }
}
</script>
<style scoped lang="scss">
.sign-in-form {
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

  .reset-password {
    font-size: var(--amplify-text-xs);
  }

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

  .switch-text {
    font-size: var(--footer-size);
  }
}

@media (min-width: 672px) {
  .sign-in-form {
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

</style>
