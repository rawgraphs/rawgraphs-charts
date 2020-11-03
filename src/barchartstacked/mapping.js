import * as d3 from 'd3'
import { getDimensionAggregator } from '@raw-temp/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  console.log('- mapping')

  const sizeAggregator = getDimensionAggregator(
    'size',
    mapping,
    dataTypes,
    dimensions
  )

  // add the non-compulsory dimensions.
  'series' in mapping ? null : (mapping.series = { value: undefined })
  'size' in mapping ? null : (mapping.size = { value: undefined })

  let results = []

  const result = d3.rollups(
    data,
    (v) => {
      const item = {
        series: v[0][mapping.series.value], // get the first one since it's grouped
        stacks: v[0][mapping.stacks.value], // get the first one since it's grouped
        bars: v[0][mapping.bars.value], // get the first one since it's grouped
        size: mapping.size.value
          ? sizeAggregator(v.map((d) => d[mapping.size.value]))
          : v.length, // aggregate. If not mapped, give 1 as size
      }
      results.push(item)
      return item
    },
    (d) => d[mapping.series.value], // series grouping
    (d) => d[mapping.stacks.value],
    (d) => d[mapping.bars.value] // group functions
  )

  return results
}
