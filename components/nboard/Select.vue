<template>
  <v-select
    ref="nSelect"
    v-bind="inputProps"
    :filter="filter"
    :filterable="filterable"
    class="n-select"
    v-on="$listeners"
  >
    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />

    <!-- Pass on all scoped slots -->
    <template
      v-for="slot in Object.keys($scopedSlots)"
      :slot="slot"
      slot-scope="scope"
      ><slot :name="slot" v-bind="scope"
    /></template>
  </v-select>
</template>

<script>
import Fuse from 'fuse.js'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'NSelect',
  components: {
    vSelect,
  },
  inheritAttrs: false,
  props: {
    searchOptions: {
      type: Object,
      default() {
        return {
          keys: [],
          shouldSort: true,
        }
      },
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Function,
      default(options, search) {
        const fuse = new Fuse(options, this.searchOptions)
        return search.length ? fuse.search(search).map(({ item }) => item) : []
      },
    },
  },
  computed: {
    inputProps() {
      const props = { ...this.$props, ...this.$attrs }
      delete props.searchOptions
      delete props.filter
      delete props.filterable
      return props
    },
  },
}
</script>

<style lang="postcss">
.v-select {
  & .vs__dropdown-toggle {
    @apply p-0 !important;
    @apply w-full !important;
    @apply text-gray-dark !important;
    @apply border-gray-light !important;
    background-color: #ffffff !important;
    line-height: 2.5rem !important;

    &:focus-within {
      @apply border border-gray-400 !important;
    }

    & .vs__selected-options {
      @apply flex-nowrap !important;

      & .vs__selected {
        @apply m-0 !important;
        @apply p-0 !important;
        @apply px-2 !important;
        background-color: #ffffff !important;
        min-height: 2.5rem !important;
      }

      & .vs__search {
        @apply m-0 !important;
        @apply px-3 !important;
        @apply py-0 !important;
        @apply border-none !important;
        background-color: #ffffff !important;
        line-height: 2.5rem !important;

        &:focus {
          @apply outline-none !important;
          @apply ring-0 !important;
        }

        &::placeholder {
          @apply m-0 !important;
          @apply p-0 !important;
        }
      }
    }
  }

  & .vs__dropdown-option--highlight {
    @apply bg-app-light !important;
    @apply text-gray-dark !important;
  }

  & .vs__dropdown-menu {
    @apply border-gray-400 !important;
  }

  & .v-select.drop-up.vs--open .vs__dropdown-toggle {
    border-radius: 0 0 4px 4px !important;
    border-top-style: none !important;
    border-top-color: transparent !important;
    border-bottom-color: rgba(60, 60, 60, 0.26) !important;
  }

  & .vs__dropdown-menu[data-popper-placement='top'] {
    @apply border-gray-light !important;
    border-radius: 4px 4px 0 0 !important;
    border-top-style: solid !important;
    border-bottom-style: none !important;
    border-bottom-color: transparent !important;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.15) !important;
    overflow-x: hidden !important;
  }

  &.vs--disabled {
    @apply cursor-not-allowed !important;

    & .vs__dropdown-toggle {
      background-color: #f8f8f8 !important;

      & .vs__selected-options {
        & .vs__selected {
          background-color: #f8f8f8 !important;
        }

        & .vs__search {
          background-color: #f8f8f8 !important;
        }
      }
    }
  }
}
</style>
