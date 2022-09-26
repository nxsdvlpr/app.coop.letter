<template>
  <div class="n-input-tag">
    <vue-tags-input v-bind="{ ...$props, ...$attrs }" v-on="$listeners" />
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  name: "NInputTag",
  components: {
    VueTagsInput,
  },
  inheritAttrs: false,
};
</script>

<style>
.n-input-tag {
  & .vue-tags-input {
    max-width: unset !important;

    &.ti-focus {
      & .ti-input {
        @apply border;
        @apply border-gray-400 !important;
      }
    }

    & .ti-input {
      @apply rounded !important;
      @apply outline-none !important;
      @apply text-gray-dark !important;
      @apply border-gray-light !important;

      & .ti-tags {
        & .ti-new-tag-input-wrapper {
          margin: 0 !important;

          & .ti-new-tag-input {
            &:focus {
              @apply ring-0 !important;
            }
          }
        }

        & .ti-tag {
          @apply label-lg;
          @apply rounded;

          &.ti-valid {
            @apply bg-primary !important;
          }

          &.ti-deletion-mark {
            @apply bg-danger !important;
          }
        }
      }
    }
  }
}
</style>
