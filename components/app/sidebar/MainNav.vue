<template>
  <nav class="n-app-sidebar-main-nav">
    <ul>
      <li
        v-for="(menu, index) in menus"
        :key="index"
        v-tooltip.right="tooltipOptions(menu.label)"
      >
        <nuxt-link
          :to="menu.to"
          :class="{
            active: $route.path.startsWith(menu.to.split('/')[1], 1),
          }"
        >
          <NIcon :icon="menu.icon" />
          <span>{{ menu.label }}</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    menus() {
      return this.$store.getters['menus/main']
    },
  },

  methods: {
    tooltipOptions(label) {
      const breakpoint = this.$store.getters['nboard/breakpoint']

      if (['sm', 'md'].includes(breakpoint)) {
        return {}
      }

      return {
        content: label,
        trigger: 'hover click focus',
      }
    },
  },
}
</script>
