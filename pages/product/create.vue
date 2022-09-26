<template>
  <div>
    <AppHeader>
      <h1>Product</h1>
      <p>Product &raquo; Create Product</p>
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/product')"
            >&laquo; PRODUCTS</NButton
          >
        </NButtonGroup>
      </template>
    </AppHeader>
    <AppMain>
      <NPanel>
        <ProductFormCreate @save="onSave" @discard="onDiscard" />
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
    accessName: 'product',
  },
  setup() {
    const router = useRouter()

    const { env } = useContext()

    const tabs = ref([
      {
        name: 'Overview',
        to: '#overview',
      },
    ])

    const onSave = () => {
      router.push('/product')
    }

    const onDiscard = () => {
      router.push('/product')
    }

    useMeta({
      title: `Create Product - ${env.appName}`,
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
