import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  
  // define aggregators
  const colorAggregator = getDimensionAggregator(
    'color',
    mapping,
    dataTypes,
    dimensions
  )

  // we will use rollup to populate a flat array of objects
  // that will be passed to the render
  let results = []

  const result = d3.rollups(
    data,
    (v) => {
      return v.map((d) => {
        mapping.axes.value.forEach((axisName, index) => {
          let item = {
            name: index, // each line will create a radar
            color: d[mapping.color.value],
            series: d[mapping.series.value],
            axes: axisName,
            value: d[axisName],
          }

          results.push(item)
        })
        
        return 'done'
      })
    },
    (d) => d[mapping.series.value] // series grouping
  )

  return results
}
