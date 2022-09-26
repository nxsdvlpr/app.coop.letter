<template>
  <div class="flex justify-end text-right gap-x-3 n-form-action">
    <slot>
      <NButton
        class="outline"
        type="button"
        :disabled="loading"
        @click="$emit('discard')"
      >
        Discard
      </NButton>
      <NButton
        class="primary"
        type="submit"
        :disabled="loading"
        @click="$emit('save')"
      >
        Save
      </NButton>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'NFormAction',
  props: {
    loading: { type: Boolean, default: false },
  },
}
</script>

<style lang="postcss" scoped>
.n-form-action {
  @apply pt-4;
  @apply pb-8;

  &.compact {
    @apply pt-0;
    @apply pb-0;
  }
}
</style>
