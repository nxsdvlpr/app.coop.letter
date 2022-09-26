<template>
  <div class="mb-4">
    <div>
      <date-picker
        :key="componentId"
        v-model="rangeDate"
        mode="date"
        placeholder="Select Date"
        is-range
      >
        <template #default="{ inputValue, inputEvents, isDragging }">
          <div class="md:w-64">
            <div class="relative flex-grow">
              <svg
                class="text-primary w-4 h-full mx-2 absolute pointer-events-none"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <!-- <svg
                class="text-gray-600 w-4 h-full mx-2 absolute cursor-pointer right-0"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                :class="rangeDate.start ? 'visible' : 'invisible'"
                @click="clear"
              >
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg> -->
              <div
                class="flex items-center absolute cursor-pointer right-0 top-0 bottom-0"
                :class="rangeDate.start ? 'visible' : 'invisible'"
                @click="clear"
              >
                <NIcon
                  icon="close"
                  class="xs text-danger h-full mx-2 absolute cursor-pointer right-0"
                />
              </div>

              <input
                class="w-full border rounded pl-8 pr-2 py-1 outline-none focus:ring-0 text-gray-600"
                :class="{
                  'text-gray-900': !isDragging,
                  'bg-gray-50': !rangeDate.start,
                  'bg-white': rangeDate.start,
                }"
                :value="`${rangeDate.start ? inputValue.start : ''} ${
                  rangeDate.start ? '-' : ''
                } ${rangeDate.end ? inputValue.end : ''}`"
                v-on="inputEvents.start"
              />
            </div>
          </div>
        </template>
      </date-picker>
      <!-- <button
        type="button"
        class="text-white font-bold py-1 px-4 rounded-r user-select-none focus:outline-none"
        :class="rangeDate.start ? 'bg-red-500' : 'bg-red-300'"
        :disabled="!rangeDate.start"
        @click="clear"
      >
        Clear
      </button> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default defineComponent({
  components: { DatePicker },
  props: {
    value: {
      type: Object,
      default: () => ({
        start: null,
        end: null,
      }),
    },
  },
  setup(props, { emit }) {
    const rangeDate = ref(props.value)
    const componentId = ref(1)

    watch(
      rangeDate,
      (value) => {
        emit('input', value)
      },
      { deep: true }
    )

    const clear = () => {
      rangeDate.value.start = null
      rangeDate.value.end = null
      componentId.value = componentId.value + 1
      emit('clear', rangeDate)
    }

    return { rangeDate, componentId, clear }
  },
})
</script>
