<template>
  <div>
    <AppHeader>
      <h1>Setting</h1>
      <p>Setting</p>
    </AppHeader>
    <AppMain>
      <div></div>
    </AppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  useStore,
  computed,
  onMounted,
} from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const me = computed(() => store.getters['auth/me'])

    const role = computed(() => me.value.role.shortname)

    onMounted(() => {
      if (role.value === 'admin') {
        router.push('/setting/general#site')
      } else if (role.value === 'finance') {
        router.push('/setting/bank')
      }
    })

    return {}
  },
  head: {},
})
</script>
