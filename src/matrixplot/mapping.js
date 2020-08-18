import * as d3 from "d3";
import * as d3Array from 'd3-array'

export const mapData = function(data, mapping, dataTypes, dimensions) {

  console.log({data, mapping, dataTypes, dimensions})

  const result = d3Array.rollups(data,
    v => {
      return {
        'x': v[0][mapping.x.value], //get the first one since it's grouped
        'y': v[0][mapping.y.value], //get the first one since it's grouped
        'size': d3['sum'](v, d => d[mapping.size.value]),
        'color': dataTypes[mapping.color.value] == 'number' ? d3['sum'](v, d => d[mapping.color.value]) : [...new Set(v.map(d => d[mapping.color.value]))].join(','),
				'label': mapping.label.value.map((label,i) =>{
						return mapping.label.dataType[i] == 'number' ? d3['sum'](v, d => d[label]) : [...new Set(v.map(d => d[label]))].join(',')
				})
      }
    },
    d => d[mapping.x.value] + d[mapping.y.value] // crossgrup functions
  )

  return result
}
