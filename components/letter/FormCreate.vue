<template>
  <NForm @submit="onSave">
    <NFormSection
      id="meta"
      caption="Meta"
      description="Meta information for letter."
    >
      <NColumn>
        <NInputGroup
          :feedback="validation.error('letter.authorId')"
          label="Author"
        >
          <SettingAuthorSelect v-model="form.author" @loaded="onAuthorLoaded" />
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
        <NInputGroup :feedback="validation.error('letter.type')" label="Type">
          <NSelect v-model="form.type" :options="letterTypeOptions" />
        </NInputGroup>

        <NInputGroup
          :feedback="validation.error('letter.category')"
          label="Category"
        >
          <NSelect v-model="form.category" :options="categoryOptions" />
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('letter.companyId')"
          label="Company"
        >
          <SettingCompanySelect v-model="form.company" />
        </NInputGroup>

        <NInputGroup :feedback="validation.error('letter.cityId')" label="City">
          <SettingCitySelect v-model="form.city" @loaded="onCityLoaded" />
        </NInputGroup>
      </NColumn>

      <NInputGroup :feedback="validation.error('letter.ref')" label="Ref">
        <NInput v-model.trim="form.letter.ref" type="text" />
      </NInputGroup>
    </NFormSection>

    <NFormSection
      id="detail"
      caption="Detail"
      description="Detail information for letter."
    >
      <NColumn>
        <NInputGroup :feedback="validation.error('letter.to')" label="To">
          <NInput v-model.trim="form.letter.to" type="text" />
        </NInputGroup>

        <NInputGroup
          :feedback="validation.error('letter.subject')"
          label="Subject"
        >
          <NInput v-model.trim="form.letter.subject" type="text" />
        </NInputGroup>
      </NColumn>

      <NInputGroup
        :feedback="validation.error('letter.attachment')"
        label="Attachment"
      >
        <NTextarea v-model.trim="form.letter.attachment" />
      </NInputGroup>

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
    const {
      form,
      validation,
      autoCompleteTagItems,
      categoryOptions,
      letterTypeOptions,
      onTagsUpdate,
    } = useFormLetter()

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

    const onCityLoaded = (cities) => {
      form.city = cities.find((city) => city.name.match(/^jakarta/gi))
    }

    const onAuthorLoaded = (authors) => {
      form.author = authors.find((author) => author.name.match(/^liska/gi))
    }

    const onDiscard = () => {
      emit('discard')
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
      autoCompleteTagItems,
      categoryOptions,
      letterTypeOptions,
      onCityLoaded,
      onAuthorLoaded,
      onSave,
      onDiscard,
      onTagsUpdate,
    }
  },
})
</script>
