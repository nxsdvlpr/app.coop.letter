<template>
  <AuthLogin @login-success="onLoginSuccess" />
</template>

<script>
import {
  defineComponent,
  useRoute,
  useContext,
  useMeta,
  useRouter,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'auth',
  async middleware({ app, redirect }) {
    const hasToken = await !!app.$apolloHelpers.getToken()
    if (hasToken) {
      return redirect('/letter')
    }
  },
  setup() {
    const router = useRouter()

    const route = useRoute()

    const { env } = useContext()

    const onLoginSuccess = () => {
      const redirect = route.value.query.redirect

      if (redirect && redirect !== '/') {
        return router.push(redirect)
      }

      router.push('/letter')
    }

    useMeta({
      title: `Login - ${env.appName}`,
    })

    return {
      onLoginSuccess,
    }
  },
  head: {},
})
</script>
