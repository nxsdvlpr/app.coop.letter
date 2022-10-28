<template>
  <NSelect
    placeholder="Choose Author"
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
import { GET_AUTHORS } from '@/graphql/setting/author/queries/GET_AUTHORS'

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
        field: 'name',
        direction: 'ASC',
      },
    })

    const { result } = useQuery(GET_AUTHORS, variables, {
      fetchPolicy: 'cache-and-network',
    })

    const options = useResult(result, [], (data) => {
      const authors = data.authors.edges.map((item) => item.node)
      emit('loaded', authors)
      return authors
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
