<template>
  <div
    class="n-upload bg-app-light"
    :class="{
      'border rounded-md': files.length,
    }"
  >
    <div v-if="files.length" class="flex items-center mx-4 my-2 space-x-2">
      <div class="flex-grow-0">
        <NButton type="button" class="sm danger" @click="removeFiles">
          Clear
        </NButton>
      </div>
      <div class="flex-grow text-center text-xs">
        {{ files.length }} {{ files.length > 1 ? 'files' : 'file' }} selected
      </div>
      <div class="flex-grow-0">
        <NButton type="button" class="sm outline" @click="openFileDialog">
          Add {{ multiple ? 'more' : 'file' }}
        </NButton>
      </div>
    </div>
    <div
      class="text-center"
      :class="{
        'h-44 min-h-full border border-dashed rounded': !files.length,
        'border-t border-b': files.length,
      }"
    >
      <NScrollbar
        v-if="files.length"
        :options="{ scrollbars: { autoHide: 'scroll' } }"
        class="h-52"
      >
        <draggable
          v-model="files"
          class="files grid p-2 grid-cols-3 gap-3 md:grid-cols-4 md:gap-4"
          group="files"
          draggable=".files-item"
          @start="drag = true"
          @end="drag = false"
        >
          <div
            v-for="file in files"
            :key="file.id"
            class="files-item border rounded h-28 w-28 relative"
          >
            <img
              v-if="file.thumb"
              class="object-cover object-center w-full h-full text-transparent cursor-pointer"
              :src="file.thumb"
            />

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              class="fill-current h-20 mx-auto"
            >
              <path fill="#90CAF9" d="M40 45H8V3h22l10 10z" />
              <path fill="#E1F5FE" d="M38.5 14H29V4.5z" />
              <g fill="#1976D2">
                <path
                  d="M16 21h17v2H16zM16 25h13v2H16zM16 29h17v2H16zM16 33h13v2H16z"
                />
              </g>
            </svg>

            <div
              :class="{
                'text-gray-200': file.thumb,
                'text-gray-500': !file.thumb,
              }"
              class="absolute bottom-1 w-full px-2 text-gray-200 text-center text-xs"
            >
              <div class="truncate filter drop-shadow-xl">
                <a
                  v-if="file.response.url"
                  :href="file.response.url"
                  class="ml-1 text-xxs hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ file.name }}
                </a>
                <span v-else class="ml-1 text-xxs">{{ file.name }}</span>
              </div>

              <div v-if="file.size" class="text-xs">
                {{ formatSize(file.size) }}
              </div>
            </div>

            <div
              class="w-2 h-2 rounded-full absolute top-1 left-1 border"
              :title="file.error"
              :class="{
                'bg-gray-300': !file.active && file.error !== '',
                'bg-info': file.active,
                'bg-success': file.success,
                'bg-danger': file.error !== '',
              }"
            ></div>
            <div
              class="w-5 h-5 rounded absolute top-1 right-1 cursor-pointer"
              @click="removeFile(file)"
            >
              <NIcon icon="delete" class="text-danger xs" />
            </div>
          </div>
        </draggable>
      </NScrollbar>
      <div v-else>
        <div
          class="flex content-center items-center text-xs text-center cursor-pointer h-44"
          @click.stop="openFileDialog"
        >
          <div class="w-full">
            Drop files anywhere to upload or
            <label class="text-secondary" for="file">click here</label>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="files.length"
      class="flex items-center justify-between mx-4 my-2"
    >
      <div :class="!autoUpload ? 'visible' : 'invisible'">
        <NButton
          v-if="!$refs[name] || !$refs[name].active"
          type="button"
          class="sm success"
          :disabled="
            $refs[name] && $refs[name].uploaded && unUploadedFiles.length === 0
          "
          @click.prevent="$refs[name].active = true"
        >
          Upload {{ unUploadedFiles.length }}
          {{ unUploadedFiles.length > 1 ? 'files' : 'file' }}
        </NButton>
        <NButton
          v-else
          type="button"
          class="sm danger"
          @click.prevent="$refs[name].active = false"
        >
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </NButton>
      </div>
      <div
        v-if="
          $refs[name] && $refs[name].uploaded && unUploadedFiles.length === 0
        "
        class="text-xs"
      >
        All files have been uploaded
      </div>
      <div v-if="$refs[name] && $refs[name].active" class="text-xs">
        Uploading {{ unUploadedFiles.length }}
        {{ unUploadedFiles.length > 1 ? 'files' : 'file' }}...
      </div>
    </div>

    <file-upload
      v-show="false"
      :id="name"
      :ref="name"
      v-model="files"
      :input-id="name"
      :post-action="endpoint"
      :drop="true"
      :drop-directory="true"
      :extensions="extensions"
      :accept="accept"
      :headers="headers"
      :multiple="multiple"
      :size="1024 * 1024 * 15"
      :thread="thread"
      @input-filter="inputFilter"
      @input-file="inputFile"
      @input="updateValue"
    >
    </file-upload>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import FileUpload from 'vue-upload-component'

export default {
  name: 'NFileUpload',
  components: {
    draggable,
    FileUpload,
  },
  inheritAttrs: false,
  props: {
    size: {
      type: Number,
      default: 1024 * 1024 * 15,
    },
    thread: {
      type: Number,
      default: 4,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    endpoint: {
      type: String,
      default: undefined,
    },
    extensions: {
      type: [String, Array, RegExp],
      default: undefined,
    },
    accept: {
      type: String,
      default: undefined,
    },
    autoUpload: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Object,
      default: () => ({}),
    },
    name: {
      type: String,
      default: 'fileUpload',
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    files: [],
  }),
  computed: {
    unUploadedFiles() {
      return this.files.filter((file) => !file.success)
    },
    computedValue() {
      return this.value
    },
  },
  watch: {
    files: {
      immediate: true,
      handler() {
        const uploadedFiles = this.files
          .filter((file) => file.success)
          .map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
            ext: file.name.split('.').pop(),
            url: file.response.url,
          }))

        this.$emit('upload-done', uploadedFiles)
      },
    },
    computedValue: {
      immediate: true,
      handler(value) {
        this.files = value.map((file) => ({
          fileObject: true,
          size: file.size,
          name: file.name,
          type: file.type,
          active: false,
          error: '',
          success: true,
          postAction: this.endpoint,
          timeout: 0,
          file: {},
          response: {
            url: file.url,
          },
          progress: '100.00',
          speed: 948224,
          data: {},
          headers: {},
          id: file.id,
          blob: file.url,
          thumb: file.type.substr(0, 6) === 'image/' ? file.url : null,
          xhr: {},
        }))
      },
    },
  },
  methods: {
    openFileDialog() {
      try {
        this.$refs[this.name].$el.lastChild.click()
      } catch (error) {
        console.log(error)
      }
    },
    removeFiles() {
      this.$refs[this.name].clear()
    },
    removeFile(file) {
      this.$refs[this.name].remove(file)
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }

        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }

        if (
          newFile &&
          newFile.error === '' &&
          newFile.file &&
          (!oldFile || newFile.file !== oldFile.file)
        ) {
          // Create a blob field
          newFile.blob = null
          const URL = window.URL || window.webkitURL
          if (URL) {
            newFile.blob = URL.createObjectURL(newFile.file)
          }
          // Thumbnails
          newFile.thumb = null
          if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
            newFile.thumb = newFile.blob
          }
        }
      }
    },
    inputFile(newFile, oldFile) {
      // if (newFile && !oldFile) {
      //   console.log('add', newFile)
      // }
      if (newFile && oldFile) {
        // console.log('update', newFile)

        // Start upload
        if (newFile.active !== oldFile.active) {
          if (newFile.active) {
            console.log('Start upload', newFile.active, newFile.name)
          }
        }

        // Upload progress
        if (newFile.progress !== oldFile.progress) {
          // console.log('progress', newFile.progress, newFile.name)
        }

        // Upload error
        if (newFile.error !== oldFile.error) {
          // console.log('error', newFile.error, newFile)
        }

        // Uploaded successfully
        if (newFile.success !== oldFile.success) {
          // console.log('success', newFile.success, newFile)
        }
      }

      // if (!newFile && oldFile) {
      //   console.log('remove', oldFile)
      // }
    },
    formatSize(bytes, decimal) {
      const k = 1024
      const decimals = typeof decimal === 'undefined' ? 2 : decimal
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      if (bytes === 0) return '0 bytes'
      return Math.round(bytes / Math.pow(k, i), decimals) + ' ' + sizes[i]
    },
    updateValue(value) {
      if (!value[0]) {
        return false
      }

      if (this.autoUpload) {
        this.$refs[this.name].active = true
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-upload {
  .text-shadow {
    text-shadow: 1px 1px #aaa;
  }
}
</style>
