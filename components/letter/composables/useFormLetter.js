import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/composables/useNFormValidation'
import useNFormValidators from '@/composables/useNFormValidators'

export default function useFormLetter() {
  const { required, minLength } = useNFormValidators()

  const defaultData = () => ({
    letter: {
      subject: null,
    },
  })

  const form = reactive(defaultData())

  const rules = computed(() => {
    return {
      letter: {
        subject: {
          required,
          minLengthValue: minLength(3),
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
