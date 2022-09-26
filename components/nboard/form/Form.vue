<template>
  <form class="n-form" @submit="submit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'NForm',

  methods: {
    submit(e) {
      this.$emit('submit')
      return e.preventDefault()
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-form {
  :deep() .n-form-section {
    @apply mt-8 md:mt-12;

    &:first-child {
      @apply mt-0;
    }
  }
}
</style>
