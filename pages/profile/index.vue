<template>
  <div>
    <AppHeader>
      <h1>Profile</h1>
      <p>Profile &raquo; My Profile</p>
    </AppHeader>
    <AppMain>
      <NPanel>
        <ProfileForm />
      </NPanel>
    </AppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  useStore,
  useMeta,
  useContext,
  computed,
} from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const store = useStore()

    const { env } = useContext()

    const me = computed(() => store.getters['auth/me'])

    useMeta({
      title: `Profile - ${env.appName}`,
    })

    return {
      me,
    }
  },
  head: {},
})
</script>
