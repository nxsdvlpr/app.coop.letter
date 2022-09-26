<template>
  <div
    class="flex items-center md:block n-table-responsive-cell"
    :class="{
      'flex-col mt-2 md:mt-0': flow === 'vertical',
      ['field-' + props.column.type]: true,
    }"
  >
    <div
      class="mr-3 leading-0 uppercase text-gray-base label md:hidden whitespace-nowrap n-table-responsive-cell-label"
    >
      {{ props.column.label }}
    </div>
    <div class="n-table-responsive-cell-content">
      <slot>{{ props.formattedRow[props.column.field] }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NTableCellResponsive',
  props: {
    props: {
      type: Object,
      default() {
        return {}
      },
    },
    flow: {
      type: String,
      default: 'horizontal',
    },
  },
}
</script>

<style>
.n-table-responsive-cell {
  &-label {
    @apply overflow-hidden overflow-ellipsis;
    width: 4rem;
  }

  &.field-date_short:first-child {
    @apply justify-end md:justify-center;
    .n-table-responsive-cell {
      &-label {
        @apply hidden;
      }
      &-content {
      }
    }
  }
}
</style>
