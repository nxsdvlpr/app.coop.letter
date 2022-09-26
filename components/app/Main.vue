<template>
  <div id="nAppMain" class="flex-1 n-app-main">
    <slot name="before"></slot>
    <slot></slot>
    <slot name="after"></slot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  mounted() {
    this.$nextTick(() => {
      this.calcAppMain()
      window.addEventListener('resize', this.calcAppMain)
    })
  },
  methods: {
    ...mapMutations({ calcAppMain: 'nboard/calcAppMain' }),
  },
}
</script>

<style>
.n-app-main {
}
</style>
