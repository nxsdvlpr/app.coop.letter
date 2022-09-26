import { reactive, computed, watch } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { assign, defaultsDeep, debounce } from 'lodash'
import useNFormValidation from '@/composables/useNFormValidation'
import useNFormValidators from '@/composables/useNFormValidators'
import { useHelper } from '@/composables'

import { GET_TAGS } from '@/graphql/letter/queries/GET_TAGS'

export default function useFormLetter() {
  const { currentDate } = useHelper()

  const { required, minLength } = useNFormValidators()

  const tagVariables = reactive({
    paging: {
      first: 25,
    },
    query: '%%',
    sorting: {
      field: 'label',
      direction: 'ASC',
    },
  })

  const defaultData = () => ({
    letter: {
      publishedDate: currentDate(),
      city: 'Jakarta',
      destination: null,
      subject: null,
      tags: [],
    },
    tmpTag: '',
    tmpTags: [],
  })

  const form = reactive(defaultData())

  const rules = computed(() => {
    return {
      letter: {
        publishedDate: {
          required,
        },
        destination: {
          required,
          minLengthValue: minLength(2),
        },
        city: {
          required,
          minLengthValue: minLength(2),
        },
        subject: {
          required,
          minLengthValue: minLength(3),
        },
      },
    }
  })

  const { result: resultTags } = useQuery(GET_TAGS, tagVariables, {
    fetchPolicy: 'cache-and-network',
  })

  const autoCompleteTagItems = useResult(resultTags, [], (data) => {
    return data.tags.edges.map((tag) => ({
      value: tag.node.id,
      text: tag.node.label,
    }))
  })

  const { validation } = useNFormValidation(rules, form, {
    $autoDirty: true,
    $lazy: true,
  })

  const fillFormData = (data) => {
    assign(form, defaultsDeep(data, form))
  }

  const resetFormData = () => {
    assign(form, reactive(defaultData()))
  }

  const onTagsUpdate = (newTags) => {
    form.tmpTags = newTags
  }

  const handleCustomerTag = (value) => {
    form.letter.tags = value.map((item) => ({
      id: item.value || null,
      label: item.text,
    }))
  }

  const handleTmpTagsChanged = (value) => {
    if (form.tmpTag.length >= 2) {
      tagVariables.query = `%${value}%`
    }
  }

  watch(() => form.tmpTags, handleCustomerTag, {
    immediate: true,
    deep: true,
  })

  watch(() => form.tmpTag, debounce(handleTmpTagsChanged, 250), {
    immediate: true,
    deep: true,
  })

  return {
    form,
    validation,
    autoCompleteTagItems,
    onTagsUpdate,
    resetFormData,
    fillFormData,
  }
}
