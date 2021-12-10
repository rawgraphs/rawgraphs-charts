import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import localResolve from 'rollup-plugin-local-resolve'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import image from '@rollup/plugin-image'
import { string } from 'rollup-plugin-string'
import { rawGraphCss } from './bundler/rollupPluginRAWGraphCss'
import pkg from './package.json'

const vendors = []
  // Make all external dependencies to be exclude from rollup
  .concat(
    Object.keys(pkg.dependencies || {}), // TODO: keep or not?
    Object.keys(pkg.peerDependencies || {}),
    Object.keys(pkg.devDependencies || {})
  )
  .concat('./styles/base.css')

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return (id) => pattern.test(id)
}

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
  external: format === 'umd' ? undefined : makeExternalPredicate(vendors),
  plugins: [
    localResolve(),
    commonjs(),
    image(),
    babel({
      exclude: 'node_modules/**',
      // TODO: Maybe check this
      babelHelpers: 'bundled',
    }),
    rawGraphCss({
      include: '**/styles/*.raw.css',
    }),
    string({
      include: '**/styles/*.css',
      exclude: '**/styles/*.raw.css',
    }),
  ].concat(
    format == 'umd'
      ? [
          resolve(),
          terser()
        ]
      : []
  ),
}))
