/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgdark: "#000000", 
        bgcolor: "#ffd000",
        light: "#ffd829",
        mdlight: "#fcdc49",
        fulllight: "#f7eec6",
        adminPrimary: "#4B0082",
        adminSecondary: "#FFFDD0",
        adminAccent: "#FFD700",
        adminbtn: "#191970",
      },
      container: {
        center: true,
        padding: {
          default: "1rem",
          sm: "3rem",
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
