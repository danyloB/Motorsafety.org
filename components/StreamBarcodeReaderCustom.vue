<template>
  <div class="scanner-container">
    <div v-show="!isLoading">
      <video ref="scanner" poster="data:image/gif,AAAA" />
      <div class="overlay-element" />
      <div class="laser" />
    </div>
  </div>
</template>

<script>
import { BrowserMultiFormatReader, Exception } from '@zxing/library'

export default {
  name: 'StreamBarcodeReaderCustom',

  data () {
    return {
      isLoading: true,
      codeReader: new BrowserMultiFormatReader(),
      isMediaStreamAPISupported:
          navigator &&
          navigator.mediaDevices &&
          'enumerateDevices' in navigator.mediaDevices
    }
  },

  mounted () {
    if (!this.isMediaStreamAPISupported) {
      throw new Exception('Media Stream API is not supported')
    }

    // this.start();
    this.$refs.scanner.oncanplay = () => {
      this.isLoading = false
      this.$emit('loaded')
    }
  },

  beforeDestroy () {
    this.codeReader.reset()
  },

  methods: {
    start () {
      this.codeReader.decodeFromVideoDevice(
        undefined,
        this.$refs.scanner,
        // eslint-disable-next-line no-unused-vars
        (result, err) => {
          if (result) {
            this.$emit('decode', result.text)
          }
        }
      )
    },
    stop () {
      this.codeReader.reset()
    }
  }
}
</script>

<style scoped>
  video {
    max-width: 100%;
    max-height: 100%;
  }

  .scanner-container {
    position: relative;
  }

  .overlay-element {
    position: absolute;
    top: 0;
    width: 100%;
    height: 99%;
    background: rgba(30, 30, 30, 0.5);

    -webkit-clip-path: polygon(
      0% 0%,
      0% 100%,
      20% 100%,
      20% 20%,
      80% 20%,
      80% 80%,
      20% 80%,
      20% 100%,
      100% 100%,
      100% 0%
    );
    clip-path: polygon(
      0% 0%,
      0% 100%,
      20% 100%,
      20% 20%,
      80% 20%,
      80% 80%,
      20% 80%,
      20% 100%,
      100% 100%,
      100% 0%
    );
  }

  .laser {
    width: 60%;
    margin-left: 20%;
    background-color: tomato;
    height: 1px;
    position: absolute;
    top: 40%;
    z-index: 2;
    box-shadow: 0 0 4px red;
    -webkit-animation: scanning 2s infinite;
    animation: scanning 2s infinite;
  }

  @-webkit-keyframes scanning {
    50% {
      -webkit-transform: translateY(75px);
      transform: translateY(75px);
    }
  }

  @keyframes scanning {
    50% {
      -webkit-transform: translateY(75px);
      transform: translateY(75px);
    }
  }
</style>
