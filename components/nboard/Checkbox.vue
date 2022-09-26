<template>
  <label class="n-checkbox flex items-center">
    <span v-if="label">{{ label }}</span>
    <input
      class="checkbox"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
    />
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  name: 'NCheckbox',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Boolean, Array, Object],
      default: undefined,
    },
    modelValue: {
      type: [String, Boolean, Array, Object],
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    trueValue: {
      type: [String, Boolean, Array, Object],
      default: true,
    },
    falseValue: {
      type: [String, Boolean, Array, Object],
      default: false,
    },
    checked: {
      type: [Boolean, String],
      default: false,
    },
  },
  computed: {
    isChecked() {
      if (String(this.checked) === 'true') {
        return true
      }

      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue
    },
  },
  methods: {
    updateInput(event) {
      const isChecked = event.target.checked
      if (this.modelValue instanceof Array) {
        const newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-checkbox {
  display: inline-block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 6px;
  white-space: nowrap;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.n-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  vertical-align: middle;
  height: 0;
  width: 0;
}

.n-checkbox .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 21px;
  width: 21px;
  @apply rounded;
  @apply bg-white;
  @apply border border-gray-light;
}

.n-checkbox:hover input ~ .checkmark {
  @apply bg-gray-100;
}

.n-checkbox input:checked ~ .checkmark {
  @apply bg-gray-400;
}

.n-checkbox:hover input:checked ~ .checkmark {
  @apply bg-gray-500;
}

.n-checkbox.primary {
  & input:checked ~ .checkmark {
    @apply bg-primary border-primary-semi;
  }

  &:hover input:checked ~ .checkmark {
    @apply bg-primary-dark;
  }
}

.n-checkbox.secondary {
  & input:checked ~ .checkmark {
    @apply bg-secondary border-secondary-semi;
  }

  &:hover input:checked ~ .checkmark {
    @apply bg-secondary-dark;
  }
}

.n-checkbox.success {
  & input:checked ~ .checkmark {
    @apply bg-success border-success-semi;
  }

  &:hover input:checked ~ .checkmark {
    @apply bg-success-dark;
  }
}

.n-checkbox.info {
  & input:checked ~ .checkmark {
    @apply bg-info border-info-semi;
  }

  &:hover input:checked ~ .checkmark {
    @apply bg-info-dark;
  }
}

.n-checkbox.danger {
  & input:checked ~ .checkmark {
    @apply bg-danger border-danger-semi;
  }

  &:hover input:checked ~ .checkmark {
    @apply bg-danger-dark;
  }
}

.n-checkbox .checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.n-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.n-checkbox .checkmark:after {
  left: 7px;
  top: 0px;
  width: 7px;
  height: 15px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
