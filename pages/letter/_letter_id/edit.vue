<template>
  <div>
    <AppHeader>
      <h1>{{ letter.ref }}</h1>
      Letter &raquo; Detail Letter
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
        <LetterFormEdit @save="onSave" @discard="onDiscard" />
      </NPanel>
    </AppMain>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useRouter,
  useRoute,
  useMeta,
  useContext,
} from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_LETTER } from '@/graphql/letter/queries/GET_LETTER'

export default defineComponent({
  meta: {
    accessName: 'letter',
  },
  setup() {
    const router = useRouter()

    const route = useRoute()

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
      title: `Detail Letter - ${env.appName}`,
    })

    const { result } = useQuery(GET_LETTER, {
      id: route.value.params.letter_id,
    })

    const letter = useResult(result, {}, (data) => {
      return data.letter
    })

    return {
      tabs,
      letter,
      onSave,
      onDiscard,
    }
  },
  head: {},
})
</script>
