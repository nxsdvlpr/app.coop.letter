<template>
  <div>
    <AppHeader>
      <h1>Author</h1>
      <p>Setting &raquo; Author &raquo; Lists</p>
    </AppHeader>
    <AppMain>
      <NPanel>
        <SettingAuthorList
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
    accessName: 'setting_author',
  },
  setup() {
    const router = useRouter()

    const { env } = useContext()

    const onRowTap = (row) => {
      router.push(`/setting/author/${row.id}/edit`)
    }

    const onCreate = () => {
      router.push('/setting/author/create')
    }

    const onDelete = (rows) => {}

    useMeta({
      title: `List Author - ${env.appName}`,
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
