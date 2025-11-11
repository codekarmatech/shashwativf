/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0891B2', // Updated to a more modern teal
          tealSoft: '#E6FFFA',
          lavender: '#A855F7', // Updated to a more vibrant purple
          coral: '#F97316', // Updated to a warmer orange
          ink: '#0F172A',
          muted: '#64748B',
          bg: '#FAFBFC', // Slightly warmer background
          surface: '#FFFFFF',
          accent: '#06B6D4', // New accent color
          success: '#10B981',
          warning: '#F59E0B',
        }
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 18px 45px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 25px 60px rgba(15, 23, 42, 0.12)',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      backdropBlur: {
        'xl': '24px',
      }
    },
  },
  plugins: [],
}
