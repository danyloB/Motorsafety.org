<template>
  <div>
    <div class="recall-by-type filter-wrapper">
      <h5>Recalls by type</h5>
      <ul>
        <li v-for="type in Object.keys(types)" :key="type" @click="onTypeSelected(type)">
          {{ types[type].name }}
        </li>
      </ul>
    </div>
    <div class="filter-wrapper">
      <h3>Find recalls</h3>
      <div class="year-input-wrapper">
        <label>Step 1: Choose Car Year</label>
        <div class="year-input-ctn">
          <div v-for="(group, index) in years" :key="index" class="year-radios-group">
            <b-form-radio
              v-for="year in group"
              :key="year"
              v-model="form.year"
              name="year"
              :value="year"
            >
              {{ year }}
            </b-form-radio>
          </div>
        </div>
      </div>
      <div class="make-wrapper">
        <h5>Step 2: Choose Car Make</h5>
        <div class="data-list">
          <ul>
            <li v-for="make in makes" :key="make.id" @click="onSelectMake(make)">
              {{ make.text }}
            </li>
          </ul>
        </div>
      </div>

      <div id="model-container" class="model-container">
        <h5>Step 3: Choose Car Model</h5>
        <div v-if="!form.year || !form.make">
          Choose your make and year first
        </div>
        <div v-else class="data-list">
          <b-spinner v-if="loading.models" />
          <ul v-else>
            <li
              v-for="model in models"
              :key="model"
              @click="onSelectModel(model)"
            >
              {{ model }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gpl from 'graphql-tag'
import makes from '@/utils/makes'
import types from '@/utils/types'
import * as queries from '@/graphql/queries'

export default {
  name: 'RecallFilter',
  data () {
    return {
      makes,
      types,
      models: [],
      form: {
        make: null,
        model: null,
        year: null,
        type: null
      },
      loading: {
        models: false
      },
      years: []
    }
  },
  created () {
    const currentYear = new Date().getFullYear()
    const years = []
    const total = 30
    const groupSize = 10
    let group = []
    for (let i = currentYear; i > currentYear - total; i--) {
      if (group.length < groupSize) {
        group.push(i)
      } else {
        years.push(group)
        group = [i]
      }
    }
    if (group.length) { years.push(group) }
    this.years = years
  },
  methods: {
    onTypeSelected (type) {
      this.$router.push(`/type/${type}/`)
    },
    onSelectModel (model) {
      if (!this.form.make || !this.form.year) {
        return
      }
      const query = {
        make: this.form.make.text,
        model,
        year: this.form.year
      }
      this.$router.push({
        name: 'recall-search-detailed',
        query
      })
    },
    onSelectMake (make) {
      this.form.make = make
      this.fetchModels()
      const elm = document.getElementById('model-container')
      const top = elm.offsetTop
      window.scrollTo({
        top,
        behavior: 'smooth'
      })
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
    }
  }
}
</script>

<style scoped lang="scss">
  .filter-wrapper {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    ul {
      li {
        list-style: none;
        cursor: pointer;
        padding-bottom: 10px;
        color: #00B6F2;
        font-weight: 600;
        margin-left: 10px;
      }
    }

    .year-input-wrapper {
      padding-bottom: 10px;

      label {
        font-weight: 600;
        font-size: 1.2rem;
      }
    }

    .make-wrapper {

      h5 {
        font-size: 1.2rem;
      }
    }

    .model-container {
      padding-top: 20px;
    }

    .data-list {
      max-height: 600px;
      overflow: hidden;

      &:hover {
        overflow-y: auto;
      }
    }

  }

  .recall-by-type {
    margin-top: 30px;
    h5 {
      font-size: 1.2rem;
    }
  }

  .year-input-ctn {
    display: flex;
    .year-radios-group {
      width: 33%;
    }
  }
</style>
