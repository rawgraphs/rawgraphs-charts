import * as d3 from 'd3'
import { getDimensionAggregator } from '@raw-temp/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  console.log('- mapping')

  // const barsAggregator = getDimensionAggregator(
  //   'bars',
  //   mapping,
  //   dataTypes,
  //   dimensions
  // ) @TODO: allow aggreagtion on multiple values

  // add the non-compulsory dimensions.
  'series' in mapping ? null : (mapping.series = { value: undefined })

  let results = []

  const result = d3.rollups(
    data,
    (v) => {
      // for every dimension in the bars field, create an item
      mapping.bars.value.forEach((barName) => {
        // create the item
        const item = {
          series: v[0][mapping.series.value], // get the first one since it's grouped
          stacks: v[0][mapping.stacks.value], // get the first one since it's grouped
          bars: barName,
          size: v.reduce((result, elm) => result + elm[barName], 0),
          color: barName,
        }
        results.push(item)
      })
    },
    (d) => d[mapping.series.value], // series grouping
    (d) => d[mapping.stacks.value].toString() // stacks grouping. toString() to enable grouping on dates
  )
  console.log(results)
  return results
}
