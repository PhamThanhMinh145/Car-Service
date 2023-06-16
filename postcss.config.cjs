module.exports = {
  plugins: {
    tailwindcss: {
      content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
      darkMode: "media",
      theme: {},
    },
    autoprefixer: {},
  },
};
