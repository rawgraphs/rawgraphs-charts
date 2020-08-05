import * as d3 from "d3";
import * as d3Array from 'd3-array'

export const mapData = function(data, mapping, dataTypes, dimensions) {

	console.log({data, mapping, dataTypes, dimensions})

	const result = d3Array.rollups(data,
		v => {
			return {
				'x': v[0][mapping.x.value], //get the first one since it's grouped
				'y': d3.sum(v, d => d[mapping.y.value]),
				'color': mapping.color ? [...new Set(v.map(d => d[mapping.color.value]))].join(',') : undefined, // TODO: not working if X axis is mapped also as color
				'series': mapping.series ? v[0][mapping.series.value] : undefined, //get the first one since it's grouped
				'lines': mapping.lines ? v[0][mapping.lines.value] : undefined //get the first one since it's grouped
			}
		},
		d => mapping.series ? d[mapping.series.value] : undefined, // series grouping
		d => mapping.lines ? d[mapping.lines.value] : undefined, d => d[mapping.x.value] // group functions
	)

	return result
}
