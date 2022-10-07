<template>
  <div>
    <AppHeader>
      <h1>Letter</h1>
      <p>Letter &raquo; Create Letter</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/letter')"
            >&laquo; LETTERS</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </AppHeader>
    <AppMain>
      <NPanel>
        <LetterFormCreate @save="onSave" @discard="onDiscard" />
      </NPanel>
    </AppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useRouter,
  useMeta,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  meta: {
    accessName: 'letter',
  },
  setup() {
    const router = useRouter()

    const { env } = useContext()

    const tabs = ref([
      {
        name: 'Meta',
        to: '#meta',
      },
      {
        name: 'Detail',
        to: '#detail',
      },
    ])

    const onSave = () => {
      router.push('/letter')
    }

    const onDiscard = () => {
      router.push('/letter')
    }

    useMeta({
      title: `Create Letter - ${env.appName}`,
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
