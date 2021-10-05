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
      console.log(v)

      let arcs = mapping.arcs.value.map((arcName, i) => {
        // getting i-th aggregator
        const aggregator = arcsAggregators[i]
        // use it
        //return { [arcName]: aggregator(v.map((d) => d[arcName])) }
        return aggregator(v.map((d) => d[arcName]))
      })

      let item = {
        arcs: arcs,
        series: mapping.series.value,
      }

      results.push(item)
    },
    (d) => d[mapping.series.value] // series grouping
  )

  console.log(results)

  return results
}
