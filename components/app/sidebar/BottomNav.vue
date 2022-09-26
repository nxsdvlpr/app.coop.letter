<template>
  <nav class="n-app-sidebar-bottom-nav">
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
      <li
        v-if="me"
        v-tooltip.right="tooltipOptions(me.name)"
        class="hidden justify-center md:flex cursor-pointer"
        @click="$router.push('/profile')"
      >
        <NAvatar :name="me.name" :src="me.avatar" class="sm secondary" />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    me() {
      return this.$store.getters['auth/me']
    },
    menus() {
      return this.$store.getters['menus/bottom']
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
