module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#333333', // Custom dark gray for navbar
        customYellow: '#FFD700', // Golden yellow for titles
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};