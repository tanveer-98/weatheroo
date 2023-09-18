module.exports = {
  content: [
    './dist/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './*.html',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin.cjs')
  ],
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif']
    }
  }
}
