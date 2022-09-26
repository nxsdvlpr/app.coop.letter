<script>
export default {
  name: "NButtonGroup",
  props: {
    gap: {
      type: String,
      default: "3",
    },
  },
  render(h) {
    const children = [];

    // Filter only valid slots
    // Need this to fix bug for undefined slot at static generated site
    const slotContent = this.$slots.default.filter(
      (slot) => typeof slot.tag !== "undefined"
    );

    for (const child of slotContent) {
      children.push(h("div", null, [child]));
    }

    return h(
      "div",
      { class: "n-button-group flex gap-x-" + this.gap },
      children
    );
  },
};
</script>
