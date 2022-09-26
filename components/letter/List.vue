<template>
  <NTable mode="remote" :total-rows="totalRecords" :is-loading.sync="loading" :rows="rows" :columns="columns"
    :create-options="{ label: 'Add Product' }" :pagination-options="{
      enabled: true,
      perPage: 20,
    }" :page-info="pageInfo" @on-page-change="methods.onPageChange" @on-per-page-change="methods.onPerPageChange"
    @on-sort-change="methods.onSortChange" @on-search="methods.onSearch" @on-row-tap="onRowTap" @on-create="onCreate"
    @on-delete="onDelete">
    <template #table-row="props">
      <div v-if="props.column.field === 'image'" class="hidden md:inline">
        <NThumbnail :src="props.row.image" />
      </div>
      <NTableCellResponsive v-else-if="props.column.field === 'title'" :props="props">
        <div class="font-medium">{{ props.row.title }}</div>
        <div class="text-sm text-gray-600 line-clamp-1">
          {{ props.row.description }}
        </div>
      </NTableCellResponsive>
      <NTableCellResponsive v-else-if="props.column.field === 'isActive'" :props="props" class="hidden md:inline">
        <NOptionBadge :value="props.row.isActive" :options="statusOptions" />
      </NTableCellResponsive>
      <NTableCellResponsive v-else :props="props"></NTableCellResponsive>
    </template>
  </NTable>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import { GET_LETTERS } from '@/graphql/letter/queries/GET_LETTERS'
import { DESTROY_LETTERS } from '@/graphql/letter/mutations/DESTROY_LETTERS'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const statusOptions = ref([
      { value: true, label: 'ACTIVE', class: 'success' },
      { value: false, label: 'INACTIVE', class: 'info' },
    ])

    const columns = ref([
      {
        label: 'Media',
        field: 'image',
        align: 'center',
        width: '100px',
        sortable: false,
      },
      {
        label: 'Title',
        field: 'title',
        align: 'left',
      },
      {
        label: 'Price',
        field: 'price',
        align: 'right',
        width: '100px',
        type: 'currency',
      },
      {
        label: 'Status',
        field: 'isActive',
        align: 'center',
        width: '120px',
      },
    ])

    const { rows, totalRecords, pageInfo, loading, methods } =
      useNTableCursorRemoteData({
        getQuery: GET_LETTERS,
        destroyQuery: DESTROY_LETTERS,
        dataProperty: 'letters',
      })

    const onCreate = () => {
      emit('create')
    }

    const onRowTap = (params) => {
      emit('row-tap', params.row)
    }

    const onDelete = (rows) => {
      methods.destroyItems(rows, ({ deleteManyProducts: { deletedCount } }) => {
        $toast.success(`Products successfully deleted!`)
      })
      emit('delete', rows)
    }

    return {
      columns,
      rows,
      totalRecords,
      pageInfo,
      loading,
      methods,
      statusOptions,
      onCreate,
      onRowTap,
      onDelete,
    }
  },
})
</script>
