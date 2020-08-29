import * as d3Array from 'd3-array'
import { getDimensionAggregator } from '@raw-temp/rawgraphs-core'

export const mapData = function(data, mapping, dataTypes, dimensions) {

  const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions)
  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions)
  const labelAggregators = getDimensionAggregator('label', mapping, dataTypes, dimensions)

  const result = d3Array.rollups(data,
    v => {
      return {
        'x': v[0][mapping.x.value], //get the first one since it's grouped
        'y': v[0][mapping.y.value], //get the first one since it's grouped
        'size': sizeAggregator(v.map(d => d[mapping.size.value])),//d3['sum'](v, d => d[mapping.size.value]),
        'color': colorAggregator(v.map(d => d[mapping.color.value])),//dataTypes[mapping.color.value] == 'number' ? d3['sum'](v, d => d[mapping.color.value]) : [...new Set(v.map(d => d[mapping.color.value]))].join(','),
				'label': mapping.label.value.map((label,i) =>{
            //return mapping.label.dataType[i] == 'number' ? d3['sum'](v, d => d[label]) : [...new Set(v.map(d => d[label]))].join(',')
            return labelAggregators[i](v.map(d =>d[label]))
				})
      }
    },
    d => d[mapping.x.value] + d[mapping.y.value] // crossgrup functions
  )
  
  
  return result.map(d => d[1])
}
