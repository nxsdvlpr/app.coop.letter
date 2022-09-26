<template>
  <div>
    <AppHeader>
      <h1>User</h1>
      <p>Setting &raquo; User &raquo; Create User</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/setting/user')"
            >&laquo; USERS</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </AppHeader>
    <AppMain>
      <NPanel>
        <SettingUserFormCreate @save="onSave" @discard="onDiscard" />
      </NPanel>
    </AppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  ref,
  useMeta,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    accessName: 'setting_user_management',
  },
  setup() {
    const router = useRouter()

    const { env } = useContext()

    const tabs = ref([
      {
        name: 'Overview',
        to: '#overview',
      },
    ])

    const onSave = () => {
      router.push('/setting/user')
    }

    const onDiscard = () => {
      router.push('/setting/user')
    }

    useMeta({
      title: `Create User - ${env.appName}`,
    })

    return {
      tabs,
      onSave,
      onDiscard,
    }
  },
  head: {},
})
</script>
