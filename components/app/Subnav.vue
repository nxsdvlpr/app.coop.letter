<template>
  <div v-if="submenus.length > 0" class="n-app-subnav">
    <nav
      class="justify-end hidden h-full py-6 bg-app-light border-r md:flex md:flex-col md:flex-shrink-0"
    >
      <ul>
        <li
          v-for="(submenu, index) in submenus"
          :key="index"
          @click="onLinkClick(submenu)"
        >
          <nuxt-link
            class="block py-2 text-sm leading-4 cursor-pointer px-7 hover:font-bold"
            :active-class="getLinkActiveClass(submenu)"
            :to="submenu.to"
          >
            {{ submenu.label }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <transition name="slide-fade-right">
      <div class="md:hidden">
        <div class="fixed z-30 left-5 bottom-5 n-app-subnav-dropup">
          <div
            class="relative flex items-center justify-center w-12 h-12 bg-white rounded-full shadow cursor-pointer"
            @click.prevent.stop="onClick($event)"
          >
            <div>
              <NIcon icon="menu" class="sm" />
            </div>
          </div>

          <transition name="slide-fade-right">
            <div v-show="showContext" class="absolute z-50 left-10 bottom-8">
              <ul v-on-clickaway="away" class="bg-white shadow rounded-md">
                <li
                  v-for="(submenu, index) in submenus"
                  :key="index"
                  @click="onLinkClick(submenu)"
                >
                  <nuxt-link
                    :active-class="getLinkActiveClass(submenu)"
                    :to="submenu.to"
                    class="block px-6 py-3 whitespace-nowrap"
                  >
                    {{ submenu.label }}</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [clickaway],
  data() {
    return {
      showContext: false,
    }
  },
  computed: {
    submenus() {
      return this.$store.state.nboard.submenus
    },
  },
  methods: {
    getLinkActiveClass(submenu) {
      if (typeof submenu.isActive === 'function') {
        return submenu.isActive() ? 'submenu-active' : 'submenu-inactive'
      }

      return undefined
    },
    onLinkClick(submenu) {
      if (typeof submenu.onClick === 'function') {
        submenu.onClick()
      }
    },
    onClick(event) {
      this.showContext = !this.showContext
    },
    away() {
      this.showContext = false
    },
  },
}
</script>

<style lang="postcss" scoped>
.n-app-subnav {
  nav {
    min-width: 10rem;

    .nuxt-link-active {
      @apply font-medium;
    }

    .submenu-active {
      @apply font-medium;
    }

    .submenu-inactive {
      @apply font-normal;
    }
  }
}
</style>
