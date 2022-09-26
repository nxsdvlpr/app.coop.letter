<template>
  <NForm @submit="onSave">
    <NFormSection id="overview" caption="Overview" description="Basic information letter.">
      <NInputGroup :feedback="validation.error('letter.subject')" label="Subject">
        <NInput v-model.trim="form.letter.subject" type="text" />
      </NInputGroup>
    </NFormSection>

    <NFormAction :loading="loading" @discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import useFormLetter from '@/components/letter/composables/useFormLetter'

import { CREATE_LETTER } from '@/graphql/letter/mutations/CREATE_LETTER'
import { GET_LETTERS } from '@/graphql/letter/queries/GET_LETTERS'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()
    const { variables } = useNTableCursorRemoteData()
    const { form, validation } = useFormLetter()

    const refetchQueries = [
      {
        query: GET_LETTERS,
        variables,
      },
    ]

    const {
      mutate: createLetter,
      onDone: onCreateLetterDone,
      onError: onCreateLetterError,
      loading,
    } = useMutation(CREATE_LETTER, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()
      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createLetter({
        input: form.letter,
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    const onImageChanged = (file) => {
      form.letter.image = file.url
    }

    onCreateLetterDone(({ data }) => {
      $toast.success('Letter successfully added!')
      emit('save')
    })

    onCreateLetterError((error) => {
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
