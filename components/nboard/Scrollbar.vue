<template>
  <div ref="osTargetRef" class="os-host">
    <div class="os-resize-observer-host"></div>
    <div class="os-padding">
      <div class="os-viewport">
        <div class="os-content">
          <slot />
        </div>
      </div>
    </div>
    <div class="os-scrollbar os-scrollbar-horizontal">
      <div class="os-scrollbar-track">
        <div class="os-scrollbar-handle"></div>
      </div>
    </div>
    <div class="os-scrollbar os-scrollbar-vertical">
      <div class="os-scrollbar-track">
        <div class="os-scrollbar-handle"></div>
      </div>
    </div>
    <div class="os-scrollbar-corner"></div>
  </div>
</template>

<script>
import OverlayScrollbars from 'overlayscrollbars'
import 'overlayscrollbars/css/OverlayScrollbars.css'

export default {
  name: 'NScrollbar',
  inheritAttrs: false,
  expose: ['osInstance', 'osTarget'],
  props: {
    options: {
      type: Object,
    },
    extensions: {
      type: [String, Array, Object],
    },
  },
  data() {
    return {
      osInstanceValue: null,
    }
  },
  computed: {
    computedOptions() {
      return this.options
    },
  },
  watch: {
    options(currOptions) {
      if (OverlayScrollbars.valid(this.osInstanceValue)) {
        this.osInstanceValue.options(currOptions)
      }
    },
  },
  mounted() {
    this.osInstanceValue = OverlayScrollbars(
      this.$refs.osTargetRef,
      this.options || {},
      this.extensions
    )
  },
  beforeUnmount() {
    if (OverlayScrollbars.valid(this.osInstanceValue)) {
      this.osInstanceValue.destroy()
      this.osInstanceValue = null
    }
  },
  methods: {
    osInstance() {
      return this.osInstanceValue
    },
    osTarget() {
      return this.$refs.osTargetRef || null
    },
  },
}
</script>
