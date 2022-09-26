const plugin = require('tailwindcss/plugin')

const utilities = plugin(function ({ addUtilities }) {
  const newUtilities = {
    '.font-primary': {
      fontFamily: 'Mukta, sans-serif',
    },
    '.label': {
      fontSize: '0.76rem',
      fontWeight: '700',
      lineHeight: '0.72rem',
    },
    '.label-sm': {
      fontSize: '0.68rem',
      fontWeight: '700',
      lineHeight: '0.58rem',
    },
    '.label-lg': {
      fontSize: '0.88rem',
      fontWeight: '700',
      lineHeight: '0.80rem',
    },
    '.label-xl': {
      fontSize: '1rem',
      fontWeight: '700',
      lineHeight: '0.86rem',
    },
    '.link': {
      fontWeight: '400',
      color: '#01cb63',
    },
    '.link-sm': {
      fontSize: '0.94rem',
      fontWeight: '500',
    },
  }
  addUtilities(newUtilities, ['responsive', 'hover'])
})

module.exports = utilities
