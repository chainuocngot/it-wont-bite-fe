import { defineConfig, globalIgnores } from 'eslint/config';

import eslint from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**']),

  eslint.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,
  ...pluginQuery.configs['flat/recommended'],

  ...nextVitals,
  ...nextTs,

  eslintPluginPrettierRecommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-misused-promises': 'off',

      'react-hooks/set-state-in-effect': 'off',

      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      'prefer-const': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'prettier/prettier': [
        'warn',
        {
          printWidth: 100,
          singleQuote: true,
          trailingComma: 'all',
          tabWidth: 2,
          useTabs: false,
          semi: true,
          arrowParens: 'always',
          endOfLine: 'auto',
        },
      ],
    },
  },
]);

export default eslintConfig;
