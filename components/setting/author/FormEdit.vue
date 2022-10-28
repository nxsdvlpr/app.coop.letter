<template>
  <NForm @submit="onSave">
    <NInputGroup :feedback="validation.error('author.name')" label="Name">
      <NInput v-model.trim="form.author.name" type="text" />
    </NInputGroup>

    <NFormAction :loading="loading" @discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import useFormAuthor from '@/components/setting/author/useFormAuthor'

import { UPDATE_AUTHOR } from '@/graphql/setting/author/mutations/UPDATE_AUTHOR'
import { GET_AUTHORS } from '@/graphql/setting/author/queries/GET_AUTHORS'
import { GET_AUTHOR } from '@/graphql/setting/author/queries/GET_AUTHOR'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation } = useFormAuthor()

    const refetchQueries = [
      {
        query: GET_AUTHORS,
        variables,
      },
      {
        query: GET_AUTHOR,
        variables: {
          id: route.value.params.author_id,
        },
      },
    ]

    const { onResult: onResultAuthor } = useQuery(GET_AUTHOR, {
      id: route.value.params.author_id,
    })

    const {
      mutate: updateAuthor,
      onDone: onUpdateAuthorDone,
      onError: onUpdateAuthorError,
      loading,
    } = useMutation(UPDATE_AUTHOR, {
      refetchQueries,
    })

    onResultAuthor(({ data }) => {
      if (!data || !data.author) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.author
      form.author = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateAuthor({
        input: {
          id: route.value.params.author_id,
          update: form.author,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onUpdateAuthorDone(({ data }) => {
      $toast.success('Author successfully updated!')
      emit('save')
    })

    onUpdateAuthorError((error) => {
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
