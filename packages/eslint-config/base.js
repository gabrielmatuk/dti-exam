module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'packages/eslint-config-custom'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {},
      node: {},
    },
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'prettier/prettier': 'warn',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['type', 'object', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
  },
};