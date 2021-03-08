module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',

  globals: {
    console: true,
  },

  rules: {
    strict: [2, 'global'],

    'no-param-reassign': 2,
  },

  overrides: [
    {
      files: ['.babelrc.js', '.eslintrc.js', 'jest.config.js'],

      parserOptions: {
        sourceType: 'script',
      },

      env: {
        node: true,
      },
    },
    {
      files: '*.test.js',

      env: {
        es6: true,
        jest: true,
        node: true,
      },
    },
  ],
};
