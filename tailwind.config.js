/** @type {import('tailwindcss').Config} */

const {colors} = require("./src/theme/colors");

module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      ...colors,
    },
    extend: {},
  },
  plugins: [],
};
