<template>
  <div
    class="flex items-center justify-between h-full px-3 text-gray-base bg-white md:px-8 n-app-navbar"
  >
    <div class="flex items-center">
      <button class="mt-1 mr-4 md:hidden" @click="toggleSidebar">
        <NIcon icon="menu" class="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <a class="inline-flex font-bold items-center mr-4 gap-x-2" href="#">
        <div class="flex items-center text-sm md:text-md leading-none">
          <div class="flex items-center gap-x-6 text-primary-light">
            <div class="text-lg tracking-tight">Coop Letter</div>
          </div>
        </div>
      </a>
      <!-- <Icon name="search" class="w-6 h-6 text-primary md:w-7 md:h-7" /> -->
    </div>
    <div class="flex items-center gap-x-4">
      <AppNavbarProfile @logout="onLogout" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    role() {
      return this.$store.getters['auth/activeRole']
    },
  },
  methods: {
    ...mapMutations({ toggleSidebar: 'nboard/toggleSidebar' }),
    onLogout() {
      this.$emit('logout')
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-app-navbar {
  z-index: 2000 !important;
}
</style>
