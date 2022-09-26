<template>
  <div>
    <AppHeader>
      <h1>User Management</h1>
    </AppHeader>
    <AppMain>
      <NPanel>
        <SettingUserList
          @row-tap="onRowTap"
          @delete="onDelete"
          @create="onCreate"
        />
      </NPanel>
    </AppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    accessName: 'setting_user_management',
  },
  setup() {
    const router = useRouter()

    const { env } = useContext()

    const onRowTap = (row) => {
      router.push(`/setting/user/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/setting/user/create#overview')
    }

    const onDelete = (rows) => {}

    useMeta({
      title: `List User - ${env.appName}`,
    })

    return {
      onRowTap,
      onCreate,
      onDelete,
    }
  },
  head: {},
})
</script>
