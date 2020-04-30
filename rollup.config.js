import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { eslint } from 'rollup-plugin-eslint'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const libraryName = 'store'
const globalLibs = Object.keys(pkg.dependencies)
const externalLibs = Object.keys(pkg.peerDependencies)

export default {
  input: 'src/index.ts',
  output: [{
    file: pkg.main,
    format: 'umd',
    globals: globalLibs,
    name: libraryName
  }, {
    file: pkg.module,
    format: 'es',
    globals: globalLibs,
    name: libraryName
  }],
  plugins: [
    postcss({
      modules: true
    }),
    eslint({
      include: './src/**/*.tsx?'
    }),
    typescript({
      clean: true,
      typescript: require('typescript'),
      verbosity: 0,
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          module: "es2015"
        }
      }
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ],
  external: externalLibs
}
