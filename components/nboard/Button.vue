<template>
  <button class="n-button" v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
    <span v-if="icon">
      <NIcon :icon="icon" class="mr-1" />
    </span>
    <span><slot /></span>
  </button>
</template>

<script>
export default {
  name: 'NButton',
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      default: undefined,
    },
  },
}
</script>

<style scoped>
.n-button {
  @apply inline-flex;
  @apply justify-center;
  @apply items-center;
  @apply text-white;
  @apply uppercase;
  border-radius: 3px;

  &:disabled {
    @apply cursor-not-allowed;
  }

  &:focus {
    @apply ring-0;
  }

  /* Size */
  @apply px-4;
  @apply label;
  line-height: 1;
  height: 32px;
  min-width: 5rem;

  & span div {
    @apply w-4;
    @apply h-4;
  }

  @screen md {
    height: 36px;
  }

  &.sm {
    @apply px-3;
    @apply label-sm;
    height: 24px;
    min-width: 4.5rem;

    & span div {
      @apply w-3;
      @apply h-3;
    }

    @screen md {
      height: 28px;
    }
  }

  &.lg {
    @apply px-5;
    @apply label-lg;
    border-radius: 4px;
    height: 32px;
    min-width: 5.2rem;

    & span div {
      @apply w-5;
      @apply h-5;
    }

    @screen md {
      height: 40px;
    }
  }

  /* Color */
  @apply bg-gray-400;
  &:hover,
  &:focus {
    @apply bg-gray-500;
  }
  &:disabled {
    @apply bg-gray-300;
  }

  &.primary {
    @apply bg-primary;

    &:hover,
    &:focus {
      @apply bg-primary-dark;
    }
    &:disabled {
      @apply bg-primary-semi;
    }
  }

  &.secondary {
    @apply text-white;
    @apply bg-secondary;

    &:hover,
    &:focus {
      @apply bg-secondary-dark;
    }
    &:disabled {
      @apply bg-secondary-semi;
    }
  }

  &.success {
    @apply bg-success;

    &:hover,
    &:focus {
      @apply bg-success-dark;
    }
    &:disabled {
      @apply bg-success-semi;
    }
  }

  &.info {
    @apply bg-info;

    &:hover,
    &:focus {
      @apply bg-info-dark;
    }
    &:disabled {
      @apply bg-info-semi;
    }
  }

  &.danger {
    @apply bg-danger;

    &:hover,
    &:focus {
      @apply bg-danger-dark;
    }
    &:disabled {
      @apply bg-danger-semi;
    }
  }

  &.outline {
    @apply outline-none;
    @apply bg-white;
    @apply border;
    @apply border-gray-light;
    @apply text-gray-dark;

    &:hover,
    &:focus {
      @apply border-gray-400;
    }
    &:disabled {
      @apply text-gray-light;
      @apply border-gray-lightest;
    }
  }
}
</style>
