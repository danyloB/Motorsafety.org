<template>
  <div id="main-container" class="main-container">
    <div id="inner-container" class="inner-container">
      <InnerHeader />
      <div id="middle">
        <div id="recall-search-result">
          <RecallSearchTitle />
          <div id="fix-map-cnt" class="fix-map-cnt d-none d-md-block">
            <div class="map-overlay">
              <p>
                Please choose a recall service to locate your nearest garage.
              </p>
            </div>
            <RecallMap :height="mapHeight" />
          </div>
          <RecallShortList />
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import InnerHeader from '@/components/Header/InnerHeader.vue'
import RecallSearchTitle from '@/components/Recall/RecallSearchTitle.vue'
import RecallShortList from '@/components/Recall/RecallShortList.vue'
import RecallMap from '@/components/Recall/RecallMap.vue'

export default {
  name: 'RecallNews',
  components: {
    InnerHeader,
    RecallSearchTitle,
    RecallShortList,
    RecallMap
  },
  data () {
    return {
      mapHeight: '500px'
    }
  },
  mounted () {
    window.addEventListener('scroll', this.setMap)
    this.$nextTick().then(() => document.body.classList.add('no-footer'))
  },
  beforeCreate () {
  },
  destroyed () {
    document.body.classList.remove('no-footer')
    window.removeEventListener('scroll', this.setMap)
  },
  methods: {
    setMap: () => {
      const fixMap = document.getElementById('fix-map-cnt')
      const fixTitleHeader = document.getElementById('current-recall-cnt')

      if (typeof fixMap !== 'undefined') {
        const scroll = window.scrollY
        if (scroll >= 200) {
          fixMap.classList.add('stickymap')
          fixTitleHeader.classList.add('cnt-sticky-top')
        } else {
          fixMap.classList.remove('stickymap')
          fixTitleHeader.classList.remove('cnt-sticky-top')
        }
      }
    }
  }
}
</script>
<style scoped>
  #recall-search-result {
    padding-top: 0;
    position: relative;
    background: #f7f7f7;
  }

  #recall-search-result.two .current-recall-cnt {
    border-bottom: 1px solid #e8e8e8;
  }

  .fix-map-cnt {
    position: fixed;
    right: 0;
    top: 207px;
    width: 55%;
    height: calc(100vh - 207px);
  }

  .fix-map-cnt.stickymap {
    top: 172px;
  }

  .map-overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .map-overlay p {
    background: #fff;
    border-radius: 8px;
    padding: 15px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  @media screen and (min-width: 768px) and (max-width: 1199px) {
    .fix-map-cnt {
      width: 50%;
      top: 227px;
    }

    #recall-search-result {
      padding-top: 0;
    }
  }

  @media screen and (max-width: 991px) {
    .map-overlay p {
      max-width: 80%;
    }
  }

  @media screen and (max-width: 767px) {
    #recall-search-result {
      padding-top: 0;
    }
  }
</style>
