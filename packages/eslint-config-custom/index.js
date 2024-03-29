module.exports = {
  extends: ['next/core-web-vitals', 'prettier', 'plugin:storybook/recommended'],
  plugins: ['prettier', 'testing-library', 'valtio'],
  rules: {
    'prettier/prettier': 'warn',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'],
      },
    ],
    'valtio/state-snapshot-rule': 'error',
    'valtio/avoid-this-in-proxy': 'error',
    complexity: ['error', { max: 14 }],
    '@next/next/no-img-element': 'off',
  },
  overrides: [
    // Only uses Testing Library lint rules in test files
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
