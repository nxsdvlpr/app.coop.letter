<template>
  <NInput
    v-bind="inputProps"
    ref="inputRef"
    type="tel"
    :prefix="showPrefix ? 'Rp.' : undefined"
    :value="parseInt(model) > 0 ? model : null"
    @input="onInput"
    @change="onChange"
    @keydown="onKeydown"
    @keypress="onKeypress"
    @keyup="onKeyup"
    @blur="onBlur"
  />
</template>

<script>
export default {
  name: 'NInputCurrency',

  props: {
    id: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
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
    disabled: {
      type: Boolean,
      default: undefined,
    },
    value: {
      default: undefined,
      type: [Number, String],
    },
    showPrefix: {
      type: Boolean,
      default: true,
    },
    options: {
      default: () => ({
        locale: 'id-ID',
        currency: 'IDR',
        autoDecimalDigits: true,
        hideGroupingSeparatorOnFocus: false,
        hideNegligibleDecimalDigitsOnFocus: false,
        exportValueAsInteger: true,
        precision: 0,
        currencyDisplay: 'hidden',
      }),
      type: Object,
    },
  },
  computed: {
    model() {
      return this.formatCurrency(this.value)
    },
    inputProps() {
      const props = { ...{}, ...this.$props }
      delete props.value
      delete props.showPrefix
      delete props.options
      return props
    },
  },
  methods: {
    formatCurrency(number) {
      if (this.isEmpty(number)) {
        return number
      }

      const currency = Intl.NumberFormat('id-ID').format(number)
      if (!currency) {
        return '0'
      }
      return currency
    },
    unformatCurrency(number) {
      if (this.isEmpty(number)) {
        return number
      }

      if (typeof number === 'string') {
        const cleanNumber = number.replace(/\D/g, '')
        return cleanNumber || '0'
      }

      return String(number).replace(/\D/g, '')
    },
    isEmpty(value) {
      if (value === null || value === '') {
        return true
      }

      return false
    },
    onInput(value, event) {
      this.$emit('input', this.unformatCurrency(value), event)
    },
    onChange(value, event) {
      this.$emit('change', this.unformatCurrency(value), event)
    },
    onKeypress(value, event) {
      return this.validateInput('keypress', value, event)
    },
    onKeydown(value, event) {
      return this.validateInput('keydown', value, event)
    },
    onKeyup(value, event) {
      return this.validateInput('keyup', value, event)
    },
    onBlur(value, event) {
      return this.validateInput('blur', value, event)
    },
    validateInput(eventName, value, event) {
      const charCode = event.which ? event.which : event.keyCode

      const invalidValidKey =
        (charCode < 48 || charCode > 57) && ![8, 9, 27].includes(charCode)

      if (invalidValidKey) {
        return event.preventDefault()
      }

      if (String(this.value).length >= 12 && ![8, 9, 27].includes(charCode)) {
        return event.preventDefault()
      }

      this.$emit(eventName, value, event)

      return true
    },
  },
}
</script>
