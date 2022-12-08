<template>
  <div class="video-wrap">
    <cld-video
      controls="true"
      class="cld-video-ctn"
      publicId="v2-motorsafety/assets/MotorSafety_Promo"
    >
      <cld-transformation crop="pad" height="600" width="1000" />
    </cld-video>
    <span
      v-if="showPlayBtn"
      class="play-btn"
      @click="startPlayVideo"
    >
      <cld-image loading="lazy" publicId="v2-motorsafety/assets/images/play" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  data () {
    return {
      showPlayBtn: true,
      videoQuerySelector: '.cld-video-ctn video'
    }
  },
  mounted () {
    const vid = document.querySelector(this.videoQuerySelector)
    if (vid) {
      vid.addEventListener('play', () => {
        this.showPlayBtn = false
      })
      vid.addEventListener('pause', () => {
        this.showPlayBtn = true
      })
    }
  },
  methods: {
    startPlayVideo () {
      const vid = document.querySelector(this.videoQuerySelector)
      if (vid) {
        vid.play()
        this.showPlayBtn = false
      }
    }
  }
}
</script>
<style scoped>
.video-wrap {
  width: 100%;
  position: relative;
  background-size: cover;
  height: 600px;
}

.video-wrap .play-btn {
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  transform: scale(0.9);
  transition: all 0.5s ease;
  cursor: pointer;
}

.video-wrap a.play-btn:hover {
  transform: scale(1);
}

.cld-video-ctn {
  margin: auto;
}
.cld-video-ctn video {
  width: 100%;
  height: 600px;
}

@media screen and (max-width: 1199px) and (min-width: 768px) {
  .video-wrap {
    height: 550px;
  }
}

@media screen and (max-width: 767px) {
  .video-wrap {
    max-height: 350px;
  }
}
</style>
