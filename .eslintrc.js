module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", /* "plugin:@eslint/js/recommended", */ "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-empty": "warn",
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect", // Автоматическое определение версии React
    },
  },
};
