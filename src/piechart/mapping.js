// export const mapData = {
//   name: 'get',
//   arcs: 'get',
// }

import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

// copied from radarchart

export const mapData = function (data, mapping, dataTypes, dimensions) {
  // define aggregators
  // as we are working on a multiple dimension (bars), `getDimensionAggregator` will return an array of aggregator functions
  // the order of aggregators is the same as the value of the mapping
  const arcsAggregators = getDimensionAggregator(
    'arcs',
    mapping,
    dataTypes,
    dimensions
  )

  // we will use rollup to populate a flat array of objects
  // that will be passed to the render
  let results = []
  let index = 0

  const result = d3.rollups(
    data,
    (v) => {
      let item = {
        series: v[0][mapping.series.value],
      }

      let arcs = mapping.arcs.value.forEach((arcName, i) => {
        // getting i-th aggregator
        const aggregator = arcsAggregators[i]
        // use it
        item[arcName] = aggregator(v.map((d) => d[arcName]))
      })

      results.push(item)
    },
    (d) => d[mapping.series.value] // series grouping
  )

  return results
}
