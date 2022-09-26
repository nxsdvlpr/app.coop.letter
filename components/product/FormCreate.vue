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
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import useFormProduct from '@/components/product/composables/useFormProduct'

import { CREATE_PRODUCT } from '@/graphql/product/mutations/CREATE_PRODUCT'
import { GET_PRODUCTS } from '@/graphql/product/queries/GET_PRODUCTS'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()
    const { variables } = useNTableCursorRemoteData()
    const { form, validation } = useFormProduct()

    const refetchQueries = [
      {
        query: GET_PRODUCTS,
        variables,
      },
    ]

    const {
      mutate: createProduct,
      onDone: onCreateProductDone,
      onError: onCreateProductError,
      loading,
    } = useMutation(CREATE_PRODUCT, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()
      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createProduct({
        input: form.product,
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.product.image = file.url
    }

    onCreateProductDone(({ data }) => {
      $toast.success('Product successfully added!')
      emit('save')
    })

    onCreateProductError((error) => {
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
