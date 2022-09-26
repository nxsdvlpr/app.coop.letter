<template>
  <div class="flex items-center min-h-screen p-6 bg-light">
    <div
      class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded shadow-xl"
    >
      <div class="flex flex-col overflow-y-auto md:flex-row">
        <div class="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            src="~/assets/img/forgot-bg.jpg"
            alt="Office"
            class="object-cover w-full h-full"
          />
        </div>
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div class="w-full">
            <h1 class="mb-4 text-xl font-semibold text-gray-dark">
              Recovery Password
            </h1>

            <NForm>
              <NInputGroup label="Email">
                <NInput
                  v-model="form.username"
                  type="email"
                  placeholder="username@app.com"
                />
              </NInputGroup>

              <NButton class="info w-full"> Recover password </NButton>
            </NForm>
            <p class="mt-4">
              <nuxt-link
                to="/auth/login"
                class="text-xs font-medium text-secondary-dark hover:underline"
              >
                Signin
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(props, { emit }) {
    const form = reactive({
      username: '',
    })

    return {
      form,
    }
  },
})
</script>
