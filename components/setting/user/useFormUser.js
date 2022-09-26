import { reactive, computed, watch } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/composables/useNFormValidation'
import useNFormValidators from '@/composables/useNFormValidators'
import useCustomValidator from '@/components/setting/user/useCustomValidator'

export default function useFormUser() {
  const { uniqueUsername } = useCustomValidator()

  const { required, numeric, email, minLength, maxLength } =
    useNFormValidators()

  const defaultData = () => ({
    user: {
      roleId: null,
      name: null,
      username: null,
      password: null,
      phone: null,
    },
    oldUsername: null,
    role: null,
  })

  const form = reactive(defaultData())

  const rules = computed(() => {
    const usernameRule = {
      required,
      email,
      minLengthValue: minLength(3),
      uniqueUsername,
    }

    return {
      user: {
        name: {
          required,
          minLengthValue: minLength(3),
          maxLengthValue: maxLength(150),
        },
        username:
          form.oldUsername === form.user.username && form.user.username !== null
            ? {}
            : usernameRule,
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
      role: {
        required,
      },
    }
  })

  const { validation } = useNFormValidation(rules, form, {
    $autoDirty: true,
    $lazy: true,
  })

  const fillFormData = (data) => {
    assign(form, defaultsDeep(data, form))
  }

  const resetFormData = () => {
    assign(form, reactive(defaultData()))
  }

  const handleRoleChange = (role) => {
    form.user.roleId = role?.id ?? null
  }

  watch(() => form.role, handleRoleChange)

  return {
    form,
    validation,
    resetFormData,
    fillFormData,
  }
}
