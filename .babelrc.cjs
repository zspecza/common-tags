'use strict';

const presetEnv = require('@babel/preset-env');
const pluginProposalClassProperties = require('@babel/plugin-proposal-class-properties');
const pluginProposalExportDefaultFrom = require('@babel/plugin-proposal-export-default-from');
const pluginAddModuleExports = require('babel-plugin-add-module-exports');

const isEsEnv = process.env.BABEL_ENV === 'es';

module.exports = {
  sourceMaps: 'inline',

  presets: [
    [
      presetEnv,
      {
        modules: isEsEnv ? false : 'commonjs',
        loose: true,
      },
    ],
  ],

  plugins: [
    ...(isEsEnv ? [] : [pluginAddModuleExports]),
    pluginProposalClassProperties,
    pluginProposalExportDefaultFrom,
  ],
};
