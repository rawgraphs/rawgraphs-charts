import * as d3 from 'd3'
import { getDimensionAggregator } from '@raw-temp/rawgraphs-core'

export const mapData = function(data, mapping, dataTypes, dimensions) {

  const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions)

  const results = [];

	// compute the rollup for each couple of steps
	mapping.steps.value.slice(0,-1).forEach((step1, index) => {
		//get the second step
		const step2 = mapping.steps.value[index + 1]

		const result = d3.rollups(data,
	    v => {
	      const item = {
	        'source': v[0][step1],
					'sourceStep': step1,
	        'target': v[0][step2],
					'targetStep': step2,
	        'value': mapping.size ? sizeAggregator(v.map(d => d[mapping.size.value])) : v.length
	      };
	      results.push(item);
	      return item
	    },
	    d => d[step1] + d[step2]
	  );
	})

  return results

}
