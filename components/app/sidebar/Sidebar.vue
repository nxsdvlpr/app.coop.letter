<template>
  <div class="relative n-app-sidebar">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-40 bg-gray-300 opacity-25"
      :class="{ hidden: !sidebar.isOpen }"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 z-50 flex flex-col flex-shrink-0 w-64 h-full px-4 py-4 space-y-4 text-gray-400 transition-all transform md:w-20 md:justify-between md:z-auto md:static md:shadow-none bg-app-dark wrapper"
      :class="{ '-translate-x-full md:translate-x-0': !sidebar.isOpen }"
    >
      <div
        class="flex items-center justify-between h-6 mb-6 md:justify-center md:h-36 md:mb-0"
      >
        <div class="flex">
          <div class="n-app-logo w-6 h-6 md:w-8 md:h-8">
            <AppLogo class="text-white" />
          </div>
          <div class="ml-4 font-bold md:hidden flex items-center">
            <span class="text-sm md:text-2xl text-white">Coop Letter</span>
          </div>
        </div>

        <button class="md:hidden" @click="closeSidebar">
          <NIcon icon="close" size="xs" />
        </button>
      </div>
      <div class="w-full">
        <AppSidebarMainNav @on-click="closeSidebar" />
      </div>
      <div class="w-full">
        <AppSidebarBottomNav @on-click="navigate" />
      </div>
    </aside>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({ sidebar: 'nboard/sidebar' }),
  },

  mounted() {
    window.addEventListener('resize', this.checkScreen)
  },

  methods: {
    ...mapMutations({ closeSidebar: 'nboard/closeSidebar' }),
    checkScreen() {
      if (window.innerWidth >= 768) {
        this.closeSidebar()
      }
    },
    navigate(to) {
      this.$router.push(to)
      this.closeSidebar()
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-app-sidebar {
  .wrapper {
    @apply drop-shadow-md;
  }
  /deep/ &-main-nav,
  /deep/ &-bottom-nav {
    ul {
      @apply flex;
      @apply flex-col;
      @apply w-full;
      @apply space-y-5;
      @apply md:space-y-2;

      li {
        @apply text-gray-400 hover:text-gray-300;

        a {
          @apply flex;
          @apply w-full;
          @apply cursor-pointer;
          @apply items-center;

          @screen md {
            @apply w-12;
            @apply h-12;
            @apply justify-center;
            @apply items-center;
          }

          &.active {
            @apply text-gray-200;
          }

          div.n-icon {
            @apply w-5;
            @apply h-5;
            @apply mb-1;

            @screen md {
              @apply w-7;
              @apply h-7;
              @apply mb-0;
            }
          }

          span {
            @apply ml-3;
            @apply text-sm;
            @apply md:hidden;
            line-height: 1;
          }
        }
      }
    }
  }
}
</style>
