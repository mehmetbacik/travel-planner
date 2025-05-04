/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5A5F',
        secondary: '#007A87',
        accent: '#FFB400',
        'background-light': '#F9F9F9',
        'background-dark': '#2C3E50',
        'text-primary': '#2B2B2B',
        'text-secondary': '#666666',
        'text-on-primary': '#FFFFFF',
        'border-color': '#E0E0E0',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#E74C3C',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 