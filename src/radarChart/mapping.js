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

  // const axesAggregator = getDimensionAggregator(
  //   'axes',
  //   mapping,
  //   dataTypes,
  //   dimensions
  // )

  // add the non-compulsory dimensions.
  //'dimensionName' in mapping ? null : (mapping.dimensionName = { value: undefined })
  'color' in mapping ? null : (mapping.color = { value: undefined })

  // we will use rollup to populate a flat array of objects
  // that will be passed to the render
  let results = []

  const result = d3.rollups(
    data,
    (v, index) => {
      //@TODO: allow aggreagtion on multiple values. For now, each line will create a radar
      return v.map((d) => {
        mapping.axes.value.forEach((axisName) => {
          let item = {
            name: d[mapping.name.value], //name: d[mapping.name.value], @TODO: allow aggreagtion on multiple values. For now, each line will create a radar
            label: d[mapping.name.value], // @TODO: expose as dimension
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
    (d) => d[mapping.series.value], // series grouping
    (d) => d[mapping.name.value] // name grouping
    // (d) => d[mapping.axes.value] // axes grouping
  )

  return results
}
