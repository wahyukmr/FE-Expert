import pluginJs from '@eslint/js';
import dicodingStyle from 'eslint-config-dicodingacademy';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  dicodingStyle,
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      camelcase: ['error', { properties: 'never' }],
    },
  },
];
