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
      // create the item
      const item = {
        series: v[0][mapping.series.value], // get the first one since it's grouped
        stacks: v[0][mapping.stacks.value], // get the first one since it's grouped
      }
      // for every value mapped as bar, aggregate the value
      mapping.bars.value.forEach((barName) => {
        item[barName] = v.reduce(
          (accumulator, value) => accumulator + value[barName],
          0
        ) //@TODO: allow aggreagtion on multiple values. For now, by default is a sum
      })

      mapping.bars.value.forEach((barName) => {
        // create the item
        const item = {
          series: v[0][mapping.series.value], // get the first one since it's grouped
          stacks: v[0][mapping.stacks.value], // get the first one since it's grouped
          bars: barName,
          size: v.reduce((result, elm) => result + elm[barName], 0), //@TODO: allow aggregation on multiple values
          color: barName,
        }
        results.push(item)
      })
    },
    (d) => d[mapping.series.value], // series grouping
    (d) => d[mapping.stacks.value] // stacks grouping
  )

  return results
}
