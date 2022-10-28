<template>
  <NForm @submit="onSave">
    <NInputGroup :feedback="validation.error('city.name')" label="Name">
      <NInput v-model.trim="form.city.name" type="text" />
    </NInputGroup>

    <NFormAction :loading="loading" @discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import useFormCity from '@/components/setting/city/useFormCity'

import { UPDATE_CITY } from '@/graphql/setting/city/mutations/UPDATE_CITY'
import { GET_CITIES } from '@/graphql/setting/city/queries/GET_CITIES'
import { GET_CITY } from '@/graphql/setting/city/queries/GET_CITY'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation } = useFormCity()

    const refetchQueries = [
      {
        query: GET_CITIES,
        variables,
      },
      {
        query: GET_CITY,
        variables: {
          id: route.value.params.city_id,
        },
      },
    ]

    const { onResult: onResultCity } = useQuery(GET_CITY, {
      id: route.value.params.city_id,
    })

    const {
      mutate: updateCity,
      onDone: onUpdateCityDone,
      onError: onUpdateCityError,
      loading,
    } = useMutation(UPDATE_CITY, {
      refetchQueries,
    })

    onResultCity(({ data }) => {
      if (!data || !data.city) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.city
      form.city = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateCity({
        input: {
          id: route.value.params.city_id,
          update: form.city,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onUpdateCityDone(({ data }) => {
      $toast.success('City successfully updated!')
      emit('save')
    })

    onUpdateCityError((error) => {
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
