import Vue from 'vue'
import config from '@/lib/config'

Vue.use({
  install(Vue, name = '$appConfig') {
    Object.defineProperty(Vue.prototype, name, { value: config })
  },
})

export default ({ app }, inject) => {
  inject('appConfig', config)
}
