<template>
  <date-picker
    class="n-datepicker"
    v-bind="{ ...$props, ...$attrs }"
    mode="date"
    :model-config="{
      type: 'string',
      mask: 'YYYY-MM-DD',
    }"
    v-on="$listeners"
  >
    <template #default="{ inputValue, inputEvents }">
      <input
        class="w-full border outline-none text-gray-dark border-gray-light rounded focus:border-gray-400 focus:ring-0"
        :value="inputValue"
        readonly
        :disabled="disabled"
        v-on="disabled ? undefined : inputEvents"
      />
    </template>
  </date-picker>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  name: 'NDatepicker',
  components: {
    DatePicker,
  },
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.n-datepicker {
  input {
    @apply px-3;
    @apply py-0;
    line-height: 2.5rem;
    box-shadow: inherit;
    /* -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04);
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04); */

    &:disabled {
      @apply cursor-not-allowed;
      background-color: #f8f8f8;
    }
  }
}
</style>
