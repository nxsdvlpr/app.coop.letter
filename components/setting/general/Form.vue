<template>
  <NForm @submit="onSave">
    <NInputGroup
      v-for="(option, index) in options"
      :key="option.name"
      :label="option.label"
    >
      <NInput
        v-if="option.type === 'varchar'"
        v-model="options[index].value"
        type="text"
      />
      <NInput
        v-else-if="option.type === 'number'"
        v-model.number="options[index].value"
        type="number"
      />
      <NInputCurrency
        v-else-if="option.type === 'currency'"
        v-model.number="options[index].value"
      />
      <NInputTag
        v-else-if="option.type === 'array'"
        v-model="options[index].value"
        :tags="options[index].array"
        @tags-changed="(newTags) => (options[index].array = newTags)"
      />
    </NInputGroup>

    <NFormAction>
      <NButton :disabled="loading" class="primary" type="submit">
        Save
      </NButton>
    </NFormAction>
  </NForm>
</template>

<script>
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'
import { useQuery, useMutation } from '@vue/apollo-composable'

import { UPDATE_OPTIONS } from '@/graphql/setting/general/mutations/UPDATE_OPTIONS'
import { GET_OPTIONS } from '@/graphql/setting/general/queries/GET_OPTIONS'

export default defineComponent({
  setup() {
    const { $toast } = useContext()

    const options = ref([])

    const { onResult: onResultOptions } = useQuery(GET_OPTIONS, {
      paging: {
        first: 50,
      },
    })

    onResultOptions(({ data }) => {
      console.log(data.options)
      options.value = data.options.edges.map(({ node }) => ({
        name: node.name,
        label: node.label,
        value: node.type === 'array' ? '' : node.value,
        type: node.type,
        array:
          node.type === 'array' && node.value
            ? JSON.parse(node.value).map((arr) => ({
                text: arr,
                tiClasses: ['ti-valid'],
              }))
            : undefined,
      }))
    })

    const {
      mutate: updateOptions,
      onDone: onUpdateOptionsDone,
      onError: onUpdateOptionsError,
      loading,
    } = useMutation(UPDATE_OPTIONS, {
      refetchQueries: [
        {
          query: GET_OPTIONS,
          variables: {
            paging: {
              first: 50,
            },
          },
        },
      ],
    })

    const onSave = () => {
      const updatedOptions = JSON.parse(JSON.stringify(options.value))
      updateOptions({
        input: {
          options: updatedOptions.map((option) => {
            if (option.type === 'array') {
              option.value = JSON.stringify(
                option.array.map((arr) => parseInt(arr.text))
              )
              delete option.array
            }

            return option
          }),
        },
      })
    }

    onUpdateOptionsDone(({ data }) => {
      $toast.success('Setting successfully updated!')
    })

    onUpdateOptionsError((error) => {
      $toast.error(error.message)
    })

    return { options, loading, onSave }
  },
})
</script>
