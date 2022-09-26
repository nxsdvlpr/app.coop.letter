<template>
  <NFormSection
    :id="section"
    :caption="section.charAt(0).toUpperCase() + section.slice(1)"
    :description="`Basic ${section} information`"
  >
    <NInputGroup
      v-for="(option, index) in options"
      :key="option.name"
      :label="option.name.replace('_', ' ')"
    >
      <div class="w-full">
        <NInput
          v-if="option.type === 'varchar'"
          v-model="options[index].value"
          type="text"
        />
        <NTextarea
          v-else-if="option.type === 'text'"
          v-model="options[index].value"
        />
      </div>
      <UiImageUpload
        v-if="option.type === 'image'"
        path="/general/"
        :src="options[index].value"
        :options="{ overwrite: true, public_id: 'favicon' }"
        @image-changed="onImageChanged($event, index)"
      />
    </NInputGroup>

    <NFormAction>
      <NButton :disabled="loading" class="primary" @click="onSave">
        Save
      </NButton>
    </NFormAction>
  </NFormSection>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { useQuery, useMutation } from '@vue/apollo-composable'

import { GET_OPTIONS } from '@/graphql/setting/general/queries/GET_OPTIONS'
import { UPDATE_OPTIONS } from '@/graphql/setting/general/mutations/UPDATE_OPTIONS'

export default defineComponent({
  props: {
    section: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { $toast } = useContext()

    const displayLanguage = ref('ID')

    const options = ref([])

    const { onResult: onResultOptions } = useQuery(GET_OPTIONS, {
      section: `${props.section}_%`,
      paging: {
        first: 50,
      },
    })

    onResultOptions(({ data }) => {
      options.value = data.options.edges.map(({ node }) => ({
        name: node.name,
        value: node.value,
        type: node.type,
      }))
    })

    const refetchQueries = [
      {
        query: GET_OPTIONS,
        variables: {
          section: `${props.section}_%`,
          paging: {
            first: 50,
          },
        },
      },
    ]

    const {
      mutate: updateOptions,
      onDone: onUpdateOptionsDone,
      onError: onUpdateOptionsError,
      loading,
    } = useMutation(UPDATE_OPTIONS, {
      refetchQueries,
    })

    const onSave = () => {
      updateOptions({
        input: {
          options: options.value,
        },
      })
    }

    const onImageChanged = (file, index) => {
      console.log(file)
      options.value[index].value = file.url
    }

    onUpdateOptionsDone(({ data }) => {
      $toast.success('Setting successfully updated!')
      emit('save')
    })

    onUpdateOptionsError((error) => {
      $toast.error(error.message)
    })

    return {
      onSave,
      options,
      displayLanguage,
      loading,
      onImageChanged,
    }
  },
})
</script>
