/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32',
          light: '#E8F5E9',
        },
        secondary: '#4CAF50',
        accent: '#F9A825',
        background: '#F8FAF5',
        dark: '#263238',
        lightText: '#607D8B',
        borderCol: '#E0E0E0',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 5px 20px rgba(0,0,0,0.08)',
        hoverCard: '0 15px 35px rgba(0,0,0,0.12)',
        whyCard: '0 10px 30px rgba(0,0,0,0.06)',
        whyCardHover: '0 18px 40px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        custom: '12px',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
