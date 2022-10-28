<template>
  <div>
    <AppHeader>
      <h1>City</h1>
      <p>Setting &raquo; City &raquo; Lists</p>
    </AppHeader>
    <AppMain>
      <NPanel>
        <SettingCityList
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
    accessName: 'setting_city',
  },
  setup() {
    const router = useRouter()

    const { env } = useContext()

    const onRowTap = (row) => {
      router.push(`/setting/city/${row.id}/edit`)
    }

    const onCreate = () => {
      router.push('/setting/city/create')
    }

    const onDelete = (rows) => {}

    useMeta({
      title: `List City - ${env.appName}`,
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
