// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/main.jsx', // Entry point
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // Suitable for web
    name: 'KRISHNAJI',
  },
  plugins: [
    nodeResolve(), // Resolves node modules
    commonjs(), // Converts CommonJS to ES6
    babel({
      babelHelpers: 'bundled', // Includes Babel helpers in the bundle
      exclude: 'node_modules/**', // Avoid transpiling node_modules
      presets: ['@babel/preset-env', '@babel/preset-react'], // Enable JSX and modern JS
    }),
  ],
};