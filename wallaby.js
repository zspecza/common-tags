module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js'
    ],

    tests: [
      'src/**/*.test.js'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'ava',

    debug: true
  }
}
