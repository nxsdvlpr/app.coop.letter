<template>
  <div v-if="props.row.city">{{ props.row.city.name }}</div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    props: {
      type: Object,
      required: true,
    },
  },
})
</script>
