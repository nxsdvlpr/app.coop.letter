<template>
  <div class="n-widget py-6 px-6 border border-gray-200 rounded-xl">
    <h4 v-if="title" class="mb-8 label-lg uppercase text-gray-600">
      {{ title }}
    </h4>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NWidget',
  props: {
    title: {
      type: String,
      default: undefined,
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-widget {
  & *:last-child {
    @apply mb-1;
  }
}
</style>
