<template>
  <div>
    <AppHeader>
      <h1>Product</h1>
      <p>Product &raquo; Lists</p>
    </AppHeader>
    <AppMain>
      <NPanel>
        <ProductList
          @row-tap="onRowTap"
          @create="onCreate"
          @delete="onDelete"
        />
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
    accessName: 'product',
  },
  setup() {
    const router = useRouter()

    const { env } = useContext()

    const onRowTap = (row) => {
      router.push(`/product/${row.id}/edit#overview`)
    }

    const onCreate = () => {
      router.push('/product/create#overview')
    }

    const onDelete = (rows) => {}

    useMeta({
      title: `List Product - ${env.appName}`,
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
