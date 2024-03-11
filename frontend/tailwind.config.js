/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#63A94A',
          50: '#CEE6C5',
          100: '#C1DFB7',
          200: '#A9D39A',
          300: '#91C77E',
          400: '#79BA62',
          500: '#63A94A',
          600: '#4C8239',
          700: '#355B28',
          800: '#1E3417',
          900: '#080D06',
          950: '#000000'
        },
        secondary: {
          DEFAULT: '#3B3B3B',
          50: '#979797',
          100: '#8D8D8D',
          200: '#787878',
          300: '#646464',
          400: '#4F4F4F',
          500: '#3B3B3B',
          600: '#1F1F1F',
          700: '#030303',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        }
      }
    }
  },
  plugins: []
}
