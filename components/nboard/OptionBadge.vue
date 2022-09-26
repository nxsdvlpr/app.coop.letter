<template>
  <NBadge class="label uppercase" :class="selected.class">{{
    selected.label
  }}</NBadge>
</template>

<script>
export default {
  name: "NOptionBadge",
  props: {
    value: {
      type: [Number, String, Boolean],
      default: 0,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  computed: {
    selected() {
      return (
        this.options.find((option) => option.value === this.value) ||
        this.options[0]
      );
    },
  },
};
</script>
