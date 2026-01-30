import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Ignore build output
  {
    ignores: ['dist'],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // React + JSX rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      'react/jsx-no-target-blank': 'off',

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // R3F / Three.js JSX props
      'react/no-unknown-property': [
        'error',
        {
          ignore: [
            'attach',
            'args',
            'geometry',
            'material',
            'position',
            'rotation',
            'scale',
            'transparent',
            'alphaTest',
            'depthTest',
            'depthWrite',
            'blending',
            'intensity',
          ],
        },
      ],
    },
  },

  // MUST BE LAST — disables conflicting formatting rules
  prettierConfig,
];
