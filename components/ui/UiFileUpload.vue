<template>
  <div class="flex items-center">
    <file-upload
      :ref="name"
      :input-id="name"
      class="cursor-pointer flex-shrink-0"
      :extensions="extensions"
      :accept="accept"
      name="file"
      :multiple="false"
      :post-action="uploadEndpoint + path"
      :value="files"
      :headers="headers"
      :data="options"
      @input="updateValue"
    >
      <NButton class="outline" :disabled="$refs[name] && $refs[name].active">
        {{ $refs[name] && $refs[name].active ? 'Uploading...' : 'Browse...' }}
      </NButton>
    </file-upload>
    <span v-if="error" class="text-danger ml-2 text-xs">
      Error: {{ error }}
    </span>
    <div v-if="resultFile" class="flex items-center justify-center ml-2">
      <div class="inline-flex">
        <NIcon icon="document" class="xs text-gray-500" />
      </div>
      <div class="line-clamp-1">
        <a
          v-tooltip="tooltip"
          :href="resultFile"
          class="text-secondary ml-1 text-xs hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ shortFilename }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { truncate } from 'lodash'

export default defineComponent({
  components: {
    FileUpload,
  },
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
    path: {
      type: String,
      default: '/',
    },
    src: {
      type: String,
      default: null,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    name: {
      type: String,
      default: 'fileUpload',
    },
    extensions: {
      type: String,
      default: 'doc,docx,pdf,csv,xls,xlsx,ppt,pptx',
    },
    accept: {
      type: String,
      default:
        'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation',
    },
  },
  setup(props, { emit }) {
    const files = ref([])

    const resultFile = ref(null)

    const { env, $apolloHelpers } = useContext()

    const uploadEndpoint = env.uploadEndpoint

    const { refs } = getCurrentInstance()

    const token = $apolloHelpers.getToken()

    const headers = { authorization: `Bearer ${token}` }

    const source = computed(() => props.src)

    const file = computed(() => files.value[0] || {})

    const filename = computed(() => {
      if (resultFile.value) {
        return decodeURIComponent(
          resultFile.value.substring(resultFile.value.lastIndexOf('/') + 1)
        )
      }
    })

    const shortFilename = computed(() => {
      return truncate(filename.value, { length: 24 })
    })

    const tooltip = computed(() => {
      return {
        html: true,
        trigger: 'hover click focus',
        content: `
              <div class="px-1 py-1 text-2xs text-gray-500">
                ${filename.value}
              </div>
            `,
      }
    })

    const error = computed(() => {
      if (!file.value.error) {
        return false
      }
      return file.value.error || false
    })

    watch(file, (value) => {
      if (value.success) {
        emit('file-changed', value.response)
      }
    })

    watch(
      source,
      (value) => {
        resultFile.value = value
      },
      { immediate: true }
    )

    const updateValue = (value) => {
      files.value = value
      if (!value[0]) {
        return false
      }
      refs[props.name].active = true
    }

    return {
      resultFile,
      files,
      filename,
      shortFilename,
      tooltip,
      error,
      headers,
      uploadEndpoint,
      updateValue,
    }
  },
})
</script>
