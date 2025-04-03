module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#000080',       // Primary navy blue
        'navy-light': '#1a1aff', // Lighter navy for hover states
        'white': '#ffffff',      // Pure white
        'gray-light': '#f5f5f5', // Light gray for backgrounds
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
