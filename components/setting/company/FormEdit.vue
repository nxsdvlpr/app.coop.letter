<template>
  <NForm @submit="onSave">
    <NInputGroup :feedback="validation.error('company.name')" label="Name">
      <NInput v-model.trim="form.company.name" type="text" />
    </NInputGroup>

    <NInputGroup :feedback="validation.error('company.code')" label="Code">
      <NInput v-model.trim="form.company.code" type="text" />
    </NInputGroup>

    <NFormAction :loading="loading" @discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import useFormCompany from '@/components/setting/company/useFormCompany'

import { UPDATE_COMPANY } from '@/graphql/setting/company/mutations/UPDATE_COMPANY'
import { GET_COMPANIES } from '@/graphql/setting/company/queries/GET_COMPANIES'
import { GET_COMPANY } from '@/graphql/setting/company/queries/GET_COMPANY'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation } = useFormCompany()

    const refetchQueries = [
      {
        query: GET_COMPANIES,
        variables,
      },
      {
        query: GET_COMPANY,
        variables: {
          id: route.value.params.company_id,
        },
      },
    ]

    const { onResult: onResultCompany } = useQuery(GET_COMPANY, {
      id: route.value.params.company_id,
    })

    const {
      mutate: updateCompany,
      onDone: onUpdateCompanyDone,
      onError: onUpdateCompanyError,
      loading,
    } = useMutation(UPDATE_COMPANY, {
      refetchQueries,
    })

    onResultCompany(({ data }) => {
      if (!data || !data.company) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.company
      form.company = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateCompany({
        input: {
          id: route.value.params.company_id,
          update: form.company,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onUpdateCompanyDone(({ data }) => {
      $toast.success('Company successfully updated!')
      emit('save')
    })

    onUpdateCompanyError((error) => {
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
