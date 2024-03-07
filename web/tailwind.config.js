module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        blue: {
          500: "#5E17F5",
        },
        customBlue: {
          500: "#00BDFF",
        },
        customDark: {
          500: "#121929",
        },
        // Adicionando a cor customDark-500 com opacidade
        "customDark-12": "rgba(18, 25, 41, 0.12)", // 0.12 é a opacidade desejada
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
