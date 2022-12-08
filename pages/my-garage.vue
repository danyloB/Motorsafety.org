<template>
  <div id="main-container" class="main-container">
    <client-only>
      <div v-if="!user" class="loading-ctn">
        <b-spinner type="grow" label="Loading..." class="garage-spinner" />
      </div>
      <template v-else>
        <div id="inner-container" class="inner-container">
          <InnerHeader />
          <div class="garage-content-cnt">
            <section class="garage-section">
              <div class="container">
                <h3>My Garage</h3>
                <div v-show="searchByVin" class="top-filter-row">
                  <div class="filter-cnt">
                    <div class="vin-input-cnt">
                      <b-input v-model="form.vin" placeholder="Enter VIN" />
                    </div>
                    <button
                      :disabled="!form.vin || form.vin.length !== 17"
                      type="button"
                      class="btn btn-primary"
                      @click="addVin"
                    >
                      Add Vehicle
                    </button>
                  </div>
                </div>
                <div v-show="!searchByVin" class="make-form-container">
                  <b-form class="row" @submit.prevent.stop="addMake">
                    <div class="col-12  col-lg-8">
                      <div class="row year-model-wrapper">
                        <div class="col-12 col-lg-6">
                          <b-input
                            v-model="form.year"
                            placeholder="Year"
                            required
                            class="year-input"
                            @input="onYearChange"
                          />
                        </div>
                        <div class="col-12 col-lg-6">
                          <v-select
                            v-model="form.make"
                            :options="makes"
                            label="text"
                            class="form-select-filter vehicle-select"
                            :clearable="false"
                            placeholder="Make"
                            @input="onMakeSelected"
                          >
                            <template #search="{attributes, events}">
                              <input
                                class="vs__search"
                                :required="!form.make"
                                v-bind="attributes"
                                v-on="events"
                              >
                            </template>
                          </v-select>
                        </div>
                      </div>
                      <div>
                        <v-select
                          v-model="form.model"
                          :options="models"
                          class="form-select-filter model-input vehicle-select"
                          placeholder="Model"
                          :clearable="false"
                        >
                          <template #search="{attributes, events}">
                            <input
                              class="vs__search"
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
                    </div>
                    <div class="col-12 col-lg-4" style="text-align: right">
                      <button
                        type="submit"
                        class="btn btn-primary btn-add"
                      >
                        Add Vehicle
                      </button>
                    </div>
                  </b-form>
                </div>

                <div class="switch-text">
                  Can't find your {{ searchByVin ? 'VIN' : 'Make' }}? Search By
                  <span
                    class="v-make link-btn"
                    @click="searchByVin = !searchByVin"
                  >{{ searchByVin ? 'Make': 'VIN' }}</span>
                </div>
                <div>
                  <MyVehicle
                    v-for="(vehicle, index) in vehicles"
                    :key="vehicle.key"
                    :vehicle="vehicle"
                    @on-remove="removeVehicle(index)"
                    @retry="retryReload(index)"
                  />
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </template>
    </client-only>
  </div>
</template>

<script>
import gpl from 'graphql-tag'
import InnerHeader from '@/components/Header/InnerHeader.vue'
// import Footer from '@/components/FooterOnlyIcon.vue'
import * as queries from '@/graphql/queries'
import * as mutations from '@/graphql/mutations'
import MyVehicle from '@/components/Garage/MyVehicle'
import makes from '@/utils/makes'

export default {
  name: 'MyGarage',
  components: {
    MyVehicle,
    InnerHeader,
    Footer: () => import('@/components/Footer.vue')
  },
  data () {
    return {
      searchByVin: true,
      makes,
      models: [],
      form: {
        vin: '',
        make: null,
        year: '',
        model: null
      },
      dealers: [],
      vehicles: [],
      zip: '',
      garages: null,
      loading: {
        models: false
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    user (user, oldValue) {
      if (user && !oldValue) {
        this.fetchUserGarage()
      }
    }
  },
  mounted () {
    this.fetchUserGarage()
  },
  methods: {
    onMakeSelected () {
      this.form.model = null
      this.fetchModel()
    },
    onYearChange () {
      this.form.model = null
      if (this.form.year.length === 4) {
        this.fetchModel()
      }
    },
    fetchModel () {
      if (!this.searchByVin && this.form.year && this.form.make) {
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
    },

    normalizeDataItems (data) {
      return data
        ? data.map((item) => {
          return {
            vin: item.vin,
            make: item.make,
            model: item.model,
            year: item.year,
            createdAt: item.createdAt
          }
        })
        : []
    },

    async addVin () {
      if (this.form.vin && this.form.vin.length === 17) {
        let data = []
        try {
          const createdAt = new Date()
          const myGarageItem = {
            createdAt,
            vin: this.form.vin
          }
          if (this.garages) {
            data = this.normalizeDataItems(this.garages.data)
            const index = data.findIndex(item => item.vin === this.form.vin)
            if (index > -1) {
              this.$bvToast.toast(`VIN ${this.form.vin} already existed in your garage`, {
                title: 'Failed to add VIN',
                autoHideDelay: 5000,
                variant: 'danger',
                solid: true
              })
              return
            }
            data.push(myGarageItem)
            await this.$appsyncClient
              .mutate({
                mutation: gpl(mutations.updateMyGarage),
                variables: {
                  input: {
                    username: this.user.attributes.email,
                    data
                  }
                }
              })
          } else {
            data = [myGarageItem]
            await this.$appsyncClient
              .mutate({
                mutation: gpl(mutations.createMyGarage),
                variables: {
                  input: {
                    username: this.user.attributes.email,
                    data
                  }
                }
              })
          }
          await this.fetchUserGarage()
        } catch (e) {
          console.log(e)
        }
      }
    },

    async addMake () {
      const { year, model } = this.form
      const make = this.form.make.text
      if (year && model && make) {
        const createdAt = new Date()
        const myGarageItem = {
          createdAt,
          year,
          model,
          make
        }
        let data = []
        try {
          if (this.garages) {
            data = this.normalizeDataItems(this.garages.data)

            const index = data.findIndex(item => item.make === make && item.year === year && item.model === model)
            if (index > -1) {
              this.$bvToast.toast(`Vehicle ${make} - ${model} - ${year} already existed in your garage`, {
                title: 'Failed to add vehicle',
                autoHideDelay: 5000,
                variant: 'danger',
                solid: true
              })
              return
            }

            data.push(myGarageItem)
            await this.$appsyncClient
              .mutate({
                mutation: gpl(mutations.updateMyGarage),
                variables: {
                  input: {
                    username: this.user.attributes.email,
                    data
                  }
                }
              })
          } else {
            data = [myGarageItem]
            await this.$appsyncClient
              .mutate({
                mutation: gpl(mutations.createMyGarage),
                variables: {
                  input: {
                    username: this.user.attributes.email,
                    data
                  }
                }
              })
          }
          await this.fetchUserGarage()
        } catch (e) {
          this.$bvToast.toast(e.toString(), {
            title: 'Failed to add vehicle to your garage',
            autoHideDelay: 5000,
            variant: 'danger',
            solid: true
          })
        }
      }
    },

    async fetchVinRecall (item) {
      try {
        const res = await this.$appsyncClient
          .query({
            query: gpl(queries.listVinRecalls),
            variables: {
              vin: item.data.vin
            },
            fetchPolicy: 'no-cache'
          })
        if (res.data && res.data.listVinRecalls && !res.data.listVinRecalls.api_request_id) {
          item.error = true
        } else {
          item.info = res.data.listVinRecalls
          item.error = false
        }
      } catch (e) {
        item.error = true
        // this.showLoadingError(item)
      }
      item.loading = false
      return item
    },
    async fetchMakeRecall (item) {
      try {
        const { make, model, year } = item.data
        const res = await this.$appsyncClient
          .query(
            {
              query: gpl(queries.listNhtsaRecalls),
              variables: {
                query: {
                  make,
                  model,
                  year
                }
              },
              fetchPolicy: 'no-cache'
            }
          )
        const data = res.data.listNhtsaRecalls
        const recalls = data.Results.map((item) => {
          item.name = item.NHTSACampaignNumber
          item.description = item.Summary
          item.remedy = item.Remedy
          item.recall_id = item.NHTSACampaignNumber
          return item
        })
        item.info = {
          recalls,
          make,
          model_name: model,
          model_year: year
        }
      } catch (e) {
        item.error = true
        item.info = {
          recalls: []
        }
      }
      return item
    },
    async fetchVehicleDetail (item, index) {
      let res = null
      if (item.data.vin) {
        res = await this.fetchVinRecall(item, index)
      } else {
        res = await this.fetchMakeRecall(item, index)
      }
      res.loadedTime = new Date().getTime()
      res.loading = false
      const vehicles = JSON.parse(JSON.stringify(this.vehicles))
      vehicles[index] = res
      this.vehicles = vehicles
    },

    fetchRecalls () {
      const garages = this.garages
      const vehicles = []
      if (garages.data && garages.data.length) {
        for (let i = 0; i < garages.data.length; i++) {
          const data = garages.data[i]
          const displayText = data.vin ? data.vin : `${data.make} - ${data.model} -${data.year}`
          vehicles.push({
            key: i,
            data,
            displayText,
            loading: true,
            loadedInfo: null,
            error: false
          })
        }
      }
      vehicles.sort((a, b) => b.data.createdAt - a.data.createdAt)
      this.vehicles = vehicles
      this.vehicles.forEach((item, index) => {
        this.fetchVehicleDetail(item, index)
      })
    },
    async fetchUserGarage (fetchDealer = true) {
      if (!this.user) {
        return
      }
      this.vehicles = []
      const myGarageResponse = await this.$appsyncClient.query({
        query: gpl(queries.getMyGarage),
        variables: {
          username: this.user.attributes.email
        },
        fetchPolicy: 'no-cache'
      })
      const garages = myGarageResponse.data.getMyGarage
      if (garages) {
        this.garages = garages
        this.fetchRecalls()
      }
    },
    showLoadingError (item, message) {
      if (!message) {
        message = `Can not get recalls of VIN ${item.vin}`
      }
      this.$bvToast.toast(message, {
        title: 'Loading error for VIN ' + item.vin,
        autoHideDelay: 5000,
        variant: 'danger',
        solid: true
      })
    },
    retryReload (index) {
      this.fetchVehicleDetail(this.vehicles[index], index)
    },
    async removeVehicle (index) {
      const data = this.vehicles.map((vehicle) => {
        return {
          make: vehicle.data.make,
          model: vehicle.data.model,
          year: vehicle.data.year,
          vin: vehicle.data.vin
        }
      })
      data.splice(index, 1)
      await this.updateGarage(data)
      await this.fetchUserGarage()
    },
    updateGarage (
      data,
      successMessage = 'Update your garage successfully',
      errorMessage = 'Failed to update garage information'
    ) {
      return this.$appsyncClient
        .mutate({
          mutation: gpl(mutations.updateMyGarage),
          variables: {
            input: {
              username: this.user.attributes.email,
              data
            }
          }
        })
        .then(() => {
          this.$bvToast.toast(successMessage, {
            title: 'Update garage',
            autoHideDelay: 5000,
            variant: 'success',
            solid: true
          })
        })
        .catch((err) => {
          console.log(err)
          this.$bvToast.toast(errorMessage, {
            title: 'Update garage',
            autoHideDelay: 5000,
            variant: 'danger',
            solid: true
          })
        })
        .finally(() => {
          return Promise.resolve()
        })
    }
  }
}
</script>

<style scoped lang="scss">
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

  .switch-text {
    text-align: right;
    padding-bottom: 15px;
    font-weight: 600;

    a:focus, a:active {
      color: #00B6F2;
    }
  }

  .inner-container {
    min-height: 100vh;
    max-width: 1000px;
    margin: auto;
    padding: 0 20px;

    .garage-content-cnt {
      margin-top: 110px;

      .garage-section {
        background: #f7f7f7;
        min-height: 500px;
        padding-top: 20px;
      }
    }

  }

  .dealer-side-bar {
    background: #f7f7f7;
    padding: 0 10px;
  }

  .filter-cnt {
    margin: 20px 0;
    display: flex;
    /* flex-wrap: wrap; */

    .vin-input-cnt {
      margin-right: 20px;
      width: 100%;

      input {
        height: 56px;
      }
    }

    .btn-primary {
      width: 280px;
    }
  }

  .make-form-container {
    padding-bottom: 15px;
  }

  .vehicle-select {
    background: #fff;

    input::placeholder {
      color: #aaa;
    }
  }

  .model-input {
    margin-top: 1rem;
  }

  button.btn-add {
    margin-top: 1rem;
  }

  @media screen and (max-width: 576px) {
    .filter-cnt {
      flex-wrap: wrap;

      .btn-primary {
        width: 100%;
      }
    }
    .filter-cnt .vin-input-cnt {
      margin-right: 0;
      padding-bottom: 10px;
    }

    .filter-cnt .btn-secondary {
      margin-top: 15px;
      width: 100%;
    }

    .inner-container {
      .inner-container {
        padding: 0;
      }
    }

    .year-model-wrapper {
      margin-bottom: 20px;
    }

    .form-select-filter {
      background: #fff;

      input::placeholder {
        color: #999;
      }
    }
  }

  @media screen and (max-width: 991px) {
    .year-input {
      margin-bottom: 1rem;
    }
  }
</style>
