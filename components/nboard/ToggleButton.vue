<template>
  <div class="n-toggle-button">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :class="[activeValue === option.value ? 'selected' : '']"
      @click="setValue(option.value)"
    >
      {{ option[label] }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'NToggleButton',
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default() {
        return [
          {
            label: 'No',
            value: false,
          },
          {
            label: 'Yes',
            value: true,
          },
        ]
      },
    },
    value: {
      type: [String, Number, Object, Boolean],
      default() {
        const check = this.options.find((item) => item.value === false)

        if (check) {
          return false
        }

        const lastValue = [...this.options][0]
        return lastValue.value || false
      },
    },
    label: {
      type: String,
      default: 'label',
    },
  },
  data() {
    return {
      activeValue: null,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.activeValue = value
      },
    },
    activeValue: {
      immediate: true,
      handler(value) {
        this.$emit('change', value)
        this.$emit('input', value)
      },
    },
  },
  methods: {
    setValue(select) {
      this.activeValue = select
      this.$emit('selected', this.activeValue)
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-toggle-button {
  @apply flex;

  & button {
    @apply inline-flex;
    @apply justify-center;
    @apply items-center;
    @apply text-white;
    @apply uppercase;

    /* Size */
    @apply px-3;
    @apply label-sm;
    height: 24px;
    min-width: 4.5rem;

    @screen md {
      height: 28px;
    }

    /* Color */
    @apply bg-white;
    @apply border;
    @apply border-gray-light;
    @apply text-gray-dark;

    &:hover {
      /* @apply border-gray-400; */
      @apply bg-app-light;
    }

    &.selected {
      @apply bg-gray-400;
      @apply text-white;
      @apply border;
      @apply border-gray-400;
      @apply cursor-default;
    }

    &:first-child {
      @apply rounded-l;
    }

    &:not(:first-child) {
      margin-left: -1px;
    }

    &:last-child {
      @apply rounded-r;
    }
  }

  &.primary {
    & button {
      &.selected {
        @apply text-white;
        @apply bg-primary;
        @apply border-primary;

        &:hover {
          @apply bg-primary-dark;
        }
      }
    }
  }

  &.secondary {
    & button {
      &.selected {
        @apply text-white;
        @apply bg-secondary;
        @apply border-secondary;

        &:hover {
          @apply bg-secondary-dark;
        }
      }
    }
  }

  &.success {
    & button {
      &.selected {
        @apply text-white;
        @apply bg-success;
        @apply border-success;

        &:hover {
          @apply bg-success-dark;
        }
      }
    }
  }

  &.info {
    & button {
      &.selected {
        @apply text-white;
        @apply bg-info;
        @apply border-info;

        &:hover {
          @apply bg-info-dark;
        }
      }
    }
  }

  &.danger {
    & button {
      &.selected {
        @apply text-white;
        @apply bg-danger;
        @apply border-danger;

        &:hover {
          @apply bg-danger-dark;
        }
      }
    }
  }
}
</style>
