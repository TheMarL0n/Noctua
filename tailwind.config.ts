/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'main-c': '#17141E',
      'secundary-c': '#22212A',
      'main-text-color': '#F2F2F2',
      'blue-one': '#24EDE7',
      'white': '#ffffff',
      'white-one': '#BCC1CC',
      'gray-one': '#9399A3',
      'gray-two': '#565966',
      'gray-three': '#313139',
      'gray-four': '#E5E5E5',
      'gray-five': '#21212A',
      'gray-six': '#9CA0B2',
      'gray-seven': '#636672',
      'gray-eight': '#82858F',
      'gray-nine': '#676767',
      'gray-ten': '#31303A',
      'warning': '#FFC800',
      'error': '#FF004F',
      'black': '#000000',
      'overlay': 'rgba(0, 0, 0, 0.7)'
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      'custom-large': '50px',
      'custom-medium': '22px',
      'custom-regular': '14px',
    },
    backgroundImage: {
      'left-hero-pattern': "url('/imgs/left-hero-pattern.png')",
    }
  },
  plugins: [],
};
