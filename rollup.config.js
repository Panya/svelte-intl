import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';

export default {
  input: 'module.js',
  output: {
    file: 'dist/svelte-intl.js',
    format: 'umd',
    name: 'svelte.intl'
  },
  plugins: [
    resolve(),
    commonjs(),
    buble()
  ]
};
