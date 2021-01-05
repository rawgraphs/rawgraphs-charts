import * as d3 from 'd3'
import { getDimensionAggregator } from '@raw-temp/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  console.log('- mapping')

  // @TODO: allow aggreagtion on multiple values

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
          groups: v[0][mapping.groups.value], // get the first one since it's grouped
          bars: barName,
          size: v.reduce((result, elm) => result + elm[barName], 0), //@TODO: allow aggreagtion on multiple values. For now, by default is a sum
          color: barName,
        }
        results.push(item)
      })
    },
    (d) => d[mapping.series.value], // series grouping
    (d) => d[mapping.groups.value].toString() // stacks grouping. toString() to enable grouping on dates
  )
  console.log(results)

  return results
}
