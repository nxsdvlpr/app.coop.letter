<template>
  <div :key="key" class="flex items-center n-tabs">
    <div>
      <ul class="flex gap-x-6 md:gap-x-10 n-tabs-items">
        <li
          v-for="(tab, index) in compTabs"
          :key="index"
          class="n-tabs-item"
          :class="{
            'inline-block': index < currentMinTabItems,
            hidden: index >= currentMinTabItems,
          }"
          @click="scrollTo(tab.scrollY, $event)"
        >
          <nuxt-link
            class="inline-block -mb-0.5 py-2 text-gray-500 border-b-2 border-transparent hover:border-primary-dark active:border-primary whitespace-nowrap"
            :class="{
              'is-active-tab': tab.isActive,
              'text-2xs md:text-xs': !isScroll,
              'text-3xs md:text-2xs': isScroll,
            }"
            :to="tab.to"
          >
            {{ tab.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div v-if="tabs.length > currentMinTabItems">
      <div class="ml-4">
        <NDropdown
          ref="tabsDropdown"
          class="bottom-right"
          :fixed-classes="fixedClasses"
        >
          <template #toggler>
            <NIconButton icon="more" />
          </template>
          <div class="n-tabs-items">
            <div
              v-for="(tab, index) in dropdownTabs"
              :key="index"
              class="n-tabs-item"
              role="menuitem"
            >
              <nuxt-link :to="tab.to" class="dropdown-item">
                {{ tab.name }}
              </nuxt-link>
            </div>
          </div>
        </NDropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { defaults } from 'lodash'

export default {
  name: 'NTabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    minTabItems: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      key: this.$__.randomInt(8),
      fixedClasses: {
        button:
          'px-1 py-0 leading-none shadow-sm rounded leading-0 bg-white hover:bg-app-lightest focus:bg-app-lightest',
      },
      defaultMinTabItems: {
        sm: 2,
        md: 4,
        lg: 6,
        xl: 8,
        '2xl': Infinity,
      },
    }
  },
  computed: {
    isScroll() {
      return this.$store.getters['nboard/appHeader'].isSmall
    },
    compMinTabItems() {
      return defaults(this.minTabItems, this.defaultMinTabItems)
    },
    currentMinTabItems() {
      return this.compMinTabItems[this.$mq]
    },
    dropdownTabs() {
      return this.tabs.filter((tab, index) => {
        return index > this.currentMinTabItems - 1
      })
    },
    compTabs() {
      const tabs = this.tabs

      let activeTabCount = 0

      tabs.forEach((tab) => {
        const to = tab.to.replace(/\/+$/, '')

        const isAnchor = this.$route.fullPath.search(/#[a-zA-Z]+/) !== -1

        if (
          this.$route.fullPath.startsWith(to) ||
          (isAnchor && this.$route.fullPath.search(to) !== -1)
        ) {
          tab.isActive = true
          activeTabCount++
        } else {
          tab.isActive = false
        }
      })

      if (activeTabCount > 1) {
        tabs[0].isActive = false
      }

      return tabs
    },
  },
  methods: {
    scrollTo(scrollY, e) {
      if (!isNaN(scrollY)) {
        e.preventDefault()
        window.scroll(0, scrollY)
      }
    },
  },
}
</script>

<style scoped>
/* @todo: add responsive scroll Y */
.n-tabs {
  .n-tabs-item {
    .is-active-tab {
      @apply border-primary;
      @apply text-gray-dark;
    }

    .dropdown-item {
      &.nuxt-link-active {
        @apply text-primary;
      }
    }
  }
}
</style>
