module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    /* "plugin:@eslint/js/recommended", */ "plugin:react/recommended",
  ],
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
    camelcase: ["error", { properties: "never", ignoreImports: true }],
    // "import/extensions": ["error", "ignorePackages"],
    "import/no-unresolved": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
  },
  settings: {
    react: {
      version: "detect", // Автоматическое определение версии React
    },
  },
  plugins: ["import"],
};
