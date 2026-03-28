/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",    // Emerald 500
        secondary: "#059669",  // Emerald 600
        accent: "#34d399",     // Emerald 400
        background: "#f0fdf4", // Green 50
        card: "rgba(255, 255, 255, 0.7)",
        border: "#a7f3d0",     // Emerald 200
        success: "#059669",
        warning: "#f59e0b",
        textMain: "#064e3b",   // Emerald 900
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        dyslexic: ['OpenDyslexic', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
