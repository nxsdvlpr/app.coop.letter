<template>
  <div v-if="props.row.author">{{ props.row.author.name }}</div>
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
