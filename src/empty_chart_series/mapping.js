import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  // define aggregators
  // you should provide the dimension name (defined in dimensions.js)
  // and pass mapping, dataTypes, and dimensions.

  const myAggregator = getDimensionAggregator(
    'dimensionName',
    mapping,
    dataTypes,
    dimensions
  )

  // add the non-compulsory dimensions.
  //'dimensionName' in mapping ? null : (mapping.dimensionName = { value: undefined })
  'color' in mapping ? null : (mapping.color = { value: undefined })

  // we will use rollup to populate a flat array of objects
  // that will be passed to the render
  let results = []

  const result = d3.rollups(
    data,
    (v) => {
      const item = {
        series: v[0][mapping.series.value], // get the first one since it's grouped
        myDimension: mapping.myDimension.value // check if any dimension is mapped
          ? myAggregator(v.map((d) => d[mapping.myDimension.value])) // in case, use the aggregator
          : 'default', // otherwise, return a defalut value.Could be a number, a string, etc.
        color: mapping.color.value
          ? colorAggregator(v.map((d) => d[mapping.color.value]))
          : 'default', // aggregate, by default single color.
      }
      results.push(item)
      return item
    },
    (d) => d[mapping.series.value] // series grouping
  )

  return results
}
