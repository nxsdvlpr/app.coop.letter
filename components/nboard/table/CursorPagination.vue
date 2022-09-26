<template>
  <div class="vgt-wrap__footer vgt-clearfix">
    <div class="footer__row-count vgt-pull-left">
      <form>
        <label
          for="vgt-select-rpp-637775178518"
          class="footer__row-count__label"
          >Rows per page:</label
        >
        <select
          v-model="perPage"
          autocomplete="off"
          name="perPageSelect"
          aria-controls="vgt-table"
          class="footer__row-count__select"
          @input="customPerPageChange($event.target.value)"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </form>
    </div>
    <div class="footer__navigation vgt-pull-right">
      <button
        type="button"
        aria-controls="vgt-table"
        class="footer__navigation__page-btn"
        :class="{ disabled: !computedPageInfo.hasPreviousPage }"
        @click="customPageChange('prev')"
      >
        <span aria-hidden="true" class="chevron left"></span>
        <span>Previous</span>
      </button>
      <button
        type="button"
        aria-controls="vgt-table"
        class="footer__navigation__page-btn"
        :class="{ disabled: !computedPageInfo.hasNextPage }"
        @click="customPageChange('next')"
      >
        <span>Next</span> <span aria-hidden="true" class="chevron right"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NTableCursorPagination",
  props: {
    pageInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      perPage: 20,
    };
  },
  computed: {
    computedPageInfo() {
      return this.pageInfo;
    },
  },
  mounted() {
    this.perPage = this.computedPageInfo.perPage;
  },
  methods: {
    customPageChange(value) {
      this.$emit("on-page-change", value);
    },
    customPerPageChange(customPerPage) {
      this.$emit("on-per-page-change", customPerPage);
    },
  },
};
</script>
