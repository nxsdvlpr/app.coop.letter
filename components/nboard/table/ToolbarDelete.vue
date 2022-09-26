<template>
  <div
    class="flex items-center justify-between w-full delete gap-x-8 md:w-auto n-table-toolbar-delete"
  >
    <div class="flex items-center gap-x-2">
      <div>
        <NIcon
          icon="delete"
          class="inline-block sm text-danger icon-sm hover:text-danger-dark"
        />
      </div>
      <div class="text-sm">Delete {{ selectedRowCount }} rows?</div>
    </div>
    <div class="flex gap-x-2">
      <div>
        <NButton class="danger" @click="onShowModal">DELETE</NButton>
      </div>
      <div>
        <NButton class="outline" @click="onDeleteCancel">CANCEL</NButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NTableToolbarDelete',
  props: {
    selectedRowCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onShowModal() {
      this.$emit('show-modal')
    },
    onDeleteCancel() {
      this.$emit('delete-cancel')
    },
  },
}
</script>
