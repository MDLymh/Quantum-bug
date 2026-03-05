/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./resources/**/*.blade.php",
      "./resources/**/*.tsx",
      "./resources/**/*.js",
      "./resources/**/*.jsx",
    ],
    theme: {
      extend: {
        colors: {
          'qb-blue': '#35AAF9',
          'qb-dark': '#04004D',
          'qb-gray': '#35353A',
          'qb-purple': '#D130F2',
          'qb-cyan': '#2FF4EE',
        },
        keyframes: {
          glitch: {
            '0%, 100%': { transform: 'translate(0)' },
            '20%': { transform: 'translate(-3px, 3px)' },
            '40%': { transform: 'translate(-3px, -3px)' },
            '60%': { transform: 'translate(3px, 3px)' },
            '80%': { transform: 'translate(3px, -3px)' },
          }
        },
        animation: {
          'glitch-fast': 'glitch 0.2s infinite',
          'glitch-slow': 'glitch 3s infinite',
        }
      },
    },
    plugins: [],
  }