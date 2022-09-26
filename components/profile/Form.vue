<template>
  <NForm @submit="onSave">
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic profile information"
    >
      <NColumn>
        <NInputGroup :feedback="validation.error('profile.name')" label="Name">
          <NInput v-model="form.profile.name" type="text" />
        </NInputGroup>

        <NInputGroup
          :feedback="validation.error('profile.username')"
          label="Username"
        >
          <NInput v-model="form.profile.username" type="text" />
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('profile.phone')"
          label="Phone"
        >
          <NInput v-model="form.profile.phone" type="text" />
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('profile.password')"
          label="Password"
        >
          <NInput v-model="form.profile.password" type="password" />
          <span class="text-xs text-gray-base">
            Leave blank if you don't want to change it
          </span>
        </NInputGroup>
        <NInputGroup
          :feedback="validation.error('confirmPassword')"
          label="Confirm Password"
        >
          <NInput v-model="form.confirmPassword" type="password" />
        </NInputGroup>
      </NColumn>

      <NInputGroup
        :feedback="validation.error('profile.avatar')"
        label="Avatar"
      >
        <UiImageUpload
          path="/user/"
          :src="form.profile.avatar"
          @image-changed="onAvatarChanged"
        />
      </NInputGroup>
    </NFormSection>

    <NFormAction>
      <NButton class="primary" type="submit" :disabled="loading">
        Save
      </NButton>
    </NFormAction>
  </NForm>
</template>

<script>
import {
  defineComponent,
  useContext,
  computed,
  reactive,
  watch,
} from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNFormValidation from '@/composables/useNFormValidation'
import useNFormValidators from '@/composables/useNFormValidators'
import useCustomValidator from '@/components/setting/user/useCustomValidator'

import { UPDATE_PROFILE } from '@/graphql/auth/UPDATE_PROFILE'
import { GET_ME } from '@/graphql/auth/GET_ME'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, store } = useContext()

    const { uniqueUsername } = useCustomValidator()

    const { helpers, required, numeric, email, minLength, maxLength, sameAs } =
      useNFormValidators()

    const { withMessage } = helpers

    const form = reactive({
      profile: {
        name: null,
        username: null,
        password: null,
        phone: null,
        avatar: null,
      },
      confirmPassword: null,
      oldUsername: null,
    })

    const me = computed(() => store.getters['auth/me'])

    const rules = computed(() => {
      const usernameRule = {
        required,
        email,
        minLengthValue: minLength(3),
        uniqueUsername,
      }
      return {
        profile: {
          name: {
            required,
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(150),
          },
          username:
            form.oldUsername === form.profile.username ? {} : usernameRule,
          password: {
            minLengthValue: minLength(5),
            maxLengthValue: maxLength(32),
          },
          phone: {
            required,
            numeric,
            minLengthValue: minLength(9),
            maxLengthValue: maxLength(15),
          },
        },
        confirmPassword: {
          sameAsPassword: withMessage(
            'The value must be equal to the password value',
            sameAs(form.profile.password)
          ),
        },
      }
    })

    const refetchQueries = [
      {
        query: GET_ME,
      },
    ]

    const {
      mutate: updateProfile,
      onDone: onUpdateProfileDone,
      onError: onUpdateProfileError,
      loading,
    } = useMutation(UPDATE_PROFILE, {
      refetchQueries,
    })

    const { validation } = useNFormValidation(rules, form)

    const onAvatarChanged = (file) => {
      form.profile.avatar = file.url
    }

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateProfile({
        input: form.profile,
      })
    }

    onUpdateProfileDone(({ data }) => {
      form.profile.password = null
      form.confirmPassword = null
      $toast.success('Profile successfully updated!')
      emit('save')
    })

    onUpdateProfileError((error) => {
      $toast.error(error.message)
    })

    const handleMeChange = () => {
      form.profile.username = me.value.username
      form.profile.name = me.value.name
      form.profile.phone = me.value.phone
      form.profile.avatar = me.value.avatar
      form.oldUsername = me.value.username
    }

    watch(me, handleMeChange, { immediate: true })

    return {
      validation,
      form,
      loading,
      me,
      onAvatarChanged,
      onSave,
    }
  },
})
</script>
