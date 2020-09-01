import * as d3 from 'd3'
import { getDimensionAggregator } from '@raw-temp/rawgraphs-core'

export const mapData = function(data, mapping, dataTypes, dimensions) {

  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions)
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions)
  const labelAggregators = getDimensionAggregator('label', mapping, dataTypes, dimensions)

  // console.log("sizeAggregator", sizeAggregator, mapping, dataTypes, dimensions)



  'color' in mapping ? null : mapping.color = {value: undefined};
  'size' in mapping ? null : mapping.size = {value: undefined};
  'label' in mapping ? null : mapping.size = {value: undefined};

  const result = d3.rollups(data,
    v => {
      return {
        'x': v[0][mapping.x.value], // get the first one since it's grouped
        'y': v[0][mapping.y.value], // get the first one since it's grouped
        'size': mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : 1, // aggregate. by default assign the same size
        'color': mapping.size.value ? colorAggregator(v.map(d => d[mapping.color.value])) : 'cells color', // aggregate, by default single color.
        'label': mapping.size.value ? mapping.label.value.map((label,i) =>{return labelAggregators[i](v.map(d =>d[label]))}) : undefined
      }
    },
    d => d[mapping.x.value] + d[mapping.y.value] // crossgrup functions
  )

  return result.map(d => d[1])
}
