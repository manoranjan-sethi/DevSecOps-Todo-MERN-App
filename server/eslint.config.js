import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/*', 'dist/*', 'build/*'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': ['warn'],
      'no-unused-vars': ['warn'],
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
    },
  },
];
