<template>
  <button
    class="n-icon-button"
    v-bind="{ ...$props, ...$attrs }"
    v-on="$listeners"
  >
    <NIcon :icon="icon" />
  </button>
</template>

<script>
export default {
  name: 'NIconButton',
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      default: undefined,
    },
  },
}
</script>

<style>
.n-icon-button {
  @apply inline-flex;
  @apply items-center;
  @apply justify-center;

  .n-icon {
    @apply w-full !important;
    @apply h-full !important;
  }

  /* Size */
  @apply w-7;
  @apply h-7;

  @screen md {
    @apply w-6;
    @apply h-6;
  }

  &.xs {
    @apply w-5;
    @apply h-5;
    @screen md {
      @apply w-4;
      @apply h-4;
    }
  }

  &.sm {
    @apply w-6;
    @apply h-6;
    @screen md {
      @apply w-5;
      @apply h-5;
    }
  }

  &.md {
    @apply w-7;
    @apply h-7;
    @screen md {
      @apply w-6;
      @apply h-6;
    }
  }

  &.lg {
    @apply w-8;
    @apply h-8;
    @screen md {
      @apply w-7;
      @apply h-7;
    }
  }

  &.xl {
    @apply w-10;
    @apply h-10;
    @screen md {
      @apply w-9;
      @apply h-9;
    }
  }

  /* Color */
  @apply text-gray-400;

  &.primary {
    @apply text-primary;

    &:hover,
    &:focus {
      @apply text-primary-dark;
    }
  }

  &.secondary {
    @apply text-secondary;

    &:hover,
    &:focus {
      @apply text-secondary-dark;
    }
  }

  &.success {
    @apply text-success;

    &:hover,
    &:focus {
      @apply text-success-dark;
    }
  }

  &.info {
    @apply text-info;

    &:hover,
    &:focus {
      @apply text-info-dark;
    }
  }

  &.danger {
    @apply text-danger;

    &:hover,
    &:focus {
      @apply text-danger-dark;
    }
  }
}
</style>
