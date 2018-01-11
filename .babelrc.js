const isCjsEnv = process.env.BABEL_ENV === 'cjs';
const isEsEnv = process.env.BABEL_ENV === 'es';

module.exports = {
  sourceMaps: 'inline',

  presets: [
    [
      'env',
      {
        modules: isEsEnv ? false : 'commonjs',
      },
    ],
  ],

  plugins: [
    ...(isCjsEnv ? ['add-module-exports'] : []),
    'transform-class-properties',
    'transform-export-extensions',
    'transform-runtime',
  ],
};
