module.exports = {
  content: [    './pages/**/*.{html,js,vue}',
    './components/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        'light': {
          'very-light-gray': '#fafafa',
          'very-light-grayish-blue': '#e4e5f1',
          'light-grayish-blue': '#d2d3db',
          'dark-grayish-blue': '#9394a5',
          'very-dark-grayish-blue': '#484b6a',
        },
        'dark': {
          'very-dark-blue': '#161722',
          'very-dark-desaturated-blue': '#25273c',
          'light-grayish-blue': '#25273c',
          'hover-light-grayish-blue': '#e4e5f1',
          'dark-grayish-blue': '#777a92',
          'very-dark-grayish-blue': '#4d5066',
          'second-very-dark-grayish-blue': '#393a4c',
        }
      },
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  darkMode: 'media'
};
