// export const mapData = {
//   name: 'get',
//   arcs: 'get',
// }

import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

// copied from radarchart

export const mapData = function (data, mapping, dataTypes, dimensions) {
  // define aggregators
  const arcsAggregator = getDimensionAggregator(
    'arcs',
    mapping,
    dataTypes,
    dimensions
  )

  // we will use rollup to populate a flat array of objects
  // that will be passed to the render
  let results = []
  let index = 0

  const result = d3.rollups(
    data,
    (v) => {
      console.log(v)

      arcs = mapping.arcs.value.forEach((arcName) => {
        console.log(arcName, d[arcName])
        return arcsAggregator(v.map((d) => d[arcName]))
      })

      console.log(arcs)
      // return v.map(d=>{
      //   let item = {
      //     series: d[mapping.series.value],
      //     arcs:
      //   }
      // })
      // return v.map((d) => {
      //   mapping.arcs.value.forEach((arcName) => {
      //     let item = {
      //       name: index, // each line will create a radar
      //       series: d[mapping.series.value],
      //       arc: arcName,
      //       value: d[arcName],
      //     }

      //     results.push(item)
      //   })

      //   index++

      //   return 'done'
      // })
    },
    (d) => d[mapping.series.value] // series grouping
  )

  console.log(results)

  return results
}
