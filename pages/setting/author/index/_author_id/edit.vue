<template>
  <div>
    <NModal
      header="Edit Author"
      :showing="true"
      :show-close="false"
      :background-close="true"
      @close="onClosed"
    >
      <SettingAuthorFormEdit @discard="onDiscard" @save="onSave" />
    </NModal>
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
    const onClosed = () => {
      router.push('/setting/author')
    }
    const onSave = () => {
      router.push('/setting/author')
    }
    const onDiscard = () => {
      router.push('/setting/author')
    }
    useMeta({
      title: `Edit Author - ${env.appName}`,
    })
    return {
      onClosed,
      onSave,
      onDiscard,
    }
  },
  head: {},
})
</script>
