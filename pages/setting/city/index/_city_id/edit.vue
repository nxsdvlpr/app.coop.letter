<template>
  <div>
    <NModal
      header="Edit City"
      :showing="true"
      :show-close="false"
      :background-close="true"
      @close="onClosed"
    >
      <SettingCityFormEdit @discard="onDiscard" @save="onSave" />
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
    accessName: 'setting_city',
  },
  setup() {
    const router = useRouter()
    const { env } = useContext()
    const onClosed = () => {
      router.push('/setting/city')
    }
    const onSave = () => {
      router.push('/setting/city')
    }
    const onDiscard = () => {
      router.push('/setting/city')
    }
    useMeta({
      title: `Edit City - ${env.appName}`,
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
