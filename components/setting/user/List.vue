<template>
  <NTable
    mode="remote"
    :total-rows="totalRecords"
    :is-loading.sync="loading"
    :rows="rows"
    :columns="columns"
    :create-options="{ label: 'Add User' }"
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
      <div v-if="props.column.field === 'name'">
        <div class="font-medium">{{ props.row.name }}</div>
      </div>
      <div v-else-if="props.column.field === 'role'">
        <NBadge class="label uppercase outline">
          {{ props.row.role.name }}
        </NBadge>
      </div>
      <NTableCellResponsive v-else :props="props"></NTableCellResponsive>
    </template>
  </NTable>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useNTableCursorRemoteData from '@/composables/useNTableCursorRemoteData'
import { GET_USERS } from '@/graphql/setting/user/queries/GET_USERS'
import { DESTROY_USERS } from '@/graphql/setting/user/mutations/DESTROY_USERS'

export default defineComponent({
  setup(props, { emit }) {
    const columns = ref([
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Username',
        field: 'username',
      },
      {
        label: 'Phone',
        field: 'phone',
      },
      {
        label: 'Role',
        field: 'role',
      },
    ])

    const { rows, totalRecords, pageInfo, loading, methods } =
      useNTableCursorRemoteData({
        getQuery: GET_USERS,
        destroyQuery: DESTROY_USERS,
        dataProperty: 'users',
      })

    const onCreate = () => {
      emit('create')
    }

    const onRowTap = (params) => {
      emit('row-tap', params.row)
    }

    const onDelete = (rows) => {
      methods.destroyItems(rows)

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
