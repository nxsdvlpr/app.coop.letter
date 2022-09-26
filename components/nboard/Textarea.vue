<template>
  <textarea
    class="w-full px-3 py-2 border rounded outline-none text-gray-dark border-gray-light focus:border-gray-400 focus:ring-0 n-textarea"
    v-bind="inputProps"
    @input="onInput"
    @change="onChange"
  />
</template>

<script>
export default {
  name: "NTextarea",
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: undefined,
    },
    autocomplete: {
      type: Boolean,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: undefined,
    },
    placeholder: {
      type: [String, Number],
      default: undefined,
    },
    rows: {
      type: [String, Number],
      default: undefined,
    },
    cols: {
      type: [String, Number],
      default: undefined,
    },
    value: {
      type: [String, Number],
      default: undefined,
    },
  },
  computed: {
    inputProps() {
      const props = { ...{}, ...this.$props };
      return props;
    },
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.value);
    },
    onChange(event) {
      this.$emit("change", event.target.value);
    },
  },
};
</script>

<style scoped>
.n-textarea {
  box-shadow: inherit;
  /* -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04); */
}

input[disabled],
textarea[disabled] {
  cursor: not-allowed;
  background-color: #f8f8f8;
}
</style>
