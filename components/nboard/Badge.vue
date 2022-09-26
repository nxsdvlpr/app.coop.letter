<template>
  <span class="n-badge inline-block label-sm uppercase whitespace-nowrap">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'NBadge',
}
</script>

<style scoped>
.n-badge {
  /* Size */
  @apply px-3;
  line-height: 26px;

  &.sm {
    @apply label-sm;
    @apply px-3;
    line-height: 22px;
  }

  &.lg {
    @apply label;
    @apply px-3;
    padding-top: 2px;
    line-height: 30px;
  }

  /* Color  */
  @apply bg-gray-300;
  @apply text-white;

  &.primary {
    @apply bg-primary-semi;
    @apply text-primary-dark;
  }

  &.secondary {
    @apply bg-secondary-semi;
    @apply text-secondary-dark;
  }

  &.success {
    @apply bg-success-semi;
    @apply text-success-dark;
  }

  &.info {
    @apply bg-info-semi;
    @apply text-info-dark;
  }

  &.danger {
    @apply bg-danger-semi;
    @apply text-danger-dark;
  }

  &.outline {
    @apply outline-none;
    @apply bg-white;
    @apply border;
    @apply border-gray-light;
    @apply text-gray-dark;
  }

  /* Shape */
  @apply rounded-full;

  &.squared {
    @apply rounded-md;
  }
}
</style>
