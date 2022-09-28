import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/composables/useNFormValidation'
import useNFormValidators from '@/composables/useNFormValidators'

export default function useFormCompany() {
  const { required, minLength, maxLength } = useNFormValidators()

  const defaultData = () => ({
    company: {
      name: null,
      code: null,
    },
  })

  const form = reactive(defaultData())

  const rules = computed(() => {
    return {
      company: {
        name: {
          required,
          minLengthValue: minLength(3),
        },
        code: {
          required,
          minLengthValue: minLength(2),
          maxLengthValue: maxLength(10),
        },
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

  return {
    form,
    validation,
    resetFormData,
    fillFormData,
  }
}
