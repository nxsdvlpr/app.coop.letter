<template>
  <NForm @submit="onSave">
    <NInputGroup :feedback="validation.error('city.name')" label="Name">
      <NInput v-model.trim="form.city.name" type="text" />
    </NInputGroup>

    <NFormAction :loading="loading" @discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import useFormCity from '@/components/setting/city/useFormCity'

import { CREATE_CITY } from '@/graphql/setting/city/mutations/CREATE_CITY'
import { GET_CITIES } from '@/graphql/setting/city/queries/GET_CITIES'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()
    const { variables } = useNTableCursorRemoteData()
    const { form, validation } = useFormCity()
    const refetchQueries = [
      {
        query: GET_CITIES,
        variables,
      },
    ]
    const {
      mutate: createCity,
      onDone: onCreateCityDone,
      onError: onCreateCityError,
      loading,
    } = useMutation(CREATE_CITY, {
      refetchQueries,
    })
    const onSave = async () => {
      const validationResult = await validation.validate()
      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }
      createCity({
        input: form.city,
      })
    }
    const onDiscard = () => {
      emit('discard')
    }

    onCreateCityDone(({ data }) => {
      $toast.success('City successfully added!')
      emit('save')
    })
    onCreateCityError((error) => {
      $toast.error(error.message)
    })
    return {
      validation,
      form,
      loading,
      onSave,
      onDiscard,
    }
  },
})
</script>
