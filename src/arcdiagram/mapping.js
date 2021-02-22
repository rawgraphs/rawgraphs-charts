import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  const sizeAggregator = getDimensionAggregator(
    'size',
    mapping,
    dataTypes,
    dimensions
  )

  const results = []

  const result = d3.rollups(
    data,
    (v) => {
      const item = {
        source: v[0][mapping.source.value],
        target: v[0][mapping.target.value],
        value: mapping.size.value
          ? sizeAggregator(v.map((d) => d[mapping.size.value]))
          : 1,
      }
      results.push(item)
      return item
    },
    (d) => d[mapping.source.value] + d[mapping.target.value] // crossgrup functions. aggregate links among same source and target
  )

  return results
}
