/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#e4eff5',
        'blue-lite': '#eff8fc',
        'gray': '#2a2c2e',
        'gray-lite': '#7c8285',
        'link': '#ef476f'
      },
    },
  },
  plugins: [],
}

