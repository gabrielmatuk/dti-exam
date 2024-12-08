module.exports = {
  extends: ['custom/base', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  ignorePatterns: ['tailwind.config.js', 'postcss.config.cjs'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};