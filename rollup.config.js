import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
    extend: true,
    file: 'dist/common-tags.min.js',
    format: 'umd',
    indent: false,
    name: 'commonTags',
  },
  plugins: [babel(), resolve(), uglify()],
};
