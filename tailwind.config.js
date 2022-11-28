module.exports = {
  content: [
    "./screens/**/*.{ts,tsx,js,jsx}",
    "./App.js",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
