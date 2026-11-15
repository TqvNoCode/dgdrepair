/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#0D1117',
        darkSurface: '#161B22',
        darkSurfaceElevated: '#21262D',
        darkBorder: '#30363D',
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          light: '#60A5FA',
          dark: '#1D4ED8'
        },
        secondary: {
          DEFAULT: '#22C55E',
          hover: '#16A34A',
          light: '#4ADE80',
          dark: '#15803D'
        },
        darkText: '#F3F4F6',
        darkMuted: '#9CA3AF'
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
