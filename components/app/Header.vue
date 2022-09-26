<template>
  <div
    v-if="true"
    id="nAppHeader"
    ref="nAppHeader"
    class="sticky z-10 top-16 n-app-header"
    :class="{ 'is-scroll': isScroll }"
  >
    <div class="border-b bg-app-lightest n-app-header-content">
      <div class="container flex">
        <div class="flex-1">
          <div
            class="flex items-center justify-between gap-x-4 n-app-header-content-wrapper"
            :class="{
              'mb-3 md:mb-4': !hasAfterSlot && !isScroll,
              'mb-3 md:mb-2': !hasAfterSlot && isScroll,
              'pb-0': hasAfterSlot,
            }"
          >
            <div
              class="flex-grow-0 md:flex-grow text-gray-darkest n-app-header-title overflow-hidden"
            >
              <slot></slot>
            </div>
          </div>
          <div
            v-if="hasAfterSlot"
            class="n-app-header-after"
            :class="{ 'mt-3 md:mt-4': !isScroll, 'mt-1': isScroll }"
          >
            <div id="nAppHeaderAfterWrapper">
              <slot name="after"></slot>
            </div>
          </div>
        </div>
        <div v-if="hasMoreSlot" class="flex-shrink-0 flex items-center">
          <div class="inline-flex items-center">
            <portal-target name="n-app-header-more">
              <slot name="more"> </slot>
            </portal-target>
          </div>
        </div>
      </div>
    </div>
    <div v-if="spacer" class="n-app-header-overlay"></div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'NAppHeader',
  props: {
    spacer: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isScroll() {
      return this.$store.getters['nboard/appHeader'].isSmall
    },
    hasMoreSlot() {
      return !!this.$slots.more
    },
    hasAfterSlot() {
      return !!this.$slots.after
    },
  },
  mounted() {
    this.$nextTick(() => {
      // @todo: using resizeElementFullWidth for dynamic tabs component
      // temporary disable due to bug showing horizontal
      // this.$__.resizeElementFullWidth('nAppHeaderAfterWrapper')
      // window.addEventListener('resize', () => {
      //   this.$__.resizeElementFullWidth('nAppHeaderAfterWrapper')
      // })
    })
    const store = this.$store
    window.addEventListener(
      'scroll',
      debounce(() => {
        /* Smaller y scroll is safer */
        if (window.pageYOffset > 40) {
          store.commit('nboard/setAppHeaderSmall', true)
        } else {
          store.commit('nboard/setAppHeaderSmall', false)
        }
      }, 800)
    )
  },
}
</script>

<style lang="postcss" scoped>
.n-app-header {
  &-content {
    /* Header inner bottom shadow */
    --tw-shadow: inset 0 -3px 6px 0 rgba(0, 0, 0, 0.04);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

    &-wrapper {
      @apply pt-4;
      transition: height 0.5s, transform 0.5s;
      transition-timing-function: ease-out;

      /* @todo: fix height calculation for transition */
      height: 54px;

      @screen md {
        @apply pt-4;
        /* @todo: fix height calculation for transition */
        height: 60px;
      }

      .n-app-header-title {
        transition: height 1s;
        h1 {
          @apply leading-none;
          font-size: 1.2rem;
          line-height: 1.24rem;
          letter-spacing: -0.025em;

          @screen md {
            font-size: 1.8rem;
            line-height: 1.82rem;
          }

          & ~ * {
            @apply text-2xs;
            @apply text-gray-500;

            @screen md {
              @apply text-xs;
            }
          }
        }
      }
    }
  }

  &-overlay {
    @apply h-6 md:h-8;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 6%,
      rgba(255, 255, 255, 0) 100%
    );
  }
}

.is-scroll {
  .n-app-header {
    &-content {
      &-wrapper {
        @apply pt-3;
        @apply flex-row;
        @apply justify-between;
        @apply items-center;
        /* @todo: fix height calculation for transition */
        height: 32px;

        @screen md {
          @apply pt-2;
          /* @todo: fix height calculation for transition */
          height: 42px;
        }

        .n-app-header-title {
          h1 {
            @apply mb-0;
            font-size: 1.05rem;

            @screen md {
              @apply font-medium;
              font-size: 1.28rem;
            }

            & + * {
              @apply hidden;

              @screen md {
                @apply block;
                @apply text-2xs;
                @apply pl-3;
                @apply border-l border-gray-300;
              }
            }
          }

          @apply flex;
          @apply items-center;
          @apply gap-x-3;
        }
      }
    }

    &-more {
      @apply mt-0;
    }
  }
}
</style>
