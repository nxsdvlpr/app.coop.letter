<template>
  <div class="n-spin">
    <div v-if="type === 'wave'" class="sk-wave">
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
    </div>
    <div v-else-if="type === 'fold'" class="sk-fold">
      <div class="sk-fold-cube"></div>
      <div class="sk-fold-cube"></div>
      <div class="sk-fold-cube"></div>
      <div class="sk-fold-cube"></div>
    </div>
    <div v-else-if="type === 'plane'" class="sk-plane"></div>
    <div v-else-if="type === 'chase'" class="sk-chase">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>
    <div v-else-if="type === 'bounce'" class="sk-bounce">
      <div class="sk-bounce-dot"></div>
      <div class="sk-bounce-dot"></div>
    </div>
    <div v-else-if="type === 'pulse'" class="sk-pulse"></div>
    <div v-else-if="type === 'flow'" class="sk-flow">
      <div class="sk-flow-dot"></div>
      <div class="sk-flow-dot"></div>
      <div class="sk-flow-dot"></div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/spinkit.pcss";

// @todo:
// - create template for all spinkit loadier type (https://github.com/tobiasahlin/SpinKit)
// - add color props
// - add width props (optional)

export default {
  name: "NSpin",
  props: {
    type: {
      type: String,
      default: "wave",
    },
  },
};
</script>

<style scoped>
.n-spin {
  --sk-color: #dcdcdc;

  .sk-fold {
    --sk-color: #fff;
  }
}
</style>
