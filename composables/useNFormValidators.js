import * as validators from '@vuelidate/validators'

export default function useNFormValidators() {
  const custom = {}

  custom.itemsIsRequired = {
    $validator: (value) => value.length > 0,
    $message: 'Choose at least one item',
    $params: {
      type: 'itemsIsRequired',
    },
  }

  custom.hashRequired = {
    $validator: (value) => validators.required.$validator(value),
    $message: '#',
    $params: {
      type: 'hashRequired',
    },
  }

  return { ...validators, ...custom }
}
