import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  daStyle,
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
