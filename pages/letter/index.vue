<template>
  <div>
    <AppHeader>
      <h1>Letter</h1>
      <p>Letter &raquo; Lists</p>
    </AppHeader>
    <AppMain>
      <NPanel>
        <LetterList @row-tap="onRowTap" @create="onCreate" @delete="onDelete" />
      </NPanel>
    </AppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  useMeta,
  useRouter,
} from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    accessName: 'letter',
  },
  setup() {
    const router = useRouter()

    const { env } = useContext()

    const onRowTap = (row) => {
      router.push(`/letter/${row.id}/edit#meta`)
    }

    const onCreate = () => {
      router.push('/letter/create#meta')
    }

    const onDelete = (rows) => {}

    useMeta({
      title: `List Letter - ${env.appName}`,
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
