/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'system-ui', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        sora:    ['"Sora"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
