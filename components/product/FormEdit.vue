<template>
  <NForm @submit="onSave">
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic information product."
    >
      <NInputGroup :feedback="validation.error('product.title')" label="Title">
        <NInput v-model.trim="form.product.title" type="text" />
      </NInputGroup>

      <NInputGroup label="Description">
        <NTextarea v-model.trim="form.product.description" />
      </NInputGroup>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('product.price')"
          label="Price"
        >
          <NInputCurrency v-model.number="form.product.price" />
        </NInputGroup>
      </NColumn>
      <NInputGroup label="Status">
        <NToggleButton
          v-model="form.product.isActive"
          :options="[
            {
              label: 'Active',
              value: true,
            },
            {
              label: 'InActive',
              value: false,
            },
          ]"
        />
      </NInputGroup>

      <NInputGroup label="Image">
        <UiImageUpload
          path="/product/"
          :src="form.product.image"
          @image-changed="onImageChanged"
        />
      </NInputGroup>
    </NFormSection>

    <NFormAction :loading="loading" @discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import useFormProduct from '@/components/product/composables/useFormProduct'

import { UPDATE_PRODUCT } from '@/graphql/product/mutations/UPDATE_PRODUCT'
import { GET_PRODUCTS } from '@/graphql/product/queries/GET_PRODUCTS'
import { GET_PRODUCT } from '@/graphql/product/queries/GET_PRODUCT'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation } = useFormProduct()

    const refetchQueries = [
      {
        query: GET_PRODUCTS,
        variables,
      },
      {
        query: GET_PRODUCT,
        variables: {
          id: route.value.params.product_id,
        },
      },
    ]

    const { onResult: onResultProduct } = useQuery(GET_PRODUCT, {
      id: route.value.params.product_id,
    })

    const {
      mutate: updateProduct,
      onDone: onUpdateProductDone,
      onError: onUpdateProductError,
      loading,
    } = useMutation(UPDATE_PRODUCT, {
      refetchQueries,
    })

    onResultProduct(({ data }) => {
      if (!data || !data.product) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.product
      form.product = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateProduct({
        input: {
          id: route.value.params.product_id,
          update: form.product,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.product.image = file.url
    }

    onUpdateProductDone(({ data }) => {
      $toast.success('Product successfully updated!')
      emit('save')
    })

    onUpdateProductError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      onSave,
      onDiscard,
      onImageChanged,
    }
  },
})
</script>
