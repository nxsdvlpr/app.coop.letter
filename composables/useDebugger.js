import { useStore, ref, watch } from '@nuxtjs/composition-api'

export default function useDebugger() {
  const store = useStore()

  const debugCode = ref(null)

  const debug = (payload) => {
    if (payload !== '' && payload !== null) {
      debugCode.value = payload
    }
  }

  const watchDebug = (payload) => {
    if (payload !== '' && payload !== null) {
      store.commit('nboard/debugCode', payload)
    }
  }

  watch(debugCode, watchDebug, { immediate: true, deep: true })

  return {
    debug,
  }
}
