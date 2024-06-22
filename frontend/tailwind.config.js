/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      colors: {
        lightest: '#4E535E',
        lighter: '#353944',
        primary: '#24272E',
        secondary: '#1C1E24',
        tertiary: '#16181D',
      },
      boxShadow: {
        'aura-light': '0 0 10px 5px rgba(255, 255, 255, 0.3)',
        'aura-dark': '0 0 10px 5px rgba(67, 56, 202, 0.3)',
      },
      backgroundImage: {
        'portal-pattern': "url('./images/button.png')"
      },
    },
  },
  plugins: [],
}