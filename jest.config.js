module.exports = {
  verbose: true,
  collectCoverage: true,
  bail: true,
  coverageDirectory: './coverage/',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
