import Vue from 'vue'
import { VTooltip, VClosePopper } from 'floating-vue'
import '@/assets/css/tooltip.pcss'

Vue.directive('tooltip', VTooltip)
Vue.directive('close-popper', VClosePopper)
