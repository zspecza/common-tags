'use strict'

const isCjsEnv = process.env.BABEL_ENV === 'cjs'
const isEsEnv = process.env.BABEL_ENV === 'es'

module.exports = {
  sourceMaps: 'inline',

  presets: [
    ['latest', {
      es2015: {
        modules: isEsEnv ? false : 'commonjs'
      }
    }]
  ],

  plugins: [
    ...(isCjsEnv ? ['add-module-exports'] : []),
    'transform-class-properties',
    'transform-export-extensions',
    'transform-runtime'
  ]
}
