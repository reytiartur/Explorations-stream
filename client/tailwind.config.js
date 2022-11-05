/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '976px',
      'xl': '1240px',
      '2xl': '1440px'
    },

    extend: {
      colors: {
      'primary': '#b0126b',
      'secondary': '#2e2e2e'
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
