<template>
  <NForm @submit="onSave">
    <NFormSection
      id="overview"
      caption="Overview"
      description="Basic profile information"
    >
      <NColumn>
        <NInputGroup
          :feedback="validation.error('user.name')"
          label="Full Name"
        >
          <NInput v-model="form.user.name" type="text" />
        </NInputGroup>

        <NInputGroup :feedback="validation.error('user.phone')" label="Phone">
          <NInput v-model="form.user.phone" type="text" />
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup
          :feedback="validation.error('user.username')"
          label="Username"
        >
          <NInput v-model="form.user.username" type="text" />
        </NInputGroup>
        <NInputGroup
          :feedback="validation.error('user.password')"
          label="Password"
        >
          <NInput v-model="form.user.password" type="password" />
        </NInputGroup>
      </NColumn>

      <NColumn>
        <NInputGroup :feedback="validation.error('role')" label="Role">
          <SettingRoleSelect v-model="form.role" />
        </NInputGroup>
      </NColumn>
    </NFormSection>

    <NFormAction :loading="loading" @discard="onDiscard" />
  </NForm>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import useFormUser from '@/components/setting/user/useFormUser'

import { CREATE_USER } from '@/graphql/setting/user/mutations/CREATE_USER'
import { GET_USERS } from '@/graphql/setting/user/queries/GET_USERS'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation } = useFormUser()

    const refetchQueries = [
      {
        query: GET_USERS,
        variables,
      },
    ]

    const {
      mutate: createUser,
      onDone: onCreateUserDone,
      onError: onCreateUserError,
      loading,
    } = useMutation(CREATE_USER, {
      refetchQueries,
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      createUser({
        input: form.user,
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onCreateUserDone(({ data }) => {
      $toast.success('User successfully added!')
      emit('save')
    })

    onCreateUserError((error) => {
      $toast.error(error.message)
    })

    return {
      validation,
      form,
      loading,
      onSave,
      onDiscard,
    }
  },
})
</script>
