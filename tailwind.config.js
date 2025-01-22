/** @type {import('tailwindcss').Config} */
export default {
  content: [ './index.html', './src/**/*.{js,jsx,ts,tsx}', // Incluye todos los archivos JS/JSX y TS/TSX
  ],
  theme: {
    extend: {
      
      colors: {
        neutral: {
          light: '#f7f7f7',
          DEFAULT: '#e0e0e0',
          dark: '#333333',
        },
        primary: '#4a90e2',
        success: '#4caf50',
        warning: '#f5a623',
        error: '#e74c3c',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

    },
  },
  plugins: [],
}

