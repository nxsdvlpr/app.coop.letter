<template>
  <NSelect
    placeholder="Choose Company"
    :value="value"
    :disabled="disabled"
    :get-option-label="(option) => option.name"
    :get-option-key="(option) => option.id"
    :options="options"
    :filterable="false"
    :clearable="clearable"
    @option:selected="onSelected"
    @search="onSearch"
    @input="onInput"
  />
</template>

<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { debounce } from 'lodash'
import { GET_COMPANIES } from '@/graphql/setting/company/queries/GET_COMPANIES'

export default defineComponent({
  props: {
    value: {
      type: [Object, String],
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const variables = reactive({
      query: undefined,
      paging: {
        first: 25,
      },
      sorting: {
        field: 'id',
        direction: 'DESC',
      },
    })

    const { result } = useQuery(GET_COMPANIES, variables, {
      fetchPolicy: 'cache-and-network',
    })

    const options = useResult(result, [], (data) => {
      return data.companies.edges.map((item) => item.node)
    })

    const onInput = (value) => {
      emit('input', value)
    }

    const onSelected = (value) => {
      emit('selected', value)
    }

    const onSearch = debounce((query, loading) => {
      variables.query = `%${query}%`
    }, 250)

    return {
      options,
      onInput,
      onSelected,
      onSearch,
    }
  },
})
</script>
