import Vue from 'vue'
import vueDebounce from 'vue-debounce'

// Or if you want to pass in the lock option
Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup'],
})
