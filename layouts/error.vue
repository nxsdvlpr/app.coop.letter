<template>
  <div class="flex error-page">
    <div class="m-auto text-center max-w-xl">
      <div v-if="error.statusCode === 404">
        <div class="font-bold text-secondary text-7xl">
          {{ error.statusCode }}
        </div>
        <div class="mb-4 text-center text-xl font-bold">
          Oops, you found our 404 page
        </div>
        <div class="mb-4 text-gray-500">
          This is not a fault, just an accident that was not intentional.
          However, we doubt that this is the page you're looking for and we
          apologize profusely for it.
        </div>
      </div>
      <div v-else-if="error.statusCode === 403">
        <div class="font-bold text-info-dark text-7xl">
          {{ error.statusCode }}
        </div>
        <div class="mb-4 text-center text-xl font-bold">
          Oops, that's an error
        </div>
        <div class="mb-4 text-gray-500">
          We're sorry but you do not have access to this page. That’s all we
          know.
        </div>
      </div>
      <div v-else>
        <div class="font-bold text-danger text-7xl">
          {{ error.statusCode }}
        </div>
        <div class="mb-4 text-center text-xl font-bold">An error occurred</div>
        <div class="mb-4 text-gray-500">
          {{ error.message }}
        </div>
      </div>

      <div>
        <NButton class="outline" @click="$router.push('/dashboard')">
          Back to Home
        </NButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
.error-page {
  height: calc(100vh - 140px);
}
</style>
