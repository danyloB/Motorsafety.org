<template>
  <header id="header" class="header" :class="headerClass">
    <b-navbar toggleable="xl" fixed="top" :class="navBarClass">
      <div class="container">
        <b-navbar-brand to="/">
          <Logo />
        </b-navbar-brand>
        <div v-if="!visible" :class="showInput" class="search-cnt d-none vin-zip-search-input">
          <vin-zip-search-input :show-input="showInput" />
        </div>
        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" v-model="visible" is-nav>
          <div v-show="showInput" class="search-cnt d-block d-md-none mt-2">
            <vin-zip-search-input :show-input="showInput" />
          </div>
          <!-- Right aligned nav items -->
          <b-navbar-nav>
            <li
              class="nav-item"
              :class="{ active: currentRoute === 'RecallNews' }"
            >
              <nuxt-link
                class="nav-link"
                :to="{ path: '/recall-news/' }"
              >
                Recall News
              </nuxt-link>
            </li>
            <li
              class="nav-item"
              :class="{ active: currentRoute === 'LocateDealerListing' }"
            >
              <nuxt-link class="nav-link" :to="{ path: '/dealers/' }">
                Locate Dealer
              </nuxt-link>
            </li>
            <!--            <li-->
            <!--              class="nav-item"-->
            <!--              :class="{ active: currentRoute === 'AboutUs' }"-->
            <!--            >-->
            <!--              <nuxt-link-->
            <!--                class="nav-link"-->
            <!--                :to="{ path: '/about-us' }"-->
            <!--              >-->
            <!--                About us-->
            <!--              </nuxt-link>-->
            <!--            </li>-->
            <!--            <li-->
            <!--              class="nav-item"-->
            <!--              :class="{ active: currentRoute === 'ContactUs' }"-->
            <!--            >-->
            <!--              <nuxt-link-->
            <!--                class="nav-link"-->
            <!--                :to="{ path: '/contact-us/' }"-->
            <!--              >-->
            <!--                Contact-->
            <!--              </nuxt-link>-->
            <!--            </li>-->
            <client-only>
              <li v-if="!user" class="nav-item" :class="{ active: currentRoute === 'Login' }">
                <nuxt-link
                  class="nav-link"
                  :to="{ path: '/login/' }"
                >
                  Login
                </nuxt-link>
              </li>
              <b-nav-item-dropdown v-else :text="user.attributes.email" class="user-dropdown nav-link">
                <!-- Using 'button-content' slot -->
                <template #button-content class="test-class">
                  <span>{{ user.attributes.email }} <font-awesome-icon :icon="['fas', 'angle-down']" class="ml-auto" /></span>
                </template>
                <b-dropdown-item to="/my-garage/">
                  My Garage
                </b-dropdown-item>
                <b-dropdown-item to="/profile/">
                  Profile
                </b-dropdown-item>
                <b-dropdown-item @click="signOut">
                  Sign Out
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </client-only>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </header>
</template>

<script>
import { Auth } from 'aws-amplify'
import Logo from '../Logo.vue'
import VinZipSearchInput from './VinZipSearchInput.vue'
const noSearchRoutes = ['index', 'my-garage']

export default {
  name: 'InnerHeader',
  components: {
    VinZipSearchInput,
    Logo
  },
  props: {
    navBarClass: {
      type: String,
      default: 'border-bottom bg-white'
    },
    headerClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      vin: '',
      visible: false
    }
  },
  computed: {
    currentRoute () {
      return this.$route.name
    },
    showInput () {
      return noSearchRoutes.includes(this.currentRoute)
        ? ''
        : 'd-mY ' + 'd-inline-block'
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    signOut () {
      Auth
        .signOut()
        .then(() => {
          this.$store.dispatch('setUser', null)
          this.$router.push('/login/')
        })
    }
  }
}
</script>
<style scoped lang="scss">
  .v2-bg-transparent {
    background: rgba(0,0,0, 0.3);
  }
</style>
