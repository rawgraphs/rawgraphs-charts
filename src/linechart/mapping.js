import * as d3 from 'd3'
import { getDimensionAggregator } from '@raw-temp/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  console.log('- mapping')

  const colorAggregator = getDimensionAggregator(
    'color',
    mapping,
    dataTypes,
    dimensions
  )
  const yAggregator = getDimensionAggregator(
    'y',
    mapping,
    dataTypes,
    dimensions
  )

  // add the non-compulsory dimensions.
  'color' in mapping ? null : (mapping.color = { value: undefined })
  'series' in mapping ? null : (mapping.series = { value: undefined })
  'lines' in mapping ? null : (mapping.lines = { value: undefined })

  let results = []

  const result = d3.rollups(
    data,
    (v) => {
      return d3.rollups(
        v,
        (vv) => {
          const item = {
            x: vv[0][mapping.x.value], //get the first one since it's grouped
            y: yAggregator(vv.map((d) => d[mapping.y.value])), // aggregate
            color: colorAggregator(v.map((d) => d[mapping.color.value])), // aggregate
            series: v[0][mapping.series.value], //get the first one since it's grouped
            lines: v[0][mapping.lines.value], //get the first one since it's grouped
          }
          results.push(item)
        },
        (d) => d[mapping.x.value].toString() // sub-group functions. toString() to enable grouping on dates
      )
    },
    (d) => d[mapping.series.value], // series grouping
    (d) => d[mapping.lines.value] // group functions
  )

  return results
}
