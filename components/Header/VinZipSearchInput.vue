<template>
  <div>
    <div :class="showInput" class="search-cnt d-none">
      <span class="search-icon link-btn" @click="gotoVinSearch">
        <font-awesome-icon icon="arrow-right" />
      </span>
      <input
        v-if="!isZipInput"
        v-model.trim="vin"
        type="text"
        placeholder="Enter 17 digit VIN Number"
        class="form-control"
        maxlength="17"
        @keyup.enter="gotoVinSearch"
      >

      <input
        v-else
        v-model.trim="zipcode"
        type="text"
        placeholder="Enter Zip code to continue"
        class="form-control"
        maxlength="5"
        @keyup.enter="gotoVinSearch"
      >
    </div>
    <div v-if="!isZipInput">
      <div v-if="!$v.vin.minLength || !$v.vin.maxLength" class="small text-danger">
        Please enter your 17 digit VIN
      </div>
    </div>
    <div v-else-if="isZipInput">
      <div v-if="!$v.zipcode.minLength || !$v.zipcode.maxLength" class="small text-danger">
        Please enter your 5 digit zip code
      </div>
    </div>
  </div>
</template>

<script>
import { minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'VinZipSearchInput',
  props: {
    showInput: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      vin: null,
      zipcode: null,
      isZipInput: false
    }
  },
  mounted () {
    if (this.$route.name === 'recall-search-detailed') {
      const query = this.$route.query
      if (query.vin) {
        this.isZipInput = true
      }
    }
  },
  validations: {
    vin: {
      minLength: minLength(17),
      maxLength: maxLength(17)
    },
    zipcode: {
      minLength: minLength(5),
      maxLength: maxLength(5)
    }
  },
  methods: {
    gotoVinSearch () {
      if ((!this.$v.vin.$invalid) && (!this.$v.zipcode.$invalid)) {
        const vin = this.vin || this.$route.query.vin
        if (vin) {
          if (this.zipcode) {
            window.location.href = `/recall-search-detailed/?vin=${vin}&zipcode=${this.zipcode}`
          } else {
            this.isZipInput = true
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .search-cnt {
    position: relative;
    width: 300px;
  }

  .search-cnt .search-icon {
    top: 0;
    right: 0;
    width: 50px;
    height: 100%;
    display: flex;
    color: #b7b7b7;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .search-cnt .search-icon:hover {
    color: #000;
  }

  .search-cnt input {
    padding-right: 50px;
    width: 300px;
    height: 40px;
  }
</style>
