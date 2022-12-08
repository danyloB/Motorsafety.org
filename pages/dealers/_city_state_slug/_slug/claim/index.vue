<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle">
        <div id="locate-dealer-page">
          <section class="locate-content">
            <div class="container">
              <div class="row">
                <div class="col-lg-8">
                  <div class="section-title">
                    <h3 v-if="isEdit">
                      Edit Your Listing
                    </h3>
                    <h3 v-else>
                      Claim your dealership
                    </h3>
                  </div>

                  <b-form class="claim-form">
                    <b-form-group
                      label="Dealership Manager Email"
                      label-for="email"
                    >
                      <b-form-input
                        id="email"
                        v-model="dealer.email"
                        required
                        type="email"
                        placeholder="Enter your email"
                      />
                    </b-form-group>

                    <b-form-group
                      label="Dealership name"
                      label-for="dealership"
                    >
                      <b-form-input
                        id="dealership"
                        v-model="dealer.name"
                        required
                        placeholder="Enter name of dealership"
                      />
                    </b-form-group>

                    <b-form-group
                      label="About"
                      label-for="about"
                    >
                      <b-form-textarea
                        id="about"
                        v-model="dealer.about"
                        placeholder=""
                      />
                    </b-form-group>

                    <client-only>
                      <b-form-group
                        label="Dealership Type"
                        label-for="brand"
                      >
                        <b-form-tags v-model="dealer.brandsList" size="lg" add-on-change no-outer-focus class="mb-2">
                          <template #default="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                            <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                              <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                <b-form-tag
                                  :title="tag"
                                  :disabled="disabled"
                                  variant="info"
                                  @remove="removeTag(tag)"
                                >
                                  {{ tag }}
                                </b-form-tag>
                              </li>
                            </ul>
                            <b-form-select
                              v-bind="inputAttrs"
                              :disabled="disabled || availableOptions.length === 0"
                              :options="availableOptions"
                              v-on="inputHandlers"
                            >
                              <template #first>
                                <!-- This is required to prevent bugs with Safari -->
                                <option disabled value="">
                                  Choose a brand...
                                </option>
                              </template>
                            </b-form-select>
                          </template>
                        </b-form-tags>
                      </b-form-group>

                      <b-form-group
                        label="Phone"
                        label-for="phone"
                      >
                        <vue-tel-input
                          v-model="dealer.phone"
                          class="tel-form-input"
                          input-classes="form-control"
                          required
                          @input="onPhoneInput"
                        />
                      </b-form-group>
                    </client-only>
                    <b-form-group
                      label="Street address"
                      label-for="address"
                    >
                      <b-form-input
                        id="address"
                        v-model="dealer.address"
                        placeholder=""
                      />
                    </b-form-group>
                    <b-form-group
                      label="City"
                      label-for="city"
                    >
                      <input
                        id="cities-autocomplete"
                        v-model="dealer.city"
                        type="text"
                        class="form-control"
                        placeholder="Enter location"
                      >
                    </b-form-group>
                    <b-form-group
                      label="ZIP code"
                      label-for="zip"
                    >
                      <b-form-input
                        id="zip"
                        v-model="dealer.zip"
                        placeholder=""
                      />
                    </b-form-group>
                    <b-form-group
                      label="Website"
                      label-for="website"
                    >
                      <b-form-input
                        id="website"
                        v-model="dealer.website"
                        placeholder=""
                      />
                    </b-form-group>
                    <b-form-group
                      label="Service hours"
                      label-for="service_hours"
                    >
                      <b-form-input
                        id="service_hours"
                        v-model="dealer.service_hours"
                        placeholder=""
                      />
                    </b-form-group>
                    <div>
                      <b-button
                        :disabled="loading"
                        type="button"
                        variant="primary"
                        @click="submit"
                      >
                        Submit
                      </b-button>
                    </div>
                  </b-form>
                  <recall-map width="100%" height="500px" :dealers="[dealer]" :fit-markers="false" show-detail />
                </div>
                <div class="col-lg-4 right-sidebar">
                </div>
              </div>
            </div>
          </section>
        </div>
        <RecallForm />
      </div>
    </div>
    <GmapMap
      ref="gmap"
      :center="{lat:37, lng:-95}"
      :zoom="7"
      style="height: 0"
    />
    <Footer />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { createDealerClaimRequest } from '@/graphql/mutations'
import InnerHeader from '@/components/Header/InnerHeader.vue'
import RecallForm from '@/components/RecallForm.vue'
import Footer from '@/components/Footer.vue'
import { getState, uuidv4, capitalizeFirstLetter } from '@/utils'
import makes from '@/utils/makes'
import RecallMap from '@/components/Recall/RecallMap'
import { getDealer } from '@/utils/dealers'

const options = makes.map(m => m.text)

export default {
  name: 'ClaimDealership',
  components: {
    InnerHeader,
    RecallForm,
    Footer,
    RecallMap
  },
  async asyncData ({ route, error, $content }) {
    const { city_state_slug, slug } = route.params
    const isEdit = !!route.query.edit
    const dealer = await getDealer($content, city_state_slug, slug)

    if (dealer) {
      dealer.brandsList = dealer.brand ? dealer.brand.trim().split(',').map(i => capitalizeFirstLetter(i.trim())) : []
      return {
        dealer,
        isEdit
      }
    } else {
      error({ statusCode: 404, message: 'This page could not be found' })
    }
  },
  data () {
    return {
      loading: false,
      cities: [],
      city: '',
      phoneInput: {
        number: {}
      },
      place: null,
      options,
      hasRequest: false,
      weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  computed: {
    availableOptions () {
      return this.options.filter(opt => !this.dealer.brandsList.includes(opt))
    }
  },
  mounted () {
    this.$refs.gmap && this.$refs.gmap.$mapPromise.then((map) => {
      if (window.google) {
        const input = document.getElementById('cities-autocomplete')
        const options = {
          types: ['(cities)'],
          componentRestrictions: { country: 'us' }
        }
        const autocomplete = new window.google.maps.places.Autocomplete(input, options)
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          this.place = place
          this.dealer.city = place.formatted_address
        })
      }
    })
  },
  methods: {

    submit () {
      this.claimDealer()
    },
    onPhoneInput (phone, input) {
      this.phoneInput = input
    },
    claimDealer () {
      const fields = [
        'dealer_id',
        'email',
        'id',
        'address',
        'brand',
        'city',
        'city_slug',
        'city_state_slug',
        'crm_id',
        'latitude',
        'longitude',
        'name',
        'phone_number_main',
        'phone_number_service',
        'service_hours',
        'state',
        'state_slug',
        'website',
        'zip'
      ]
      const data = {}
      Object.keys(this.dealer).forEach((key) => {
        if (fields.includes(key) && this.dealer[key]) {
          data[key] = this.dealer[key]
        }
      })
      data.brand = this.dealer.brandsList.join(', ')
      data.dealer_id = data.id
      data.id = uuidv4()
      data.created_at = new Date().getTime()
      if (this.place) {
        data.city = this.place.name
        data.city_key = data.city.toLowerCase()
        data.state = getState(this.place)
      }
      data.phone = this.phoneInput.number.e164
      this.loading = true
      this.$appsyncClient
        .mutate({
          mutation: gql(createDealerClaimRequest),
          variables: {
            input: data
          }
        })
        .then(() => {
          this.$bvToast.toast('An agent will be in touch shortly.', {
            title: 'Claimed Dealership!',
            autoHideDelay: 5000,
            variant: 'success',
            solid: true
          })
        })
        .catch(console.error)
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">

#middle {
  padding-top: 80px;
}

.section-title {
  padding-top: 30px;
}

.claim-form {
  padding: 20px 0;
}

.opening-hours-ctn {
  padding-left: 30px;
  display: flex;
  width: 100%;
  margin-bottom: 10px;

  .weekday {
    width: 100px;
    font-size: 0.95rem;
    text-transform: capitalize;
  }

  .timepicker-ctn {
    flex: 1;
    display: flex;
    justify-content: space-between;
    &>div {
      width: 48%;
    }
  }
}

.dealer-time-picker {
  width: 100%;
}

@media screen and (max-width: 767px) {
  .opening-hours-ctn {
    padding-left: 0;
  }
}
</style>
