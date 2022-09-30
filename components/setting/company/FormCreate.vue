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
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import useFormCompany from '@/components/setting/company/useFormCompany'

import { CREATE_COMPANY } from '@/graphql/setting/company/mutations/CREATE_COMPANY'
import { GET_COMPANIES } from '@/graphql/setting/company/queries/GET_COMPANIES'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()
    const { variables } = useNTableCursorRemoteData()
    const { form, validation } = useFormCompany()
    const refetchQueries = [
      {
        query: GET_COMPANIES,
        variables,
      },
    ]
    const {
      mutate: createCompany,
      onDone: onCreateCompanyDone,
      onError: onCreateCompanyError,
      loading,
    } = useMutation(CREATE_COMPANY, {
      refetchQueries,
    })
    const onSave = async () => {
      const validationResult = await validation.validate()
      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }
      createCompany({
        input: form.company,
      })
    }
    const onDiscard = () => {
      emit('discard')
    }

    onCreateCompanyDone(({ data }) => {
      $toast.success('Company successfully added!')
      emit('save')
    })
    onCreateCompanyError((error) => {
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
