/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FDF8F5',
          light: '#FFFDFB',
          dark: '#F5ECE5',
          subtle: '#EDE2D8',
        },
        blush: {
          DEFAULT: '#E8B4B8',
          light: '#F4D3D6',
          dark: '#D1969B',
        },
        burgundy: {
          DEFAULT: '#6B2737',
          deep: '#471420',
          dark: '#3A101A',
          light: '#8E354A',
          muted: 'rgba(107, 39, 55, 0.15)',
        },
        almostBlack: {
          DEFAULT: '#171315',
          soft: '#201A1D',
          card: '#1C1719',
          deep: '#0F0C0D',
        },
        champagne: {
          DEFAULT: '#E9D8C8',
          light: '#F4ECE4',
          dark: '#D6C0AD',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', '"Alex Brush"', 'cursive'],
      },
      animation: {
        'slow-zoom': 'zoomEffect 24s ease-in-out infinite alternate',
        'subtle-pulse': 'pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        zoomEffect: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
