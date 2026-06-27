/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Josefin Sans'", 'sans-serif'],
        body:    ["'Barlow'", 'sans-serif'],
        serif:   ["'Cormorant Garamond'", 'serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#1a3a5c',
          light:   '#2d4a6b',
          dark:    '#0e2540',
        },
        pearl: '#edf1f6',
      },
    },
  },
  plugins: [],
}
