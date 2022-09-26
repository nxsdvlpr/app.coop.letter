<template>
  <div v-if="showDebugger">
    <div class="n-app-debugger">
      <div class="n-app-debugger-wrapper">
        <NCode v-model="debuggerCode" />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore, computed, watch, ref } from '@nuxtjs/composition-api'

export default {
  setup(props, { emit }) {
    const store = useStore()

    const showDebugger = ref(false)

    const debuggerCode = computed(() => store.getters['nboard/debuggerCode'])

    const watchDebug = (payload) => {
      showDebugger.value = false

      if (payload && payload !== 'null') {
        showDebugger.value = true
      }
    }

    watch(debuggerCode, watchDebug, { immediate: true, deep: true })

    return {
      debuggerCode,
      showDebugger,
    }
  },
}
</script>

<style lang="postcss" scoped>
.n-app-debugger {
  width: 30vw;
  background: #2d2d2d;

  @apply flex-grow-0;
  @apply h-screen;
  &-spacer {
    width: 30vw;
  }
  &-wrapper {
    width: 30vw;

    @apply fixed top-0 right-0;
    @apply h-screen overflow-auto;
  }
}
</style>
