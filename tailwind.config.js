/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        secondary: '#50E3C2',
        accent: '#F5A623',
        'base-100': '#FFFFFF',
        'base-200': '#F5F5F5',
        'base-300': '#E0E0E0',
        info: '#4A90E2',
        success: '#7ED321',
        warning: '#F8E71C',
        error: '#D0021B',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
