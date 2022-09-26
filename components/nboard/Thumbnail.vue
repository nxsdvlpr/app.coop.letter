<template>
  <div class="n-thumbnail overflow-hidden rounded-sm inline-block">
    <div v-if="!imageSource" class="w-full h-full bg-gray-300"></div>
    <img
      v-else-if="preview"
      v-img="{ group: preview.group, title: preview.title }"
      :src="imageSource"
      :alt="'Image source:' + src"
      class="object-cover object-center w-full h-full text-transparent"
    />
    <img
      v-else
      :src="imageSource"
      :alt="'Image source:' + src"
      class="object-cover object-center w-full h-full text-transparent"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import VueImg from 'v-img'

Vue.use(VueImg)

export default {
  name: 'NThumbnail',
  props: {
    src: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: 'md',
    },
    preview: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    imageSource() {
      return this.src
    },
  },
}
</script>

<style scoped>
.n-thumbnail {
  /* Shape */
  &.rounded {
    @apply rounded-full;
  }

  /* Size */
  @apply w-12;
  @apply h-12;

  &.xs {
    @apply w-8;
    @apply h-8;
  }

  &.sm {
    @apply w-10;
    @apply h-10;
  }

  &.lg {
    @apply w-14;
    @apply h-14;
  }

  &.xl {
    @apply w-16;
    @apply h-16;
  }

  &.xxl {
    @apply w-20;
    @apply h-20;
  }
}
</style>
