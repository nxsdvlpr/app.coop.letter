<template>
  <div class="n-form-section">
    <div class="n-form-section-overlay"></div>
    <div class="flex flex-col gap-x-8 md:flex-row">
      <div
        v-if="caption !== '' || description !== ''"
        class="text-gray-base flex-shrink-0 md:w-1/4 md:mt-1 n-form-section-caption"
      >
        <slot name="caption">
          <h3 class="text-gray-dark text-heading">
            {{ caption }}
          </h3>
          <p class="text-xs md:text-sm">{{ description }}</p>
        </slot>
        <slot name="after-caption"> </slot>
      </div>
      <div class="flex-grow mt-4 md:mt-2 n-form-section-inputs">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NFormSection',
  props: {
    caption: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.n-form-section {
  /*
  Hidden overlay to fix scrolling on route with hash (#)
  Overlay heigh is set regarding the height of NAppNavbar height + max NAppHeader height (main + overlay)
*/
  /* &-overlay {
    content: ' ';
    visibility: hidden;
    pointer-events: none;
    position: relative; */

  /* @todo: */
  /* Should computed from real app top height */
  /* Before was using nboard store getter */
  /* margin-top: -280px;
    height: 280px;
  } */
  /* &-overlay {
    border-top: 280px solid #fff;
    content: ' ';
    visibility: hidden;
    pointer-events: none;
    padding-top: -280px;
  } */
}
</style>
