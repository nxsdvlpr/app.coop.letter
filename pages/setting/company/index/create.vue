<template>
  <div>
    <NModal
      header="Create Company"
      :showing="true"
      :show-close="false"
      :background-close="true"
      @close="onClosed"
    >
      <SettingCompanyFormCreate @discard="onDiscard" @save="onSave" />
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
    accessName: 'setting_company',
  },
  setup() {
    const router = useRouter()
    const { env } = useContext()
    const onClosed = () => {
      router.push('/setting/company')
    }
    const onSave = () => {
      router.push('/setting/company')
    }
    const onDiscard = () => {
      router.push('/setting/company')
    }
    useMeta({
      title: `Create Company - ${env.appName}`,
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
