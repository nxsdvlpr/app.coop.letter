<template>
  <div class="container n-panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NPanel',
}
</script>

<style lang="postcss" scoped>
.n-panel {
  &.disable-container {
    padding-right: 0;
    padding-left: 0;
  }

  &:last-child {
    @apply mb-8 md:mb-14;
  }
}
</style>
