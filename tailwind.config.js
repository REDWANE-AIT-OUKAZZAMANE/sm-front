/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkBlue: '#141A23',
        xPurple: '#6b4f80',
        textMuted: '#9CA0AC',
        textOrange: '#FA8F21',
        textBlue: '#0081FF',
        textBlack: '#1E1E1E',
        dPurple: '#5F4080',
        lightGrey: '#C4C8CD',
        btnPurple: '#66328E',
        darkPurple: '#492E65',
        lightRed: '#df797a',
        darkGrey:"#8D91A0"
      },
      fontSize: {
        dynamicXS: 'clamp(0.6rem, 0.5vw, 1.5rem)',
        dynamicS: 'clamp(0.8rem, 0.7vw, 1.6rem)',
        dynamicM: 'clamp(1rem, 0.8vw, 2rem)',
        dynamicL: 'clamp(1.6rem, 1.5vw, 2.6rem)',
        dynamicXL: 'clamp(2.4rem, 2vw, 3.2rem)',
        dynamicIcon: 'clamp(20rem, 20vw, 40rem)',
      },
      fontFamily: {
        backOffice: ['inter'],
        Lato: ['Lato'],
        poppins: ['Poppins', 'sans-serif'],
      },
      aspectRatio: {
        '4/5': '4 / 3',
      },
      gridTemplateColumns: {
        autofit: 'repeat(auto-fit, minmax(35vh,1fr))',
      },
    },
  },
};
