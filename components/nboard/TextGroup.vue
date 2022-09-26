<template>
  <div class="n-text-group">
    <div class="mt-3 md:mt-0 label-sm md:label-lg uppercase n-text-group-label">
      {{ label }}
    </div>
    <div class="mt-2 n-text-group-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
