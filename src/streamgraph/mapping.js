import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  
  const sizeAggregator = getDimensionAggregator(
    'size',
    mapping,
    dataTypes,
    dimensions
  )

  let results = []

  const result = d3.rollups(
    data,
    (v) =>
      d3.rollups(
        v,
        (vv) => {
          const item = {
            x: vv[0][mapping.x.value], //get the first one since it's grouped
            size: sizeAggregator(vv.map((d) => d[mapping.size.value])), // aggregate
            series: vv[0][mapping.series.value], //get the first one since it's grouped
            streams: vv[0][mapping.streams.value], //get the first one since it's grouped
          }
          results.push(item)
        },
        (d) => d[mapping.x.value].toString() // sub-group functions. toString() to enable grouping on dates
      ),
    (d) => d[mapping.series.value], // series grouping
    (d) => d[mapping.streams.value] // group functions
  )

  return results
}
