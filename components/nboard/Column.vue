<script>
export default {
  name: 'NColumn',
  props: {
    gap: {
      type: String,
      default: '4',
    },
    responsive: {
      type: Boolean,
      default: true,
    },
    wrapperClass: {
      type: String,
      default: undefined,
    },
    childClass: {
      type: Array,
      default: null,
    },
  },
  render(h) {
    const children = []

    if (!this.$slots.default) {
      return ''
    }

    // Filter only valid slots
    // Need this to fix bug for undefined slot at static generated site
    const slotContent = this.$slots.default.filter(
      (slot) => typeof slot.tag !== 'undefined'
    )

    // Minimum column number is 2.
    // If only 1 slot child found, automatically create empty div for second column
    if (slotContent.length === 1) {
      slotContent.push('')
    }

    if (this.childClass && this.childClass.length !== slotContent.length) {
      return h(
        'div',
        { class: '' },
        'NColumn custom widths length must have equal to child elements number.'
      )
    }

    let wrapperClass = `flex gap-y-2 md:flex-row gap-x-${this.gap}`

    if (this.wrapperClass) {
      wrapperClass += ` ${this.wrapperClass}`
    }

    wrapperClass += this.responsive ? ' flex-col' : ''

    for (let i = 0; i < slotContent.length; i++) {
      let childClass = this.responsive ? 'w-full' : ''

      childClass =
        this.childClass && this.childClass.length > 0
          ? ` ${this.childClass[i]}`
          : ` md:w-1/${slotContent.length}`

      children.push(h('div', { class: childClass }, [slotContent[i]]))
    }

    return h('div', { class: wrapperClass }, children)
  },
}
</script>
