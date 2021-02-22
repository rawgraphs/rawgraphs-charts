import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  // as we are working on a multiple dimension (bars), `getDimensionAggregator` will return an array of aggregator functions
  // the order of aggregators is the same as the value of the mapping
  const barsAggregators = getDimensionAggregator(
    'bars',
    mapping,
    dataTypes,
    dimensions
  )

  let results = []
  const result = d3.rollups(
    data,
    (v) => {
      // @TODO use the spread operator to creat groups on mapping values
      // for every dimension in the bars field, create an item
      mapping.bars.value.forEach((barName, i) => {
        //getting values for aggregation
        const valuesForSize = v.map((x) => x[barName])
        //getting i-th aggregator
        const aggregator = barsAggregators[i]

        // create the item
        const item = {
          series: v[0][mapping.series.value], // get the first one since it's grouped
          groups: v[0][mapping.groups.value], // get the first one since it's grouped
          bars: barName,
          size: aggregator(valuesForSize),
        }
        results.push(item)
      })
    },
    (d) => d[mapping.series.value], // series grouping
    (d) => d[mapping.groups.value].toString() // stacks grouping. toString() to enable grouping on dates
  )
  return results
}
