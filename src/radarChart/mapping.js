import * as d3 from 'd3'
import { getDimensionAggregator } from '@raw-temp/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  console.log('- mapping')

  // define aggregators
  const colorAggregator = getDimensionAggregator(
    'color',
    mapping,
    dataTypes,
    dimensions
  )

  // add the non-compulsory dimensions.
  //'dimensionName' in mapping ? null : (mapping.dimensionName = { value: undefined })
  'color' in mapping ? null : (mapping.color = { value: undefined })

  // we will use rollup to populate a flat array of objects
  // that will be passed to the render
  let results = []

  const result = d3.rollups(
    data,
    (v) => {
      return v.map((d) => {
        let item = {
          color: d[mapping.color.value],
          series: d[mapping.color.value],
        }

        mapping.axes.value.forEach((axisName) => {
          item[axisName] = d[axisName]
        })

        return item
      })
    },
    (d) => d[mapping.series.value] // series grouping
  )
  console.log(results)

  return results
}
