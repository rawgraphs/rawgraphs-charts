import * as d3 from "d3";
import * as d3Array from 'd3-array'

export const mapData = function(data, mapping, dataTypes, dimensions) {

  //console.log({data, mapping, dataTypes, dimensions})

	let results = [];

  const result = d3Array.rollups(data,
    v => {
      return d3Array.rollups(v,
				vv => {
					const item = {
							'x': vv[0][mapping.x.value], //get the first one since it's grouped
        			'y': d3.sum(vv, d => d[mapping.y.value]),
							'color':[...new Set(v.map(d => d[mapping.color.value]))].join(','),
							'series': v[0][mapping.series.value],
							'lines': v[0][mapping.lines.value]
						};
					results.push(item);
					},
				d => d[mapping.x.value].toString() // sub-group functions
			)
    },
    d => d[mapping.series.value], // series grouping
    d => d[mapping.lines.value] // group functions
  )

  return results
}
