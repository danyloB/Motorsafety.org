<template>
  <div id="main-container" class="main-container">
    <client-only>
      <div v-show="loading" class="loading-ctn">
        <b-spinner type="grow" label="Loading..." class="garage-spinner" />
      </div>
      <div v-if="!loading" id="inner-container" class="inner-container">
        <InnerHeader />
        <div class="profile-container">
          <div class="row">
            <div class="col-12 col-sm-6 col-lg-4">
              <about-me />
            </div>
            <div class="col-12 col-sm-6 col-lg-8">
              <div class="p-card account">
                <b-tabs content-class="mt-3">
                  <b-tab title="Account" active>
                    <AccountForm />
                  </b-tab>
                  <b-tab title="Password">
                    <PasswordForm />
                  </b-tab>
                </b-tabs>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </client-only>
  </div>
</template>

<script>
import InnerHeader from '@/components/Header/InnerHeader.vue'
import Footer from '@/components/Footer.vue'
import AccountForm from '@/components/Profile/AccountForm'
import PasswordForm from '@/components/Profile/PasswordForm'
import AboutMe from '@/components/Profile/AboutMe'
export default {
  name: 'Profile',
  components: { PasswordForm, AccountForm, InnerHeader, Footer, AboutMe },
  data () {
    return {
      form: {
        subscribe: true
      }
    }
  },
  computed: {
    loading () {
      return !this.user
    },
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    user (val, old) {
      if (!old) {
        this.form.subscribe = true
        this.form.email = this.user.attributes.email || ''
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .loading-ctn {
    position: relative;
    width: 100%;
    height: 100vh;

    .garage-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .profile-container {
    max-width: 1140px;
    margin:0 auto;
    padding: 90px 20px 20px 20px;
    .p-card {
      padding: 20px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      border-radius: 4px;
      border: 1px solid #e6ebf5;
      background-color: #fff;

      .p-card-header {
        color: #495057;
        font-weight: 500;
        border-bottom: 1px solid #e6ebf5;
        padding-bottom: 20px;
      }

      .p-card-body {
        padding: 20px 0;
      }

      .p-card-footer {
        border-top: 1px solid #e6ebf5;
        padding-top: 20px;
      }
    }

    .about {
      .p-card-body {
        text-align: center;
      }
    }
  }

  @media screen and (max-width: 576px) {
    .profile-container {
      .about {
        margin-bottom: 20px;
      }
    }
  }
</style>
