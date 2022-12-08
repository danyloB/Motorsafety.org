<template>
  <div>
    <client-only>
      <div class="row search-wrapper">
        <div class="d-lg-flex p-0 col-12 col-lg-6 align-items-center mb-4 mb-lg-0">
          <div class="col-12 col-lg-5">
            <h4 class="search-title">
              Search by City
            </h4>
          </div>
          <div class="col-12 col-lg-7">
            <div class="search-cnt">
              <input id="cities-autocomplete" type="text" class="form-control" placeholder="Enter location">
            </div>
          </div>
        </div>
        <div class="d-lg-flex p-0 col-12 col-lg-6 align-items-center">
          <div class="col-12 offset-lg-1 col-lg-4">
            <h4 class="search-title">
              or Zip Code
            </h4>
          </div>
          <div class="col-12 col-lg-7">
            <div class="search-cnt">
              <input
                v-model="zip"
                type="text"
                placeholder="Enter Zip"
                class="form-control dealer-input"
                @keyup.enter="searchDealersByZip"
              >
              <a href="#" class="search-icon link-btn" @click.prevent="searchDealersByZip">
                <font-awesome-icon icon="arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </client-only>
    <GmapMap
      ref="map"
      :center="{lat:37, lng:-95}"
      :zoom="7"
      style="height: 0"
    />
  </div>
</template>

<script>
import topDealers from '@/utils/topDealers'
import { getState, getCity, sanitizeText } from '@/utils'

export default {
  name: 'SearchByLocation',
  data () {
    return {
      navText: ['<font-awesome-icon icon="arrow-left" />', '<font-awesome-icon icon="arrow-right" />'],
      dealers: [],
      groupDealers: topDealers.groupDealers,
      cities: [],
      citiesOptions: [],
      city: '',
      zip: '',
      cityInputText: '',
      filter: {}
    }
  },
  mounted () {
    this.$refs.map && this.$refs.map.$mapPromise.then((map) => {
      if (window.google) {
        const input = document.getElementById('cities-autocomplete')
        const options = {
          types: ['(cities)'],
          componentRestrictions: { country: 'us' }
        }
        const autocomplete = new window.google.maps.places.Autocomplete(input, options)
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          const state = getState(place).toUpperCase()
          const city = sanitizeText(getCity(place))
          this.$router.push(`/dealers/${city}.${state}/`)
        })
      }
    })
  },
  methods: {
    onCityInput () {
      const searchText = this.cityInputText.toLowerCase().trim()
      if (searchText) {
        this.citiesOptions = this.cities.filter(item => item.city_key.includes(searchText))
      } else {
        this.citiesOptions = []
      }
    },
    searchDealersByZip () {
      if (this.zip) {
        this.$router.push(`/zip/${this.zip}/`)
      }
    },
    gotoDealerDetail (item) {
      this.$router.push(`/dealers/${item.city_slug}.${item.state}/`)
    }
  }
}
</script>

<style scoped>

  .search-cnt {
    position: relative;
    width: 100%;
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
    width: 100%;
  }

  .search-cnt input.gm-err-autocomplete {
    background-size: 30px;
    background-repeat: no-repeat;
    background-position: center right 10px;
  }

  ul {
    padding: 0;
  }

  .location-list li {
    cursor: pointer;
    display: flex;
    border-radius: 4px;
    height: 76px;
    align-items: center;
    border: 1px solid #e7e7e7;
    overflow: hidden;
    background: #fff;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-right: 5px solid transparent;
    width: calc(100% - 10px)
  }

  .location-list li:hover {
    border-right: 5px solid #454545;
  }

  .location-list li .location-thumb {
    height: 76px;
    width: 76px;
  }

  .location-list li h6 {
    text-align: center;
    width: calc(100% - 80px);
    margin: 0;
  }

  h2.search-title {
    line-height: 50px;
    height: 50px;
    font-size: 24px;
  }

  .search-wrapper {
    margin-bottom: 15px;
  }
</style>
