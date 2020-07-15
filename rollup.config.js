import babel from '@rollup/plugin-babel'
import localResolve from 'rollup-plugin-local-resolve'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

const vendors = []
  // Make all external dependencies to be exclude from rollup
  .concat(
    Object.keys(pkg.dependencies || {}),
    Object.keys(pkg.peerDependencies || {}),
  )

export default ['esm', 'cjs', 'umd'].map(format => ({
  input: {
    'index': 'src/index.js'
  },
  output: [
    {
      dir: 'lib',
      entryFileNames: '[name].[format].js',
      exports: 'named',
      name: 'rawcharts',
      format,
    }
  ],
  external: format !== "umd" ? vendors : undefined,
  plugins: [
    localResolve(),
    resolve(),
    commonjs(),
    babel({ exclude: 'node_modules/**' }),
  ],
}))