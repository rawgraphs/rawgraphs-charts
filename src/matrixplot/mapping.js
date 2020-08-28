import * as d3 from "d3";
import * as d3Array from 'd3-array'
import { getAggregator } from '@raw-temp/rawgraphs-core'
import get from 'lodash/get'

export const mapData = function(data, mapping, dataTypes, dimensions) {

  console.log({data, mapping, dataTypes, dimensions})
  const colorAggregation = get(mapping.color, 'config.aggregation', dataTypes[mapping.color.value] == 'number' ? 'sum' : 'csvDistinct')
  const colorAggregator = getAggregator(colorAggregation)

  const sizeAggregation = get(mapping.size, 'config.aggregation', 'sum')
  const sizeAggregator = getAggregator(sizeAggregation)

  const labelAggregations = get(mapping.label, 'config.aggregation', mapping.label.value.map((x, i) => dataTypes[mapping.label.value[i]]=== 'number' ? 'sum': 'csvDistinct'))
  const labelAggregators = labelAggregations.map(x => getAggregator(x))

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
  // console.log("f,", result.map(d => d[1]))
  console.log("colorAggregation", colorAggregation,colorAggregator )
  console.log("sizeAggregator", sizeAggregation,sizeAggregator )
  return result.map(d => d[1])
}
