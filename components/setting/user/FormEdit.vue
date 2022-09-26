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
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMutation, useQuery } from '@vue/apollo-composable'

import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import useFormUser from '@/components/setting/user/useFormUser'

import { UPDATE_USER } from '@/graphql/setting/user/mutations/UPDATE_USER'
import { GET_USERS } from '@/graphql/setting/user/queries/GET_USERS'
import { GET_USER } from '@/graphql/setting/user/queries/GET_USER'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast, error } = useContext()

    const route = useRoute()

    const { variables } = useNTableCursorRemoteData()

    const { form, validation } = useFormUser()

    const refetchQueries = [
      {
        query: GET_USERS,
        variables,
      },
      {
        query: GET_USER,
        variables: {
          id: route.value.params.user_id,
        },
      },
    ]

    const { onResult: onResultUser } = useQuery(GET_USER, {
      id: route.value.params.user_id,
    })

    const {
      mutate: updateUser,
      onDone: onUpdateUserDone,
      onError: onUpdateUserError,
      loading,
    } = useMutation(UPDATE_USER, {
      refetchQueries,
    })

    onResultUser(({ data }) => {
      if (!data || !data.user) {
        return error({ statusCode: 404, message: 'Not Found' })
      }

      const { id, role, __typename, ...result } = data.user
      form.user = result
      form.oldUsername = data.user.username
      form.role = data.user.role
    })

    const onSave = async () => {
      const validationResult = await validation.validate()

      if (!validationResult) {
        $toast.clear()
        $toast.warning('Please double check your data and try again')
        return false
      }

      updateUser({
        input: {
          id: route.value.params.user_id,
          update: form.user,
        },
      })
    }

    const onDiscard = () => {
      emit('discard')
    }

    onUpdateUserDone(({ data }) => {
      $toast.success('User successfully updated!')
      emit('save')
    })

    onUpdateUserError((error) => {
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
