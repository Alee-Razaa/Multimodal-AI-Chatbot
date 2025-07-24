/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'flicker': 'flicker 2s infinite',
        'fade-in': 'fadeIn 3s ease-in forwards',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      colors:{
        my_color:'#a78bfa',
        brand: {
          light: '#3AB0FF',
          DEFAULT: '#0081C9',
          dark: '#005A8D',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      }
    },
    screens: {
      'xs': '480px', // Now you can use `xs:` prefix
    },
  },
  plugins: [],
}

