<template>
  <div class="antialiased bg-white text-gray-dark">
    <div class="flex">
      <!-- Sidebar -->
      <div class="flex sticky top-0 h-screen z-20">
        <AppSidebar />
        <AppSubnav />
      </div>
      <div class="relative flex-grow flex flex-col">
        <!-- Navbar -->
        <header class="h-16 border-b sticky top-0 z-10">
          <AppNavbar @logout="onLogout" />
        </header>
        <!-- Main content -->
        <main class="flex-1">
          <Nuxt class="h-full flex flex-col" />
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
  name: 'DefaultLayout',
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
