import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'src/index.tsx',
  output: {
    dir: 'output',
    format: 'esm'
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    typescript(),
  ]
};

export default config;