<template>
  <div class="flex items-center">
    <file-upload
      :ref="name"
      :input-id="name"
      class="cursor-pointer"
      extensions="jpg,jpeg,png"
      accept="image/png,image/jpeg"
      name="file"
      :multiple="false"
      :post-action="uploadEndpoint + path"
      :value="files"
      :headers="headers"
      :data="options"
      @input="updateValue"
    >
      <NAvatar v-if="rounded" :src="image" class="xxl" />
      <NThumbnail v-else :src="image" class="xxl" />
    </file-upload>
    <span
      v-if="$refs[name] && $refs[name].active"
      class="text-gray-500 ml-2 text-xs"
    >
      Uploading...
    </span>
    <span v-else-if="error" class="text-danger ml-2 text-xs">
      Error: {{ error }}
    </span>
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
      default: 'imageUpload',
    },
  },
  setup(props, { emit }) {
    const files = ref([])

    const image = ref(null)

    const { env, $apolloHelpers } = useContext()

    const uploadEndpoint = env.uploadEndpoint

    const { refs } = getCurrentInstance()

    const token = $apolloHelpers.getToken()

    const headers = { authorization: `Bearer ${token}` }

    const source = computed(() => props.src)

    const file = computed(() => files.value[0] || {})

    const error = computed(() => {
      if (!file.value.error) {
        return false
      }
      return file.value.error || false
    })

    watch(file, (value) => {
      if (value.success) {
        emit('image-changed', value.response)
      }
    })

    watch(
      source,
      (value) => {
        image.value = value
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
      files,
      image,
      error,
      file,
      headers,
      uploadEndpoint,
      updateValue,
    }
  },
})
</script>
