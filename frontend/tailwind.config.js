/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '540px',
      'xs-1': '625px',
      'sm': '640px',
      'sm-1': '690px',
      'md': '768px',
      'md-1': '905px',
      'lg-0': '975px',
      'lg': '1024px',
      'lg-1': '1210px',
      'xl': '1280px',
      'xl-0': '1400px',
      'xl-1': '1480px',
      '2xl': '1536px',
    },
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
        darker: '#2b2e38',
        primary: '#24272E',
        secondary: '#1C1E24',
        tertiary: '#16181D',
        rmtheme: '#489eb2',
        rmthemebright: '#2faecb',
      },
      boxShadow: {
        'aura-light': '0 0 10px 5px rgba(255, 255, 255, 0.3)',
        'aura-dark': '0 0 10px 5px rgba(67, 56, 202, 0.3)',
      },
      backgroundImage: {
        'portal-pattern': "url('./images/button.png')"
      },
      spacing: {
        '42': '10.5rem',
        '49': '12.25rem',
        '54': '13.5rem',
        '55': '13.75rem',
        '84': '21rem',
        '92': '23rem',
        '100': '25rem',
        '110': '27.5rem',
        '120': '30rem',
      },
    },
  },
  plugins: [],
}