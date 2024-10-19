/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          extraLight: '#A8E6CE', // Très clair
          light: '#A2DBA0',      // Clair
          DEFAULT: '#67CC31',     // Principal (vert)
          bold: '#4CA52C',       // Foncé
          extraBold: '#3A7B24',  // Très foncé
        },
        secondary: {
          extraLight: '#F3E5AB', // Très clair
          light: '#EAFF00',       // Clair (jaune)
          DEFAULT: '#EAFF00',     // Principal (jaune)
          bold: '#E1E000',        // Foncé
          extraBold: '#BDB800',   // Très foncé
        },
        textLight: {
          DEFAULT: '#FFFFFF',     // Blanc
        },
        backgroundDark: {
          DEFAULT: '#181818',      // Fond sombre
        },
      },
    },
  },
  plugins: [],
}