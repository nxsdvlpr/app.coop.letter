<template>
  <div class="flex flex-col n-table">
    <div
      class="flex flex-col items-start gap-y-3 md:flex-row-reverse gap-x-4 md:space-y-0 toolbar md:items-center"
    >
      <NTableToolbarCreate
        v-if="computedCreateOptions.enabled"
        :create-options="computedCreateOptions"
        @on-create="onCreate"
      />

      <Transition name="fade">
        <NTableToolbarSearch
          v-if="searchOptions.enabled"
          v-model="nTableSearch"
          :show="!isRowSelected"
        />
      </Transition>

      <slot v-if="isRowSelected" name="toolbar-selected-actions"></slot>
      <slot v-else name="toolbar-more-filter"></slot>

      <Transition v-if="deleteOptions.enabled && isRowSelected" name="slide">
        <NTableToolbarDelete
          :selected-row-count="$refs.table.selectedRowCount"
          @show-modal="onModalDeleteShow"
          @delete-cancel="onDeleteCancel"
        />
      </Transition>
    </div>

    <VueGoodTable
      ref="table"
      :style-class="styleClass"
      :search-options="{
        ...searchOptions,
        externalQuery: nTableSearch,
      }"
      :select-options="computedSelectOptions"
      :sort-options="computedSortOptions"
      :pagination-options="computedPaginationOptions"
      :columns="computedColumns"
      :rows="rows"
      :total-records="computedTotalRecords"
      :is-loading="computedIsLoading"
      v-bind="tableProps"
      v-on="$listeners"
      @on-row-click="onRowClick"
      @on-selected-rows-change="onSelectedRowsChange"
      @on-page-change="onPageChange"
    >
      >
      <template v-for="(_, slot) in $scopedSlots" #[slot]="props">
        <slot :name="slot" v-bind="props" />
      </template>
      <div slot="loadingContent"></div>

      <div slot="emptystate">
        <NTableEmptyState :is-loading="computedIsLoading" />
      </div>

      <template slot="pagination-bottom">
        <NTableCursorPagination
          :page-info="pageInfo"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
        />
      </template>
    </VueGoodTable>

    <NModal
      header="Confirm Delete!"
      :showing="isModalDeleteShow"
      :show-close="false"
      :background-close="true"
      @close="onModalDeleteHide"
    >
      <div>
        <div class="mb-4">Are you sure want to delete these records?</div>
        <div class="text-right">
          <NButton class="danger mr-2" @click="onDelete">DELETE</NButton>
          <NButton class="outline" @click="onModalDeleteHide">CANCEL</NButton>
        </div>
      </div>
    </NModal>
  </div>
</template>

<script>
import '@/assets/css/vue-good-table/style.pcss'
import { defaults, trim, some, omit } from 'lodash'
import { VueGoodTable } from 'vue-good-table'

export default {
  name: 'NTable',
  components: {
    VueGoodTable,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    totalRecords: {
      type: Number,
      default: undefined,
    },
    pageInfo: {
      type: Object,
      default() {
        return {}
      },
    },
    createOptions: {
      type: Object,
      default() {
        return {}
      },
    },
    searchOptions: {
      type: Object,
      default() {
        return {
          enabled: true,
        }
      },
    },
    selectOptions: {
      type: Object,
      default() {
        return {
          enabled: true,
          selectOnCheckboxOnly: true,
          disableSelectInfo: true,
        }
      },
    },
    sortOptions: {
      type: Object,
      default() {
        return {
          enabled: true,
        }
      },
    },
    deleteOptions: {
      type: Object,
      default() {
        return {
          enabled: true,
        }
      },
    },
    paginationOptions: {
      type: Object,
      default() {
        return {
          enabled: true,
          perPage: 20,
          mode: 'pages',
          perPageDropdown: [5, 10, 25],
          dropdownAllowAll: false,
        }
      },
    },
    listMode: {
      type: Boolean,
      default() {
        return false
      },
    },
    bordered: {
      type: Boolean,
      default() {
        return false
      },
    },
    hasAction: {
      type: Boolean,
      default() {
        return false
      },
    },
    isLoading: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  data() {
    return {
      nTableSearch: '',
      isRowSelected: false,
      isModalDeleteShow: false,
    }
  },
  computed: {
    tableProps() {
      const props = { ...{}, ...{ ...this.$props, ...this.$attrs } }
      return omit(props, [
        'totalRecords',
        'pageInfo',
        'createOptions',
        'searchOptions',
        'selectOptions',
        'sortOptions',
        'deleteOptions',
        'paginationOptions',
        'listMode',
        'bordered',
        'hasAction',
        'isLoading',
      ])
    },
    computedColumns() {
      const currencyFn = this.$__.currency
      const shortDateFn = this.$__.shortDate
      return this.columns.map(function (column) {
        if (typeof column.type !== 'undefined') {
          switch (column.type) {
            case 'currency':
              column.formatFn = currencyFn
              break
            case 'date_short':
              column.formatFn = shortDateFn
              column.tdClass = 'n-table-cell-date-short'
              break
            case 'action':
              column.sortable = false
              column.tdClass = 'n-table-cell-action'
              break
            default:
              break
          }
        }

        const newColumn = defaults(column, {
          align: 'left',
          thClass: '',
          tdClass: '',
        })

        if (newColumn.align === 'left') {
          newColumn.thClass += ' md:text-left'
          newColumn.tdClass += ' md:text-left'
        } else if (newColumn.align === 'center') {
          newColumn.thClass += ' md:text-center'
          newColumn.tdClass += ' md:text-center'
        } else if (newColumn.align === 'right') {
          newColumn.thClass += ' md:text-right'
          newColumn.tdClass += ' md:text-right'
        }
        newColumn.thClass = trim(newColumn.thClass)
        newColumn.tdClass = trim(newColumn.tdClass)

        return newColumn
      })
    },
    computedCreateOptions() {
      return defaults(this.createOptions, {
        enabled: true,
        label: 'Create',
      })
    },
    computedSelectOptions() {
      return this.selectOptions
    },
    computedSortOptions() {
      return this.sortOptions
    },
    computedPaginationOptions() {
      return this.paginationOptions
    },
    computedTotalRecords() {
      return this.totalRecords
    },
    computedIsLoading() {
      return this.isLoading
    },
    styleClass() {
      let tableClass = 'custom-table'
      if (this.listMode) {
        tableClass += ' list-mode'
      }
      if (this.hasAction || some(this.columns, ['type', 'action'])) {
        tableClass += ' has-action'
      }

      if (this.bordered) {
        tableClass += ' bordered'
      }

      return tableClass
    },
  },
  watch: {
    computedTotalRecords: {
      handler() {
        // this.computedPaginationOptions.enabled = false
        // if (value > this.computedPaginationOptions.perPage) {
        //   this.computedPaginationOptions.enabled = true
        // }
      },
      immediate: true,
    },
    listMode: {
      handler(listMode) {
        if (listMode) {
          this.computedSelectOptions.enabled = false
          this.computedSortOptions.enabled = false
        }
      },
      immediate: true,
    },
  },
  methods: {
    onRowClick(params) {
      if (
        params.event.target.type !== 'checkbox' &&
        params.event.target.tagName !== 'A'
      ) {
        this.$emit('on-row-tap', params)
      }
    },
    onSelectedRowsChange() {
      this.isRowSelected = this.$refs.table.selectedRowCount > 0
    },
    clearSelection() {
      this.$refs.table.unselectAllInternal()
      this.isRowSelected = false
    },
    selectedRows() {
      return this.$refs.table.selectedRows
    },
    onPageChange(params) {
      window.scrollTo(0, 0)
      this.$emit('on-page-change', params)
    },
    onPerPageChange(params) {
      window.scrollTo(0, 0)
      this.$emit('on-per-page-change', params)
    },
    onCreate() {
      this.$emit('on-create')
    },
    onDelete(event) {
      const deletedRows = this.$refs.table.selectedRows
      this.$emit('on-delete', { deletedRows, event })
      this.clearSelection()
      this.onModalDeleteHide()
    },
    onDeleteCancel(event) {
      this.$emit('on-delete-cancel', { event })
      this.clearSelection()
      this.onModalDeleteHide()
    },
    onModalDeleteShow() {
      this.isModalDeleteShow = true
    },
    onModalDeleteHide() {
      this.isModalDeleteShow = false
    },
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.slide-leave-active,
.slide-enter-active {
  transition: 0.2s;
}
.slide-enter {
  transform: translate(-10%, 0);
}
.slide-leave-to {
  transform: translate(-10%, 0);
}
</style>
