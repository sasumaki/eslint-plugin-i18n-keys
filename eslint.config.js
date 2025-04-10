"use strict";

// Import the ESLint plugin locally
const eslintI18n = require("./eslint-plugin-i18n");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
    },
    plugins: { "i18n-keys": eslintI18n },
    rules: {
      "i18n-keys/no-special-characters-in-keys": "error",
    
    },
  },
];
