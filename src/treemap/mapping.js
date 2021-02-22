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

  const results = []

  const result = d3.rollups(
    data,
    (v) => {
      const item = {
        hierarchy: new Map(mapping.hierarchy.value.map((d) => [d, v[0][d]])), //get the first one since it's grouped
        size: mapping.size.value
          ? sizeAggregator(v.map((d) => d[mapping.size.value]))
          : v.length,
        color: mapping.color.value
          ? colorAggregator(v.map((d) => d[mapping.color.value]))
          : 'cells color',
        label: mapping.label.value
          ? mapping.label.value.map((label, i) => {
              return labelAggregators[i](v.map((d) => d[label]))
            })
          : undefined, // create array of strings
      }

      results.push(item)
      return item
    },
    ...mapping.hierarchy.value.map((level) => (d) => d[level]) // create a grouping for each level of the hierarchy
  )

  return results
}
