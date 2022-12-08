<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle">
        <div class="main-body">
          <client-only>
            <amplify-authenticator
              v-if="authState !== state.SignedIn"
              username-alias="email"
              :initial-auth-state="initState"
            >
              <div slot="sign-up">
                <h3 class="header">
                  Create a new account
                </h3>
                <SignUpForm />
              </div>
              <div slot="sign-in">
                <h3 class="header">
                  Sign In
                </h3>
                <SignInForm />
              </div>
            </amplify-authenticator>
            <div v-if="authState === state.SignedIn && user">
              <div class="sign-out-ctn">
                <amplify-sign-out></amplify-sign-out>
              </div>
              <div>Hello, {{ user.attributes.email }}</div>
            </div>
          </client-only>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import { Auth } from 'aws-amplify'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import InnerHeader from '@/components/Header/InnerHeader.vue'
import SignUpForm from '@/components/Auth/SignUpForm'
import SignInForm from '@/components/Auth/SignInForm'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Login',
  components: {
    InnerHeader,
    Footer,
    SignUpForm,
    SignInForm
  },
  data () {
    return {
      user: undefined,
      authState: undefined,
      state: AuthState,
      initState: AuthState.SignIn
    }
  },
  beforeCreate () {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState
      this.user = authData
    })

    // Hub.listen('auth', (data) => {
    //   const { payload } = data
    //   if (payload.event === 'signIn') {
    //     this.$store.dispatch('setUser', payload.data)
    //     this.$router.push('/my-garage')
    //   }
    // })
  },
  async created () {
    if (process.client) {
      if (this.$route) {
        const { signup = '' } = this.$route.query
        if (signup) {
          if (this.$store.state.user) {
            await Auth
              .signOut()
            await this.$store.dispatch('setUser', null)
          }
          this.initState = AuthState.SignUp
        }
      }
    }
  },
  beforeDestroy () {
    return onAuthUIStateChange
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.main-body {
  margin-top: 144px;
  margin-bottom: 144px;
  text-align: center;
}

amplify-authenticator {
  --container-height: auto;
}

.sign-out-ctn {
  width: 180px;
  margin: auto;
}

</style>
