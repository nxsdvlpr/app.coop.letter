<template>
  <AuthForgotPassword />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'auth',
  async middleware({ app, redirect }) {
    const hasToken = await !!app.$apolloHelpers.getToken()
    if (hasToken) {
      return redirect('/dashboard')
    }
  },
  setup() {}
})
</script>
