<template>
  <div>
    <AppMain>
      <NPanel>
        <div class="mt-8">
          <Dashboard />
        </div>
      </NPanel>
    </AppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  useStore,
  useContext,
  computed,
  useMeta,
} from '@nuxtjs/composition-api'
export default defineComponent({
  layout: 'light-background',
  meta: {
    accessName: 'home',
  },
  setup() {
    const store = useStore()

    const { env } = useContext()

    const me = computed(() => store.getters['auth/me'])

    useMeta({
      title: `Dashboard - ${env.appName}`,
    })

    return {
      me,
    }
  },
  head: {},
})
</script>
