<script>
export default {
  props: {
    gap: {
      type: String,
      default: '8',
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    widerFirst: {
      type: Boolean,
      default: true,
    },
    widths: {
      type: Array,
      default: null,
    },
  },
  render(h) {
    const children = []

    // Filter only valid slots
    // Need this to fix bug for undefined slot at static generated site
    const slotContent = this.$slots.default.filter(
      (slot) => typeof slot.tag !== 'undefined'
    )

    if (slotContent.length !== 2) {
      return h(
        'div',
        { class: '' },
        'NPanelOneTwo must have exactly 2 child element.'
      )
    }

    if (this.widths && this.widths.length !== 2) {
      return h(
        'div',
        { class: '' },
        'NPanelOneTwo must have exactly 2 custom widths.'
      )
    }

    let widths = this.widerFirst
      ? ['lg:w-2/3', 'lg:w-1/3']
      : ['lg:w-1/3', 'lg:w-2/3']

    widths = this.widths && this.widths.length > 0 ? this.widths : widths

    let direction = ''
    if (this.reverse) {
      direction = 'lg:flex-row-reverse'
      widths.reverse()
    }

    for (let i = 0; i < slotContent.length; i++) {
      const childClass = `${widths[i]}`
      children.push(h('div', { class: childClass }, [slotContent[i]]))
    }

    const wrapperClass = `flex flex-col gap-y-${Math.floor(
      this.gap / 2
    )} lg:flex-row lg:gap-x-${this.gap} ${direction} n-panel-one-two`

    return h(
      'div',
      {
        class: wrapperClass,
      },
      children
    )
  },
}
</script>

<style lang="postcss" scoped>
.n-panel-one-two {
  &:last-child {
    @apply mb-8 lg:mb-14;
  }
}
</style>
