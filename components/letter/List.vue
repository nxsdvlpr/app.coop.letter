<template>
  <NTable
    mode="remote"
    :total-rows="totalRecords"
    :is-loading.sync="loading"
    :rows="rows"
    :columns="columns"
    :create-options="{ label: 'Add Letter' }"
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
      <LetterColumnRef v-if="props.column.field === 'ref'" :props="props" />

      <LetterColumnAction
        v-else-if="props.column.type === 'action'"
        :props="props"
        @edit-verification-data="onEditVerificationData"
      />

      <NTableCellResponsive v-else :props="props"></NTableCellResponsive>
    </template>
  </NTable>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import { GET_LETTERS } from '@/graphql/letter/queries/GET_LETTERS'
import { DESTROY_LETTERS } from '@/graphql/letter/mutations/DESTROY_LETTERS'

import useLetterTable from '@/components/letter/composables/useLetterTable'

export default defineComponent({
  setup(props, { emit }) {
    const { $toast } = useContext()

    const { columns } = useLetterTable()

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
      methods.destroyItems(rows, ({ deleteManyLetters: { deletedCount } }) => {
        $toast.success(`Letters successfully deleted!`)
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
