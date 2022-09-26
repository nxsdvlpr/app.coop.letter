<template>
  <NWidget :title="computedOptions.title">
    <div class="text-xxl font-semibold mb-2">{{ computedCounter }}</div>
    <NDiff
      v-if="computedOptions.counterChange"
      :value="computedOptions.counterChange"
      :pretty-number="computedOptions.prettyNumber"
    />
  </NWidget>
</template>

<script>
import { defaultsDeep } from 'lodash'
import {
  defineComponent,
  computed,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup(props) {
    const context = useContext()

    const defaultOptions = ref({
      title: null,
      counter: 0,
      counterChange: 0,
      prettyNumber: true,
    })

    const computedOptions = computed(() => {
      return defaultsDeep(props.options, defaultOptions.value)
    })

    const computedCounter = computed(() => {
      return computedOptions.value.prettyNumber
        ? context.$__.prettyNumber(computedOptions.value.counter, 1)
        : computedOptions.value.counter
    })

    return {
      computedOptions,
      computedCounter,
    }
  },
})
</script>

<style lang="postcss" scoped>
@tailwind components;
.n-counter-widget {
  @apply aspect-w-6;
  @apply aspect-h-5;

  &.aspect-6\/4 {
    @apply aspect-w-6 !important;
    @apply aspect-h-4 !important;
  }
}
</style>
