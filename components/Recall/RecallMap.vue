<template>
  <div>
    <GmapMap
      ref="map"
      :center="center"
      :zoom="10"
      :style="{
        height: height,
        width: width
      }"
    >
      <gmap-info-window
        v-for="(m, index) in markers"
        :key="`info-window-${index}`"
        :opened="m.isOpened"
        :position="m"
        :options="{
          pixelOffset: {
            width: 0,
            height: -35
          }
        }"
      >
        <div class="dealer-marker-info">
          <div class="dealer-name">
            <h5>{{ m.name }}</h5>
            <div>
              <span>Brands: </span> {{ m.brand }}
            </div>
            <div>
              <span>Address: </span> {{ m.address }}
            </div>
          </div>
          <div class="dealer-brand">
            <cld-image v-if="m.image_id" cloud-name="motorsafety" :public-id="m.image_id" />
          </div>
        </div>
      </gmap-info-window>
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="m"
        clickable
        @click="gotoDealerDetailPage(m)"
        @mouseover="showMarkerInfo(index)"
        @mouseout="hideMarkerInfo(index)"
      />
    </GmapMap>
  </div>
</template>

<script>
// import { gmapApi } from 'vue2-google-maps'
export default {
  name: 'RecallMap',
  props: {
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    dealers: {
      type: Array,
      default: () => []
    },
    showDetail: {
      type: Boolean,
      default: false
    },
    fitMarkers: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      markers: [],
      center: { lat: 37, lng: -95 }
    }
  },
  watch: {
    dealers: {
      handler () {
        this.reCenterMap()
      },
      deep: true
    }
  },
  mounted () {
    this.reCenterMap()
  },
  methods: {
    showMarkerInfo (index) {
      const markers = JSON.parse(JSON.stringify(this.markers))
      markers[index].isOpened = true
      this.markers = markers
    },
    hideMarkerInfo (index) {
      const markers = JSON.parse(JSON.stringify(this.markers))
      markers[index].isOpened = false
      this.markers = markers
    },
    gotoDealerDetailPage (marker) {
      this.$router.push({
        name: 'dealers-city_state_slug-slug',
        params: {
          slug: marker.slug,
          city_state_slug: marker.city_state_slug
        }
      })
    },
    reCenterMap () {
      this.$refs.map && this.$refs.map.$mapPromise.then(() => {
        if (window.google) {
          const bounds = new window.google.maps.LatLngBounds()
          const markers = this.getMarkers()
          this.markers = markers
          if (this.fitMarkers) {
            markers.forEach((loc) => {
              bounds.extend(loc)
            })
            this.$nextTick().then(() => {
              this.$refs.map.fitBounds(bounds)
            })
            this.$refs.map.panToBounds(bounds)
          } else if (markers.length) {
            this.center = markers[0]
          }
        }
      })
    },
    getMarkers () {
      return this.dealers
        .filter(item => !isNaN(parseFloat(item.latitude)) && !isNaN(parseFloat(item.longitude)))
        .map((item) => {
          return {
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
            isOpened: this.showDetail,
            name: item.name,
            image_id: item.image_id,
            slug: item.slug,
            city_state_slug: item.city_state_slug,
            brand: item.brand,
            address: item.address
          }
        })
    }
  }
}
</script>
