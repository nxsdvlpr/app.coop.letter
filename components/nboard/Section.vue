<template>
  <div class="mb-6 md:mb-8 n-section">
    <div
      v-if="caption !== '' || description !== ''"
      class="flex-shrink-0 text-gray-base n-section-caption"
    >
      <slot name="caption">
        <h3 class="text-gray-dark text-lg font-medium">
          {{ caption }}
        </h3>
        <p class="text-xs">{{ description }}</p>
      </slot>
      <slot name="after-caption"> </slot>
    </div>
    <div class="flex flex-col flex-grow mt-6 n-section-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    caption: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>
