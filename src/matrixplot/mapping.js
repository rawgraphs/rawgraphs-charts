import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  
  const colorAggregator = getDimensionAggregator(
    'color',
    mapping,
    dataTypes,
    dimensions
  )
  const sizeAggregator = getDimensionAggregator(
    'size',
    mapping,
    dataTypes,
    dimensions
  )
  const labelAggregators = getDimensionAggregator(
    'label',
    mapping,
    dataTypes,
    dimensions
  )

  // add the non-compulsory dimensions.
  'color' in mapping ? null : (mapping.color = { value: undefined })
  'size' in mapping ? null : (mapping.size = { value: undefined })
  'label' in mapping ? null : (mapping.label = { value: undefined })

  const result = d3.rollups(
    data,
    (v) => {
      return {
        x: v[0][mapping.x.value], // get the first one since it's grouped
        y: v[0][mapping.y.value], // get the first one since it's grouped
        size: mapping.size.value
          ? sizeAggregator(v.map((d) => d[mapping.size.value]))
          : v.length, // aggregate. If not mapped, give 1 as size
        color: mapping.color.value
          ? colorAggregator(v.map((d) => d[mapping.color.value]))
          : undefined, // aggregate, by default single color.
        label: mapping.label.value
          ? mapping.label.value.map((label, i) => {
              return labelAggregators[i](v.map((d) => d[label]))
            })
          : undefined, // create array of strings
      }
    },
    (d) => d[mapping.x.value] + '_' + d[mapping.y.value] // crossgrup functions
  )

  return result.map((d) => d[1])
}
