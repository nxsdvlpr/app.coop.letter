const colors = require('./lib/colors.js')

module.exports = {
  purge: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
    ],
    safelist: {
      standard: [
        /sr-only/,
        /[a-z]+-color-[0-9]+-[a-z]+/,
        /(sm|md|lg|xl):gap-[xy]-[0-9]/,
      ],
    },
  },
  darkMode: false,
  theme: {
    screens: {
      sm: '640px',
      md: '959px',
      lg: '960px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontSize: {
      '4xs': ['0.72rem', '1rem'],
      '3xs': ['0.82rem', '1.10rem'],
      '2xs': ['0.85rem', '1.12rem'],
      xxs: ['0.78rem', '1.08rem'],
      xs: ['0.9rem', '1.16rem'],
      sm: ['0.972rem', '1.36rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.062rem', '1.6rem'],
      xl: ['1.25rem', '1.75rem'],
      xxl: ['2.25rem', '2.5rem'],
      '2xl': ['1.5rem', '2.25rem'],
      '3xl': ['1.875rem', '2.25rem'],
      '4xl': ['2.25rem', '2.5rem'],
      '5xl': ['3rem', 1],
      '6xl': ['3.75rem', 1],
      '7xl': ['4.5rem', 1],
      '8xl': ['8rem', '4.5rem'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    extend: {
      colors: {
        app: {
          lightest: '#fdfdfd',
          light: '#f8f8f8',
          dark: '#171d29',
        },
        primary: {
          semi: '#ccf5e0',
          light: '#00d768',
          DEFAULT: '#01cb63',
          dark: '#01a550',
        },
        secondary: {
          semi: '#e0e9ff',
          light: '#719bff',
          DEFAULT: '#6391ff',
          dark: '#3b6adb',
        },
        success: {
          semi: '#ccf5e0',
          light: '#00d768',
          DEFAULT: '#01cb63',
          dark: '#01a550',
        },
        danger: {
          semi: '#fff4f4',
          light: '#ffa4a4',
          DEFAULT: '#f86161',
          dark: '#e84343',
        },
        info: {
          semi: '#fff4cc',
          light: '#ffe587',
          DEFAULT: '#ffd954',
          dark: '#f4c20e',
        },
        gray: {
          semi: '#fbfbfb',
          lightest: '#e1e1e1',
          light: '#ced4da',
          base: '#586163',
          dark: '#313131',
          darkest: '#222222',
        },
        color: colors,
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      borderColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('./plugins/tailwindcss/components'),
  ],
}
