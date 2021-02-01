import babel from '@rollup/plugin-babel'
import localResolve from 'rollup-plugin-local-resolve'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import image from '@rollup/plugin-image'
import { string } from 'rollup-plugin-string'
import pkg from './package.json'

const vendors = []
  // Make all external dependencies to be exclude from rollup
  .concat(
    Object.keys(pkg.dependencies || {}), // TODO: keep or not?
    Object.keys(pkg.peerDependencies || {}),
    Object.keys(pkg.devDependencies || {})
  )
  .concat('./styles/base.css')
  

export default ['esm', 'cjs', 'umd'].map((format) => ({
  input: {
    index: 'src/index.js',
  },
  output: [
    {
      dir: 'lib',
      entryFileNames: '[name].[format].js',
      exports: 'named',
      name: 'rawcharts',
      format,
    },
  ],
  external: format !== 'umd' ? vendors : undefined,
  plugins: [
    localResolve(),
    resolve(),
    commonjs(),
    image(),
    babel({
      exclude: 'node_modules/**',
      // TODO: Maybe check this
      babelHelpers: 'bundled',
    }),
    string({
      include: "**/styles/*.css",
    })
  ],
}))
