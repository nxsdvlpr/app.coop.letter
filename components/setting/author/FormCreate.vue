<template>
  <NForm @submit="onSave">
    <NInputGroup :feedback="validation.error('author.name')" label="Name">
      <NInput v-model.trim="form.author.name" type="text" />
    </NInputGroup>

    <NFormAction :loading="loading" @discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import useFormAuthor from '@/components/setting/author/useFormAuthor'

import { CREATE_AUTHOR } from '@/graphql/setting/author/mutations/CREATE_AUTHOR'
import { GET_AUTHORS } from '@/graphql/setting/author/queries/GET_AUTHORS'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()
    const { variables } = useNTableCursorRemoteData()
    const { form, validation } = useFormAuthor()
    const refetchQueries = [
      {
        query: GET_AUTHORS,
        variables,
      },
    ]
    const {
      mutate: createAuthor,
      onDone: onCreateAuthorDone,
      onError: onCreateAuthorError,
      loading,
    } = useMutation(CREATE_AUTHOR, {
      refetchQueries,
    })
    const onSave = async () => {
      const validationResult = await validation.validate()
      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }
      createAuthor({
        input: form.author,
      })
    }
    const onDiscard = () => {
      emit('discard')
    }

    onCreateAuthorDone(({ data }) => {
      $toast.success('Author successfully added!')
      emit('save')
    })
    onCreateAuthorError((error) => {
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
