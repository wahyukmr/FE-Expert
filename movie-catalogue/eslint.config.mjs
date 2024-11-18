import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  daStyle,
  // eslintPluginPrettierRecommended,

  {
    rules: {
      // "prettier/prettier": "error",
      'linebreak-style': ['error', 'unix'],
      properties: 'never',
    },
  },
];
