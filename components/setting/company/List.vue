<template>
  <NTable
    mode="remote"
    :total-rows="totalRecords"
    :is-loading.sync="loading"
    :rows="rows"
    :columns="columns"
    :create-options="{ label: 'Add Company' }"
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
import { GET_COMPANIES } from '@/graphql/setting/company/queries/GET_COMPANIES'
import { DESTROY_COMPANIES } from '@/graphql/setting/company/mutations/DESTROY_COMPANIES'

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
        getQuery: GET_COMPANIES,
        destroyQuery: DESTROY_COMPANIES,
        dataProperty: 'companies',
      })

    const onCreate = () => {
      emit('create')
    }

    const onRowTap = (params) => {
      emit('row-tap', params.row)
    }

    const onDelete = (rows) => {
      methods.destroyItems(
        rows,
        ({ deleteManyCompanies: { deletedCount } }) => {
          $toast.success(`Companies successfully deleted!`)
        }
      )
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
