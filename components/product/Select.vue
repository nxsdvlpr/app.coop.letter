<template>
  <NSelect
    placeholder="Choose Product"
    :value="value"
    :disabled="disabled"
    :get-option-label="(option) => option.title"
    :get-option-key="(option) => option.id"
    :options="options"
    :filterable="false"
    :clearable="clearable"
    @option:selected="onSelected"
    @search="onSearch"
    @input="onInput"
  >
    <template #selected-option="{ image, title, price }">
      <div class="py-2 flex items-center">
        <div class="inline-flex flex-shrink-0 mr-2">
          <NThumbnail :src="image" />
        </div>
        <div class="flex flex-col w-full ml-2">
          <span class="text-md font-medium leading-tight">{{ title }}</span>
          <span class="text-xs leading-tight tracking-wide">
            {{ $__.currency(price) }}
          </span>
        </div>
      </div>
    </template>

    <template #option="{ image, title, price }">
      <div class="py-2 flex items-center">
        <div class="inline-flex flex-shrink-0 mr-2">
          <NThumbnail :src="image" />
        </div>
        <div class="flex flex-col w-96 ml-2">
          <span class="text-md leading-tight">{{ title }}</span>
          <span
            class="mt-1 text-xs leading-tight text-gray-base overflow-hidden overflow-ellipsis"
          >
            {{ $__.currency(price) }}
          </span>
        </div>
      </div>
    </template>
  </NSelect>
</template>

<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { debounce } from 'lodash'
import { GET_ACTIVE_PRODUCTS } from '@/graphql/product/queries/GET_ACTIVE_PRODUCTS'

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

    const { result } = useQuery(GET_ACTIVE_PRODUCTS, variables, {
      fetchPolicy: 'cache-and-network',
    })

    const options = useResult(result, [], (data) => {
      return data.products.edges.map((item) => item.node)
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
