<template>
  <NPanel>
    <div class="flex items-center justify-center wrapper">
      <NSpin />
    </div>
  </NPanel>
</template>

<script>
import {
  defineComponent,
  useContext,
  useStore,
  useRouter,
  onMounted,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const router = useRouter()

    const store = useStore()

    const { app, $apolloHelpers } = useContext()

    onMounted(async () => {
      await $apolloHelpers.onLogout()
      await app.apolloProvider.defaultClient.resetStore()

      store.commit('nboard/unsetSubmenus')
      store.dispatch('menus/unsetMenus')
      store.dispatch('auth/unsetAuth')

      router.push('/auth/login')
    })
  },
})
</script>

<style lang="postcss" scoped>
.wrapper {
  height: 90vh;
}
</style>
