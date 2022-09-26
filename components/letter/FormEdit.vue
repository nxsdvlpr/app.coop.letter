<template>
  <NForm @submit="onSave">
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic information letter."
    >
      <NColumn>
        <NInputGroup :feedback="validation.error('letter.city')" label="City">
          <NInput v-model.trim="form.letter.city" type="text" />
        </NInputGroup>

        <NInputGroup
          label="Published Date"
          :feedback="validation.error('letter.publishedDate')"
        >
          <NDatepicker
            v-model="form.letter.publishedDate"
            :masks="{
              input: 'DD MMMM YYYY',
            }"
          />
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('letter.destination')"
          label="Destination"
        >
          <NInput v-model.trim="form.letter.destination" type="text" />
        </NInputGroup>

        <NInputGroup
          :feedback="validation.error('letter.subject')"
          label="Subject"
        >
          <NInput v-model.trim="form.letter.subject" type="text" />
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup label="Tags">
          <NInputTag
            v-model="form.tmpTag"
            placeholder=""
            :autocomplete-min-length="1"
            :tags="form.tmpTags"
            :autocomplete-items="autoCompleteTagItems"
            :add-only-from-autocomplete="false"
            @tags-changed="onTagsUpdate"
          />
        </NInputGroup>
      </NColumn>
    </NFormSection>

    <NFormAction :loading="loading" @discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import useFormLetter from '@/components/letter/composables/useFormLetter'

import { UPDATE_LETTER } from '@/graphql/letter/mutations/UPDATE_LETTER'
import { GET_LETTERS } from '@/graphql/letter/queries/GET_LETTERS'
import { GET_LETTER } from '@/graphql/letter/queries/GET_LETTER'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation, autoCompleteTagItems, onTagsUpdate } =
      useFormLetter()

    const refetchQueries = [
      {
        query: GET_LETTERS,
        variables,
      },
      {
        query: GET_LETTER,
        variables: {
          id: route.value.params.letter_id,
        },
      },
    ]

    const { onResult: onResultLetter } = useQuery(GET_LETTER, {
      id: route.value.params.letter_id,
    })

    const {
      mutate: updateLetter,
      onDone: onUpdateLetterDone,
      onError: onUpdateLetterError,
      loading,
    } = useMutation(UPDATE_LETTER, {
      refetchQueries,
    })

    onResultLetter(({ data }) => {
      if (!data || !data.letter) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, __typename, ...result } = data.letter

      form.tmpTags = data.letter.tags.map((tag) => ({
        value: tag.id,
        text: tag.label,
        tiClasses: ['ti-valid'],
      }))

      form.letter = result
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateLetter({
        input: {
          id: route.value.params.letter_id,
          update: form.letter,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onUpdateLetterDone(({ data }) => {
      $toast.success('Letter successfully updated!')
      emit('save')
    })

    onUpdateLetterError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      autoCompleteTagItems,
      onTagsUpdate,
      onSave,
      onDiscard,
    }
  },
})
</script>
