<template>
  <toggle-button
    class="n-toggle-switch"
    v-bind="{ ...$props, ...$attrs }"
    v-on="$listeners"
  />
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button'
export default {
  name: 'NToggleSwitch',
  components: {
    ToggleButton,
  },
}
</script>

<style lang="postcss" scoped>
.n-toggle-switch {
  & .v-switch-core {
    @apply bg-gray-300 !important;
  }

  &.toggled {
    & .v-switch-core {
      @apply bg-gray-400 !important;

      &:hover {
        @apply bg-gray-500 !important;
      }
    }

    &.primary {
      & .v-switch-core {
        @apply text-white !important;
        @apply bg-primary !important;
        @apply border-primary !important;

        &:hover {
          @apply bg-primary-dark !important;
        }
      }
    }

    &.secondary {
      & .v-switch-core {
        @apply text-white !important;
        @apply bg-secondary !important;
        @apply border-secondary !important;

        &:hover {
          @apply bg-secondary-dark !important;
        }
      }
    }

    &.success {
      & .v-switch-core {
        @apply text-white !important;
        @apply bg-success !important;
        @apply border-success !important;

        &:hover {
          @apply bg-success-dark !important;
        }
      }
    }

    &.info {
      & .v-switch-core {
        @apply text-white !important;
        @apply bg-info !important;
        @apply border-info !important;

        &:hover {
          @apply bg-info-dark !important;
        }
      }
    }

    &.danger {
      & .v-switch-core {
        @apply text-white !important;
        @apply bg-danger !important;
        @apply border-danger !important;

        &:hover {
          @apply bg-danger-dark !important;
        }
      }
    }
  }
}
</style>
