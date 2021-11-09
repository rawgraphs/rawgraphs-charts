import { createFilter } from 'rollup-pluginutils'
import convertCSS from './convertCSS'

export function rawGraphCss(opts = {}) {
  if (!opts.include) {
    throw Error('include option should be specified')
  }

  const filter = createFilter(opts.include, opts.exclude)

  return {
    name: 'string',

    transform(code, id) {
      if (filter(id)) {
        const cssCoverted = convertCSS(code)
        return {
          code: `export default ${JSON.stringify(cssCoverted)};`,
          map: { mappings: '' },
        }
      }
    },
  }
}
