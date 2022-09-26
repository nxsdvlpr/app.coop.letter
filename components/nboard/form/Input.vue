<template>
  <div class="form-group n-form-input">
    <label for="title">{{ label }}</label>
    <NInput id="title" type="text" />
  </div>
</template>

<script>
export default {
  name: 'NFormInput',
  props: {
    label: { type: String, required: true },
  },
}
</script>
