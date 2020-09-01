import * as d3 from "d3";
import * as d3Array from 'd3-array'
import { getDimensionAggregator } from '@raw-temp/rawgraphs-core'

export const mapData = function(data, mapping, dataTypes, dimensions) {

  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions)
  const yAggregator = getDimensionAggregator('y', mapping, dataTypes, dimensions)

  let results = [];

  const result = d3Array.rollups(data,
    v => {
      return d3Array.rollups(v,
        vv => {
          const item = {
              'x': vv[0][mapping.x.value], //get the first one since it's grouped
              'y': yAggregator(vv.map(d => d[mapping.y.value])), // aggregate
              'color': colorAggregator(v.map(d => d[mapping.color.value])), // aggregate
              'series': v[0][mapping.series.value], //get the first one since it's grouped
              'lines': v[0][mapping.lines.value] //get the first one since it's grouped
            };
          results.push(item);
          },
        d => d[mapping.x.value].toString() // sub-group functions. toString() to enable grouping on dates
      )
    },
    d => d[mapping.series.value], // series grouping
    d => d[mapping.lines.value] // group functions
  )

  return results
}
