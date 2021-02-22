import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  // define aggregators
  // you should provide the dimension name (defined in dimensions.js)
  // and pass mapping, dataTypes, and dimensions.

  const colorAggregator = getDimensionAggregator(
    'color',
    mapping,
    dataTypes,
    dimensions
  )

  // add the non-compulsory dimensions.
  'group' in mapping ? null : (mapping.group = { value: undefined })
  'color' in mapping ? null : (mapping.color = { value: undefined })

  // we will use rollup to populate a flat array of objects
  // that will be passed to the render
  let results = []

  const result = d3.rollups(
    data,
    (v) => {
      v.map((d) => {
        const item = {
          group: d[mapping.group.value],
          value: d[mapping.value.value],
          color: colorAggregator(v.map((e) => e[mapping.color.value])),
        }
        results.push(item)
        return item
      })

      return v
    },
    (d) => d[mapping.group.value] // groups grouping
  )

  return results
}
