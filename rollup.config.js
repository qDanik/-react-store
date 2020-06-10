import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';
import dts from 'rollup-plugin-dts';
import pkg from './package.json'

export default [
  {
    input: './src/index.ts',
    plugins: [
      typescript({
        lib: ["es5", "es6", "dom"],
        target: "es5"
      }),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.ts', '.tsx'],
      }),
    ],
    output: [{
      file: pkg.main,
      format: "cjs"
    }],
    external: [
      ...Object.keys(pkg.devDependencies || {}),
    ],
  },
  {
    input: './src/index.ts',
    plugins: [
      dts()
    ],
    output: [{
      file: pkg.types,
      format: "es"
    }],
  }
]
