import Vue from 'vue'
import __ from '@/lib/helper'

Vue.use({
  install(Vue, name = '$__') {
    Object.defineProperty(Vue.prototype, name, { value: __ })
  },
})

Vue.mixin({
  filters: __,
})

export default ({ app }, inject) => {
  inject('__', __)
}
