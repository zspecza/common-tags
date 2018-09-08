'use strict';

module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  parser: 'babel-eslint',

  rules: {
    strict: [2, 'global'],
  },

  overrides: {
    files: ['.babelrc.js', '.eslintrc.js', 'jest.config.js'],

    parserOptions: {
      sourceType: 'script',
    },
  },
};
