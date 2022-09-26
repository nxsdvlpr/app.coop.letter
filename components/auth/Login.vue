<template>
  <div class="flex items-center h-screen md:h-full md:p-6 bg-light">
    <div
      class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded shadow-xl"
    >
      <div
        class="h-full md:h-auto flex flex-col items-center overflow-y-auto md:flex-row"
      >
        <div class="w-full h-24 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            src="~/assets/img/login-bg.webp"
            alt="login background"
            class="object-cover w-full h-full"
          />
        </div>
        <div class="flex md:hidden items-center flex-grow">
          <div class="w-full mx-auto text-primary">
            <AppLogo class="h-16" />
          </div>
        </div>
        <div
          class="w-full md:h-auto flex flex-col justify-end items-center md:justify-center p-6 sm:p-12 md:w-1/2"
        >
          <div class="w-full">
            <h1 class="mb-4 text-xl font-semibold text-gray-dark">Login</h1>

            <NForm @submit="onLogin">
              <NInputGroup label="Username">
                <NInput
                  v-model="form.username"
                  type="email"
                  placeholder="username@app.com"
                />
                <div class="text-xs h-2 mt-1 text-danger">
                  {{ validation.error('username') }}
                </div>
              </NInputGroup>
              <NInputGroup label="Password">
                <NInput
                  v-model="form.password"
                  type="password"
                  placeholder="Password"
                />
                <div class="text-xs h-2 mt-1 text-danger">
                  {{ validation.error('password') }}
                </div>
              </NInputGroup>
              <NButton class="primary w-full" :disabled="loading" type="submit">
                Signin
              </NButton>
            </NForm>
            <div class="h-16"></div>
          </div>
          <div class="text-xs text-gray-400">&copy; 2022 - RATA PAY</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, useContext, computed, ref } from '@nuxtjs/composition-api'

import useNFormValidation from '@/composables/useNFormValidation'
import useNFormValidators from '@/composables/useNFormValidators'
import { LOGIN } from '@/graphql/auth/LOGIN'

export default {
  setup(props, { emit }) {
    const { app, $toast, $apolloHelpers } = useContext()

    const client = app.apolloProvider.clients.defaultClient

    const loading = ref(false)

    const form = reactive({
      username: null,
      password: null,
    })

    const { required } = useNFormValidators()

    const rules = computed(() => {
      return {
        username: {
          required,
        },
        password: {
          required,
        },
      }
    })

    const { validation } = useNFormValidation(rules, form)

    const onLogin = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        return false
      }

      loading.value = true

      try {
        const response = await client
          .mutate({
            mutation: LOGIN,
            variables: {
              input: form,
            },
          })
          .then(({ data }) => data && data.login)

        await $apolloHelpers.onLogin(response.accessToken)
        emit('login-success')
        loading.value = false
      } catch (e) {
        if (e.message) {
          $toast.error(e.message.replace('GraphQL error: ', ''))
        }
        loading.value = false
      }
    }

    return {
      onLogin,
      loading,
      validation,
      form,
    }
  },
}
</script>
