import {
  reactive,
  computed,
  ref,
  watch,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { assign, defaultsDeep, debounce } from 'lodash'
import useNFormValidation from '@/composables/useNFormValidation'
import useNFormValidators from '@/composables/useNFormValidators'
import { useHelper } from '@/composables'

import { BUILD_LETTER_REF } from '@/graphql/letter/queries/BUILD_LETTER_REF'
import { GET_TAGS } from '@/graphql/letter/queries/GET_TAGS'

export default function useFormLetter() {
  const { currentDate } = useHelper()

  const route = useRoute()

  const { app } = useContext()

  const { required, minLength, maxLength } = useNFormValidators()

  const apolloClient = app.apolloProvider.clients.defaultClient

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

  const categoryOptions = ref([
    {
      label: 'Internal (A)',
      value: 'A',
    },
    {
      label: 'External (B)',
      value: 'B',
    },
    {
      label: 'Foreign (F)',
      value: 'F',
    },
  ])

  const letterTypeOptions = ref([
    {
      label: 'Standart',
      value: 'STANDART',
    },
    {
      label: 'Memorandum of Understanding',
      value: 'MOU',
    },
    {
      label: 'PKS',
      value: 'PKS',
    },
  ])

  const defaultData = () => ({
    letter: {
      ref: null,
      publishedDate: currentDate(),
      to: null,
      subject: null,
      attachment: null,
      type: null,
      category: null,
      companyId: null,
      cityId: null,
      authorId: null,
      tags: [],
    },
    category: null,
    type: {
      label: 'Standart',
      value: 'STANDART',
    },
    company: null,
    author: null,
    city: null,
    tmpTag: '',
    tmpTags: [],
  })

  const form = reactive(defaultData())

  const rules = computed(() => {
    return {
      letter: {
        ref: {
          required,
          maxLengthValue: maxLength(30),
        },
        publishedDate: {
          required,
        },
        type: {
          required,
        },
        category: {
          required,
        },
        to: {
          required,
          minLengthValue: minLength(2),
        },
        subject: {
          required,
          minLengthValue: minLength(3),
        },
        authorId: {
          required,
        },
        cityId: {
          required,
        },
        companyId: {
          required,
        },
      },
    }
  })

  const buildRefInput = computed(() => {
    const refNo = route.value.params.letter_id ? form.letter.ref : null
    const matched = refNo ? refNo.match(/^\w\/(\d*)\/.*/i, '$1') : null

    return {
      type: form.letter.type,
      category: form.letter.category,
      companyId: form.letter.companyId,
      refNo: matched ? matched[1] : null,
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

  const handleCustomerTagChange = (value) => {
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

  const handleCategoryChange = (value) => {
    form.letter.category = value?.value || null
  }

  const handleTypeChange = (value) => {
    form.letter.type = value?.value || null
  }

  const handleAuthorChange = (value) => {
    form.letter.authorId = value?.id || null
  }

  const handleCityChange = (value) => {
    form.letter.cityId = value?.id || null
  }

  const handleCompanyChange = (value) => {
    form.letter.companyId = value?.id || null
  }

  const buildLetterRef = async (value) => {
    if (!value.category || !value.companyId) {
      return
    }

    const response = await apolloClient
      .query({
        query: BUILD_LETTER_REF,
        fetchPolicy: 'network-only',
        variables: {
          input: value,
        },
      })
      .then(({ data }) => data && data)

    form.letter.ref = response.buildLetterRef
  }

  watch(() => form.tmpTags, handleCustomerTagChange, {
    immediate: true,
    deep: true,
  })

  watch(() => form.tmpTag, debounce(handleTmpTagsChanged, 250), {
    immediate: true,
    deep: true,
  })

  watch(() => form.category, handleCategoryChange, {
    immediate: true,
    deep: true,
  })

  watch(() => form.type, handleTypeChange, {
    immediate: true,
    deep: true,
  })

  watch(() => form.author, handleAuthorChange, {
    immediate: true,
    deep: true,
  })

  watch(() => form.city, handleCityChange, {
    immediate: true,
    deep: true,
  })

  watch(() => form.company, handleCompanyChange, {
    immediate: true,
    deep: true,
  })

  watch(buildRefInput, buildLetterRef, {
    immediate: true,
    deep: true,
  })

  return {
    form,
    validation,
    autoCompleteTagItems,
    categoryOptions,
    letterTypeOptions,
    onTagsUpdate,
    resetFormData,
    fillFormData,
  }
}
