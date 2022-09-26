<template>
  <div>
    <AppHeader>
      <h1>{{ product.title }}</h1>
      Product &raquo; Detail Product
      <template slot="more">
        <NButtonGroup>
          <NButton class="outline" @click="$router.push('/product')"
            >&laquo; PRODUCTS</NButton
          >
        </NButtonGroup>
      </template>
      <template slot="after">
        <NTabs :tabs="tabs" />
      </template>
    </AppHeader>
    <AppMain>
      <NPanel>
        <ProductFormEdit @save="onSave" @discard="onDiscard" />
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
import { GET_PRODUCT } from '@/graphql/product/queries/GET_PRODUCT'

export default defineComponent({
  meta: {
    accessName: 'product',
  },
  setup() {
    const router = useRouter()

    const route = useRoute()

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
      title: `Detail Product - ${env.appName}`,
    })

    const { result } = useQuery(GET_PRODUCT, {
      id: route.value.params.product_id,
    })

    const product = useResult(result, {}, (data) => {
      return data.product
    })

    return {
      tabs,
      product,
      onSave,
      onDiscard,
    }
  },
  head: {},
})
</script>
