<template>
  <div class="flex items-center n-input">
    <div v-if="hasPrefix" class="n-input-prefix">
      {{ prefix }}
    </div>
    <input
      class="w-full border outline-none text-gray-dark border-gray-light rounded-none focus:border-gray-400 focus:ring-0"
      :class="{
        'border-l rounded-l': !hasPrefix,
        'border-r rounded-r': !hasSuffix,
      }"
      v-bind="inputProps"
      :value="model"
      @input="onInput"
      @change="onChange"
      @keydown="onKeydown"
      @keypress="onKeypress"
      @keyup="onKeyup"
      @blur="onBlur"
    />
    <div v-if="hasSuffix" class="n-input-suffix">
      {{ suffix }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NInput',
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: undefined,
    },
    autocomplete: {
      type: Boolean,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: undefined,
    },
    placeholder: {
      type: [String, Number],
      default: undefined,
    },
    pattern: {
      type: String,
      default: undefined,
    },
    min: {
      type: [String, Number],
      default: undefined,
    },
    max: {
      type: [String, Number],
      default: undefined,
    },
    step: {
      type: [String, Number],
      default: undefined,
    },
    value: {
      type: [String, Number],
      default: undefined,
    },
    prefix: {
      type: String,
      default: undefined,
    },
    suffix: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    hasPrefix() {
      return !!this.prefix
    },
    hasSuffix() {
      return !!this.suffix
    },
    inputProps() {
      const props = { ...{}, ...this.$props }
      delete props.value
      delete props.suffix
      delete props.prefix
      return props
    },
    model() {
      return this.value
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value, event)
    },
    onChange(event) {
      this.$emit('change', event.target.value, event)
    },
    onKeydown(event) {
      this.$emit('keydown', event.target.value, event)
    },
    onKeypress(event) {
      this.$emit('keypress', event.target.value, event)
    },
    onKeyup(event) {
      this.$emit('keyup', event.target.value, event)
    },
    onBlur(event) {
      this.$emit('blur', event.target.value, event)
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-input {
  &-prefix {
    @apply border border-r-0;
    @apply rounded-l;
  }
  &-suffix {
    @apply border border-l-0;
    @apply rounded-r;
  }
  &-prefix,
  &-suffix {
    @apply text-xs text-gray-500;
    @apply border-gray-light;
    @apply bg-app-light;
  }
  &-prefix,
  &-suffix,
  input {
    @apply px-3;
    @apply py-0;
    line-height: 2.5rem;
    box-shadow: inherit;
    /* -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04);
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04); */
  }

  & :disabled {
    @apply cursor-not-allowed;
    background-color: #f8f8f8;
  }
}
</style>
