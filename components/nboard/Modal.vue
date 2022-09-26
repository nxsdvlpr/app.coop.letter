<template>
  <Transition name="fade">
    <div
      v-if="showing"
      style="background-color: rgba(0, 0, 0, 0.6)"
      :class="
        customCSS.background
          ? customCSS.background
          : 'fixed inset-0 w-full h-screen flex items-center justify-center z-50'
      "
      @click.self="closeIfShown"
    >
      <div
        v-on-clickaway="close"
        :class="
          customCSS.modal
            ? customCSS.modal
            : 'relative max-h-screen w-full max-w-xl bg-white shadow-lg rounded-lg flex'
        "
      >
        <button
          v-if="showClose"
          aria-label="close"
          class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4"
          :class="customCSS.close"
          @click.prevent="close"
        >
          ×
        </button>
        <div class="overflow-auto max-h-screen w-full">
          <div class="border-b border-gray-100 p-3 rounded-t-xl font-medium">
            {{ header }}
          </div>
          <div class="px-4 py-3 md:px-6 md:py-6">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  name: 'NModal',
  mixins: [clickaway],
  props: {
    header: {
      type: String,
      default: 'Confirm Delete',
    },
    showing: {
      required: true,
      type: Boolean,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    backgroundClose: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    customCSS() {
      return {
        ...{
          background: '',
          modal: '',
          close: '',
        },
        ...this.customClass,
      }
    },
  },
  watch: {
    showing(value) {
      if (value) {
        return document.querySelector('body').classList.add('overflow-hidden')
      }
      return document.querySelector('body').classList.remove('overflow-hidden')
    },
  },
  mounted() {
    if (this.showClose) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.close()
        }
      })
    }
  },
  methods: {
    close() {
      document.querySelector('body').classList.remove('overflow-hidden')
      this.$emit('close')
    },
    closeIfShown() {
      if (this.showClose && this.backgroundClose) {
        this.close()
      }
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
