<template>
  <div class="n-table-action-group flex gap-x-2" @click.stop></div>
</template>

<script>
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    props: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()

    const me = computed(() => store.getters['auth/me'])

    const role = computed(() => me.value.role.shortname)

    return {
      role,
    }
  },
})
</script>
