<template>
  <div class="n-image-circle" :style="elStyle">
    <NImageCircle />
  </div>
</template>

<script>
export default {
  name: 'NBullet',
  props: {
    color: {
      type: String,
      default: null,
    },
  },
  computed: {
    elStyle() {
      return this.color ? 'color: ' + this.color : ''
    },
  },
}
</script>

<style scoped>
.n-image-circle {
  @apply inline-flex;
  @apply align-middle;
  @apply text-center;

  svg {
    @apply flex;
    @apply items-center;
    @apply justify-center;
    @apply w-full;
    @apply h-full;
  }

  @apply w-2.5;
  @apply h-2.5;

  &.sm {
    @apply w-2;
    @apply h-2;
  }

  &.md {
    @apply w-2.5;
    @apply h-2.5;
  }

  &.lg {
    @apply w-3;
    @apply h-3;
  }

  &.xl {
    @apply w-4;
    @apply h-4;
  }
}
</style>
