/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#18181b',
        secondary: '#27272a',
        tertiary: '#3f3f46',
        quaternary: '#52525b',
      },
    },
  },
  plugins: [],
}