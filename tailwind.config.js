/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xl: { max: '1440px' },
      lg: { max: '1024px' },
      md: { max: '768px' },
      sm: { max: '425px' },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
      screens: {
        lg: '1024px',
      },
    },
    extend: {
      aspectRatio: {
        card: '5/7',
      },
      fontFamily: {
        amatic: 'var(--font-amatic)',
        // reenie: 'var(--font-reenie)',
      },
    },
  },
  plugins: [],
}
