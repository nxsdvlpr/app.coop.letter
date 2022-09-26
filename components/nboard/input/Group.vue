<template>
  <div class="n-input-group relative">
    <div class="flex items-center justify-between h-5 gap-x-2">
      <label
        v-if="label"
        class="items-center flex-shrink-0 text-gray-base uppercase label line-clamp-1"
      >
        {{ label }}
      </label>
      <div
        class="flex items-center justify-end pr-1 pb-0.5 text-right text-3xs text-danger line-clamp-1 n-input-group-feedback"
      >
        <div v-if="feedback" v-tooltip="feedback">
          {{ feedback }}
        </div>
        <span v-if="required && valueLength === 0">#</span>
      </div>
    </div>
    <div class="mt-1 pb-6">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NInputGroup',
  props: {
    value: {
      type: [Number, String, Boolean, Array, Object],
      default: null,
    },
    label: {
      type: String,
      default: undefined,
    },
    feedback: {
      type: String,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    valueLength() {
      if (this.value) {
        return this.value.length
      }
      return 0
    },
  },
}
</script>
