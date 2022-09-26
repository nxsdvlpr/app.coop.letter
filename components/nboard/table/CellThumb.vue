<template>
  <div class="flex items-center n-table-cell-thumb">
    <div class="mr-6 md:hidden">
      <NThumbnail :src="src" />
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NTableCellThumb',
  props: {
    src: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped>
.n-table-cell-thumb {
  /* Thumbnail Shape */
  &.rounded {
    .n-thumbnail {
      @apply rounded-full;
    }
  }
}
</style>
