<template>
  <div
    :class="{ 'flex-grow-0': !show }"
    class="flex flex-grow w-full md:w-auto n-table-toolbar-filter"
  >
    <div
      class="items-center hidden px-6 border-t border-b border-l rounded-l md:flex bg-blue-lighter border-gray-light label"
    >
      FILTER
    </div>
    <div
      class="flex items-center w-full px-4 border rounded-l rounded-r text-md border-gray-light md:rounded-l-none"
    >
      <div class="flex items-center">
        <NIcon icon="search" class="text-primary" />
      </div>
      <div class="flex-grow">
        <input
          :value="value"
          type="text"
          placeholder="..."
          class="w-full py-2 border-0 focus:ring-0"
          @input="onInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  name: 'NTableToolbarSearch',
  props: {
    value: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onInput: debounce(function (event) {
      const value = event.target.value
      if (value.length > 2) {
        this.$emit('input', value)
      } else {
        this.$emit('input', null)
      }
    }, 300),
  },
}
</script>
