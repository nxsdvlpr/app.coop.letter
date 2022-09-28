<template>
  <div>
    <AppHeader>
      <h1>Company</h1>
      <p>Setting &raquo; Company &raquo; Lists</p>
    </AppHeader>
    <AppMain>
      <NPanel>
        <SettingCompanyList
          @row-tap="onRowTap"
          @create="onCreate"
          @delete="onDelete"
        />
      </NPanel>
      <nuxt-child />
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
    accessName: 'setting_company',
  },
  setup() {
    const router = useRouter()

    const { env } = useContext()

    const onRowTap = (row) => {
      router.push(`/setting/company/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/setting/company/create#overview')
    }

    const onDelete = (rows) => {}

    useMeta({
      title: `List Company - ${env.appName}`,
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
