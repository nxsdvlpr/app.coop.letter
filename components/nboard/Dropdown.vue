<template>
  <div
    @click="toggle"
    v-on-clickaway="away"
    class="n-dropdown relative z-10 inline-block"
  >
    <slot name="toggler">
      <button
        class="px-3 py-3 leading-none label uppercase shadow-sm rounded bg-white border border-gray-100 hover:bg-app-lightest focus:bg-app-lightest"
      >
        Open Dropdown
      </button>
    </slot>

    <transition name="dropdown-content">
      <div
        v-if="active"
        class="n-dropdown-content origin-top-left absolute left-0 w-48 rounded shadow bg-white mt-1"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "NDropdown",
  mixins: [clickaway],
  data: () => ({
    active: false,
  }),
  methods: {
    toggle() {
      this.active = !this.active;
    },
    away() {
      this.active = false;
    },
  },
};
</script>

<style>
.n-dropdown {
  &-content {
    [role="menu"] > *,
    [role="menuitem"] {
      @apply block;
      @apply pl-6 pr-8;
      @apply py-2;
      @apply text-sm;
      @apply leading-5;
      @apply transition;
      @apply duration-150;
      @apply ease-in-out;
      @apply hover:bg-app-light;
      @apply focus:outline-none;
      @apply focus:bg-app-light;
    }
  }
}

.dropdown-content-enter-active,
.dropdown-content-leave-active {
  transition: all 0.2s;
}
.dropdown-content-enter,
.dropdown-content-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
