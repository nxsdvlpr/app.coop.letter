<template>
  <div @click.stop>
    <NDropdown class="bottom-right md:bottom-right">
      <template #toggler>
        <NIconButton :class="button.class" :icon="button.icon" />
      </template>
      <div>
        <div role="menu">
          <slot />
        </div>
      </div>
    </NDropdown>
  </div>
</template>

<script>
export default {
  name: 'NTableCellActionDropdown',
  props: {
    button: {
      type: Object,
      default() {
        return {
          icon: 'arrow-right-square',
          class: 'text-primary hover:text-primary-dark',
        }
      },
    },
  },
}
</script>
