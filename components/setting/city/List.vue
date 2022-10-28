<template>
  <NTable
    mode="remote"
    :total-rows="totalRecords"
    :is-loading.sync="loading"
    :rows="rows"
    :columns="columns"
    :create-options="{ label: 'Add City' }"
    :pagination-options="{
      enabled: true,
      perPage: 20,
    }"
    :page-info="pageInfo"
    @on-page-change="methods.onPageChange"
    @on-per-page-change="methods.onPerPageChange"
    @on-sort-change="methods.onSortChange"
    @on-search="methods.onSearch"
    @on-row-tap="onRowTap"
    @on-create="onCreate"
    @on-delete="onDelete"
  >
    <template #table-row="props">
      <NTableCellResponsive :props="props"></NTableCellResponsive>
    </template>
  </NTable>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import { GET_CITIES } from '@/graphql/setting/city/queries/GET_CITIES'
import { DESTROY_CITIES } from '@/graphql/setting/city/mutations/DESTROY_CITIES'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const columns = ref([
      {
        label: 'Name',
        field: 'name',
        align: 'left',
      },
    ])

    const { rows, totalRecords, pageInfo, loading, methods } =
      useNTableCursorRemoteData({
        getQuery: GET_CITIES,
        destroyQuery: DESTROY_CITIES,
        dataProperty: 'cities',
      })

    const onCreate = () => {
      emit('create')
    }

    const onRowTap = (params) => {
      emit('row-tap', params.row)
    }

    const onDelete = (rows) => {
      methods.destroyItems(rows, ({ deleteManyCities: { deletedCount } }) => {
        $toast.success(`Cities successfully deleted!`)
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
      onCreate,
      onRowTap,
      onDelete,
    }
  },
})
</script>
