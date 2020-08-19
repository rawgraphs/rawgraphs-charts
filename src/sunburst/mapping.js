import * as d3 from "d3";
import * as d3Array from 'd3-array'

export const mapData = function(data, mapping, dataTypes, dimensions) {

  const results = [];

  const result = d3Array.rollups(data,
    v => {
      const item = {
        'hierarchy': new Map(mapping.hierarchy.value.map(d => [d,v[0][d]])), //get the first one since it's grouped
        'size': d3['sum'](v, d => d[mapping.size.value]),
        'color': dataTypes[mapping.color.value] == 'number' ? d3['sum'](v, d => d[mapping.color.value]) : [...new Set(v.map(d => d[mapping.color.value]))].join(','),
        'label': mapping.label.value.map((label,i) =>{
            return mapping.label.dataType[i] == 'number' ? d3['sum'](v, d => d[label]) : [...new Set(v.map(d => d[label]))].join(',')
        })
      }

      results.push(item)
      return item;
    },
    ...mapping.hierarchy.value.map(level => (d => d[level])) // create a grouping for each level of the hierarchy
  )

  console.log("mapping")

  return results
}
