/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        xl: '0.9rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,.04), 0 6px 18px rgba(15,23,42,.04)',
      },
    },
  },
  plugins: [],
}
