import Vue from 'vue'
import Cloudinary from 'cloudinary-vue'
const cloudName = 'motorsafety'
Vue.use(Cloudinary, {
  configuration: {
    cloudName,
    secure: true
  }
})
