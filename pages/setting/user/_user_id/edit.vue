<template>
  <div>
    <AppHeader>
      <h1>{{ user.name }}</h1>
      Setting &raquo; User &raquo; Detail User
      <template slot="more">
        <NButton class="outline" @click="$router.push('/setting/user')"
          >&laquo; USERS</NButton
        >
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </AppHeader>
    <AppMain>
      <NPanel>
        <SettingUserFormEdit @save="onSave" @discard="onDiscard" />
      </NPanel>
    </AppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  useRoute,
  ref,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_USER } from '@/graphql/setting/user/queries/GET_USER'

export default defineComponent({
  meta: {
    accessName: 'setting_user_management',
  },
  setup() {
    const router = useRouter()

    const route = useRoute()

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

    const { result } = useQuery(GET_USER, {
      id: route.value.params.user_id,
    })

    const user = useResult(result, {}, (data) => {
      return data.user
    })

    useMeta({
      title: `Detail User - ${env.appName}`,
    })

    return {
      tabs,
      user,
      onSave,
      onDiscard,
    }
  },
  head: {},
})
</script>
