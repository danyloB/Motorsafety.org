<template>
  <form :class="direction">
    <div class="service-form">
      <div class="form-inline">
        <div class="equal-cnt">
          <label class="justify-content-start">{{ searchByVin ? 'VIN' : 'Year' }}</label>
          <input
            v-if="searchByVin"
            v-model="form.vin"
            required
            class="home-form-input"
            placeholder="Enter VIN"
          />
          <input
            v-else
            v-model="form.year"
            required
            class="home-form-input"
            @input="onYearChange"
          />
        </div>
        <div class="equal-cnt">
          <label class="justify-content-start">Zip Code</label>
          <input
            v-model="form.zipcode"
            class="form-control home-form-input"
            name="zipcode"
            placeholder=""
          >
        </div>
      </div>
      <template v-if="!searchByVin">
        <div class="form-group">
          <label>Make</label>

          <v-select
            v-model="form.make"
            :options="makeOptions"
            label="text"
            class="form-select-filter"
            :clearable="false"
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
      <div
        class="form-group form-search-footer"
        :class="{
          'vin-padding': searchByVin,
          'flex-column': newLineSwitch
        }"
      >
        <div>
          <button
            class="btn btn-primary btn-lg text-center text-md-left"
            type="button"
            @click="gotoSearchResult"
          >
            Submit
          </button>
        </div>
        <div class="switch-text">
          Can't find your {{ searchByVin ? 'Vin' : 'Make' }}? Search By
          <span
            class="v-make link-btn"
            @click="searchByVin = !searchByVin"
          >{{ searchByVin ? 'Make': 'Vin' }}</span>
        </div>
        <div />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import gpl from 'graphql-tag'
import makes from '@/utils/makes'
import * as queries from '@/graphql/queries'

export default {
  name: 'HomeRecallForm',
  props: {
    direction: {
      type: String,
      default: 'vert'
    },
    newLineSwitch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchByVin: false,
      form: {
        make: null,
        model: null,
        year: '',
        zipcode: ''
      },
      makes,
      makeOptions: [],
      models: [],
      loading: {
        makes: false,
        models: false
      }
    }
  },
  computed: {
    ...mapGetters(['isMobile'])
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
          name: 'recall-search-detailed',
          query
        })
      }
    },
    onMakeSelected () {
      this.form.model = null
      this.fetchModels()
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
    },

    onYearChange () {
      this.models = []
      if (this.form.year.length === 4) {
        this.makeOptions = makes
        this.fetchModels()
      } else {
        this.makeOptions = []
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .service-form .form-inline {
    justify-content: space-between;
  }

  .home-form-input {
    width: 100% !important;
    height: 48px;
    border: 1px solid #E7E7E7;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background: #FFFFFF;
    padding: 15px;
  }

  .switch-text {
    line-height: 3rem;
    font-weight: 600;
    a:focus, a:active {
      color: #00B6F2;
    }

    padding-left: 10px;
  }

  .vin-padding {
    padding-top: 30px;
  }

  .form-search-footer {
    display: flex;

    &.flex-column {
      flex-direction: column;
      .switch-text {
        padding-left: 0;
        font-size: 15px;
      }
      button {
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .form-search-footer {
      flex-direction: column;
      button {
        width: 100%;
      }
      .switch-text {
        padding-left: 0;
      }
    }
  }
</style>
