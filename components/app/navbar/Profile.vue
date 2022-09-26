<template>
  <div class="profile-menu">
    <div
      v-on-clickaway="closeDropdown"
      class="relative cursor-pointer"
      @click="dropdownOpen = !dropdownOpen"
    >
      <NIcon icon="profile" class="w-5 h-5 md:w-6 md:h-6" />
    </div>

    <portal v-if="dropdownOpen" to="after-layout">
      <div class="fixed z-50 w-screen inset-0 px-6">
        <div class="flex w-full justify-end">
          <div
            class="mt-12 md:mt-16 rounded-md bg-white border border-gray-200 shadow-sm dropdown"
          >
            <ul class="dropdown-menu">
              <li>
                <div class="dropdown-menu-item" @click="onProfileClick">
                  Profile
                </div>
              </li>
              <li>
                <div class="dropdown-menu-item text-danger" @click="onLogout">
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [clickaway],
  data: () => ({
    dropdownOpen: false,
  }),
  methods: {
    closeDropdown() {
      this.dropdownOpen = false
    },
    onLogout() {
      this.$emit('logout')
    },
    onProfileClick() {
      this.$router.push({ name: 'profile' })
    },
  },
}
</script>

<style lang="postcss" scoped>
/deep/ .dropdown-menu {
  @apply bg-white shadow;
  @apply rounded-md;

  .dropdown-menu-item {
    @apply block;
    @apply px-6;
    @apply py-1;
    @apply whitespace-nowrap;
    @apply cursor-pointer;
    @apply hover:bg-app-light;
  }
}
</style>
