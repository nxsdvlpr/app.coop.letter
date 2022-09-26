<template>
  <div v-tooltip="tooltip" class="label-lg uppercase">{{ props.row.ref }}</div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    props: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const tooltip = computed(() => {
      if (props.props?.row) {
        let users = ''

        if (props.props.row.user?.name) {
          users += `<div>${props.props.row.user?.name}</div>`
        }

        if (users) {
          return {
            html: true,
            trigger: 'hover click focus',
            content: `
              <div class="px-1 py-1 text-xs">
                ${users}
              </div>
            `,
          }
        }
      }
    })

    return { tooltip }
  },
})
</script>
