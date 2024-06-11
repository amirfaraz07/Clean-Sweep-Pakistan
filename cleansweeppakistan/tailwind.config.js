/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{html,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      },
    },
    plugins: [
      function ({ addBase }) {
        addBase({
          '*, *::before, *::after': {
            margin: 0,
            padding: 0,
          },
        });
      },
    ],
  }