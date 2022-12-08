<template>
  <section class="recall-service-cnt">
    <client-only>
      <b-form class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text">
              <h2 class="section-heading text-white">
                Check your recall service today
              </h2>
              <p class="text-white">
                Subscribe for push notification to get up to date email
                information on your vehicle
              </p>
            </div>
            <div class="form-image">
              <cld-image loading="lazy" class="cld-form-image" cloud-name="motorsafety" public-id="v2-motorsafety/assets/images/car2">
                <cld-transformation width="768" fetchFormat="webp" crop="scale" />
              </cld-image>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="service-form">
              <div class="switch-search">
                <span>
                  Can't find your {{ searchByVin ? 'VIN' : 'Make' }}? Search By
                  <span class="v-make link-btn" @click="switchSearch">{{ searchByVin ? 'Make': 'VIN' }}</span>
                </span>
              </div>
              <div class="form-inline">
                <div class="equal-cnt">
                  <label class="justify-content-start text-white">{{ searchByVin ? 'VIN': 'Year' }}</label>
                  <b-form-input
                    v-if="searchByVin"
                    v-model="form.vin"
                    required
                    placeholder="Enter VIN"
                    class="year-input"
                  />
                  <b-form-input
                    v-else
                    v-model="form.year"
                    required
                    class="year-input"
                    @input="onYearChange"
                  />
                </div>
                <div class="equal-cnt">
                  <label class="justify-content-start text-white">Zip Code</label>
                  <b-form-input
                    v-model="form.zipcode"
                    required
                    class="form-control w-100"
                    name="zipcode"
                    placeholder=""
                  />
                </div>
              </div>
              <template v-if="!searchByVin">
                <div class="form-group">
                  <label class="text-white">Make</label>

                  <v-select
                    v-model="form.make"
                    :options="makeOptions"
                    label="text"
                    class="recall-form-filter"
                    :clearable="false"
                    @input="onMakeSelected"
                  >
                    <template #search="{attributes, events}">
                      <input
                        class="recall-form-input"
                        :required="!form.make"
                        v-bind="attributes"
                        v-on="events"
                      >
                    </template>

                    <template #no-options>
                      Please enter year
                    </template>
                  </v-select>
                </div>
                <div class="form-group">
                  <label class="text-white">Model</label>
                  <v-select
                    v-model="form.model"
                    :options="models"
                    class="recall-form-filter"
                    :clearable="false"
                  >
                    <template #search="{attributes, events}">
                      <input
                        class="recall-form-input"
                        :required="!form.model"
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
              </template>

              <div class="form-group form-submit">
                <button
                  class="btn btn-primary btn-block btn-lg text-center text-md-left"
                  type="button"
                  @click="gotoSearchResult"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </b-form>
    </client-only>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import gpl from 'graphql-tag'
import * as queries from '@/graphql/queries'
import makes from '@/utils/makes'
export default {
  name: 'RecallForm',
  data () {
    return {
      searchByVin: false,
      form: {
        make: null,
        model: null,
        year: '',
        zipcode: '',
        vin: ''
      },
      makes,
      makeOptions: [],
      models: [],
      years: [],
      loading: {
        makes: false,
        models: false,
        years: false
      }
    }
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  created () {
  },

  methods: {
    gotoSearchResult () {
      if (this.searchByVin) {
        if (!this.form.vin || !this.form.zipcode) {
          return
        }
        const query = {
          vin: this.form.vin,
          zipcode: this.form.zipcode
        }
        this.$router.push({
          path: '/recall-search-detailed/',
          query
        })
      } else {
        if (!this.form.make || !this.form.model || !this.form.year) {
          return
        }
        const query = {
          make: this.form.make.text,
          model: this.form.model,
          year: this.form.year,
          zipcode: this.form.zipcode
        }
        this.$router.push({
          path: '/recall-search-detailed/',
          query
        })
      }
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

    switchSearch () {
      this.searchByVin = !this.searchByVin
    },
    onMakeSelected () {
      this.form.model = null
      this.fetchModels()
    },
    fetchModels () {
      if (!this.form.make || !this.form.year) { return }
      this.loading.models = true
      this.$appsyncClient
        .query({
          query: gpl(queries.getModel),
          variables: {
            make: this.form.make.text.toLocaleLowerCase(),
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
    }
  }
}
</script>
<style lang="scss" scoped>

  .recall-service-cnt .btn-primary {
    background: #00B6F2;
    color: #000;
    border: 0;
    font-weight: 500;
    font-size: 18px;
  }

  .recall-service-cnt .btn-lg {
    height: 60px;
    padding-left: 25px;
    padding-right: 20px;
  }

  .recall-service-cnt {
    background: #292929;
    margin-top: 20px;
    padding: 50px 0 30px;

    .container {
      background: url(https://res.cloudinary.com/motorsafety/image/upload/v2-motorsafety/assets/images/dot-pattern) no-repeat 200px top;
    }
  }

  .service-form .form-inline {
    justify-content: space-between;
  }

  .service-form .form-inline .form-control {
    border: 0;
  }

  .service-form .form-group {
    margin-bottom: 30px;
  }

  .recall-service-cnt .text {
    max-width: 550px;
    padding-top: 30px;
  }

  .recall-service-cnt h2.section-heading {
    margin-bottom: 10px;
  }

  .recall-service-cnt .text p {
    font-size: 20px;
    line-height: 28px;
    font-weight: 300;
  }

  .recall-service-cnt .btn-lg:hover {
    background: #03a2d6;
  }

  .recall-service-cnt label {
    font-size: 14px;
    margin-bottom: 7px;
  }

  .find-by-make {
    float: right;
    color: #fff;
    font-weight: 600;
  }

  .form-image img {
    width: 500px;
    height: 276px;
  }
  .cld-form-image>img{
    max-width: 100%;
  }

  .v-make {
    color: #92fae1;
  }

  .recall-service-cnt .text {
    padding: 0;
  }

  .recall-service-cnt .form-image img {
    max-height: 300px;
  }

  @media screen and (max-width: 767px) {
    .service-form {
      margin-top: 25px;
    }

    .recall-service-cnt .text {
      margin: 0 0 15px;
      padding-top: 0;
    }

    .recall-service-cnt {
      padding-top: 30px;
    }

    //.service-form .form-inline {
    //  flex-flow: column;
    //}

    //.service-form .form-inline .equal-cnt {
    //  width: 100% !important;
    //  margin-bottom: 30px;
    //}

    .service-form .btn {
      text-align: center;
    }
  }

  .switch-search {
    color: #fff;
    font-weight: 600;
    text-align: right;
    padding-bottom: 10px;
  }

  .year-input {
    width: 100% !important;
  }

  .form-submit {
    padding-top: 20px;
  }
</style>
