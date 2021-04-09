import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  const yAggregator = getDimensionAggregator(
    'y',
    mapping,
    dataTypes,
    dimensions
  )

  let results = []

  const result = d3.rollups(
    data,
    (v) => {
      const item = {
        group: v[0][mapping.group.value],
        x: v[0][mapping.x.value],
        y: yAggregator(v.map((d) => d[mapping.y.value])),
        color:
          yAggregator(v.map((d) => d[mapping.y.value])) < 0
            ? 'negative'
            : 'positive',
      }
      results.push(item)
    },
    (d) => d[mapping.group.value], // series grouping
    (d) => d[mapping.x.value] // group functions
  )

  return results
}
