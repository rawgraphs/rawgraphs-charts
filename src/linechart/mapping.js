import * as d3 from "d3";
import * as d3Array from 'd3-array'

export const mapData = function(data, mapping, dataTypes, dimensions) {

	// console.log({data, mapping, dataTypes, dimensions})

	const result = d3Array.rollups(data,
		v => {
			return {
				'x': v[0][mapping.x.value], //get the first one since it's grouped
				'y': d3.sum(v, d => d[mapping.y.value]),
				'color': [...new Set(v.map(d => d[mapping.color.value]))].join(','), // TODO: not working if X axis is mapped also as color
				'series': v[0][mapping.series.value], //get the first one since it's grouped
				'lines': v[0][mapping.lines.value] //get the first one since it's grouped
			}
		},
		d => d[mapping.series.value], // series grouping
		d => d[mapping.lines.value], d => d[mapping.x.value] // group functions
	)

	return result
}
