'use strict'

module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'script',
  },
  parser: 'babel-eslint',

  rules: {
    strict: [2, 'global'],
    'prettier/prettier': [
      2,
      {
        printWidth: 100,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },

  overrides: [
    {
      files: ['src/**/*.js'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
}
