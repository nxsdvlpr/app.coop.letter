<template>
  <div class="n-app-main antialiased text-gray-dark">
    <div class="flex">
      <!-- Sidebar -->
      <div class="flex sticky top-0 h-screen z-20">
        <AppSidebar />
        <AppSubnav />
      </div>
      <div class="relative flex-grow bg-app-light">
        <!-- Navbar -->
        <header class="h-16 border-b sticky top-0 z-10">
          <AppNavbar @logout="onLogout" />
        </header>
        <!-- Main content -->
        <main>
          <Nuxt />
        </main>
      </div>
    </div>
    <portal-target name="after-layout"> </portal-target>
  </div>
</template>

<script>
import {
  defineComponent,
  useStore,
  useRouter,
  computed,
  getCurrentInstance,
  watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LightBackgroundLayout',
  middleware: ['nboard', 'auth'],
  setup() {
    const store = useStore()

    const { root } = getCurrentInstance()

    const mq = computed(() => root.proxy.$mq)

    const router = useRouter()

    const onLogout = () => {
      router.push('/auth/logout')
    }

    const updateBreakpoint = (value) => {
      store.commit('nboard/setBreakpoint', value)
    }

    watch(mq, updateBreakpoint, {
      immediate: true,
    })

    return {
      onLogout,
    }
  },
})
</script>

<style lang="postcss" scoped>
/deep/ .n-app-main {
  .n-widget {
    @apply bg-white;
  }
}
</style>
