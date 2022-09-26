import { useVuelidate } from '@vuelidate/core'

export default function useNFormValidation(rules = {}, form = {}, config = {}) {
  const v$ = useVuelidate(
    rules,
    form,
    Object.assign({ $lazy: true, $autoDirty: true }, config)
  )

  const getPropByString = (obj, propString) => {
    if (!propString) return obj

    let prop, i, iLen
    const props = propString.split('.')

    for (i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i]

      const candidate = obj[prop]
      if (candidate !== undefined) {
        obj = candidate
      } else {
        break
      }
    }
    return obj[props[i]]
  }

  const validation = v$.value

  validation.validate = async () => {
    const validationResult = await v$.value.$validate()

    if (!validationResult) {
      return false
    }
    return true
  }

  validation.touch = (field) => {
    return v$.value.$touch(field)
  }

  validation.reset = () => {
    return v$.value.$reset()
  }

  validation.error = (field) => {
    const v = getPropByString(v$.value, field)

    if (!v || !v.$error || v.$pending) {
      return
    }

    return v.$errors[0].$message
  }

  return {
    v$,
    validation,
  }
}
