import { reactive, computed } from '@nuxtjs/composition-api'
import { assign, defaultsDeep } from 'lodash'
import useNFormValidation from '@/composables/useNFormValidation'
import useNFormValidators from '@/composables/useNFormValidators'

export default function useFormProduct() {
  const { required, numeric, minLength } = useNFormValidators()

  const defaultData = () => ({
    product: {
      title: null,
      description: null,
      price: null,
      isActive: true,
      image: null,
    },
  })

  const form = reactive(defaultData())

  const rules = computed(() => {
    return {
      product: {
        title: {
          required,
          minLengthValue: minLength(3),
        },
        price: {
          numeric,
          required,
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
