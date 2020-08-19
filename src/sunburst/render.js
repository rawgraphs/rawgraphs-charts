import * as d3 from 'd3'

export function render(svgNode, data, visualOptions, mapping, originalData) {

  const {
    width = 500,
    height = 500,
    background='#ffffff',
    xOrigin,
    yOrigin,
    maxRadius,
    showPoints,
    pointsRadius,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  } = visualOptions;

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }
  const chartWidth = width-margin.left-margin.right;
  const chartHeight = height-margin.top-margin.bottom;

	const radius = d3.min(chartWidth, chartHeight);

	// create the hierarchical structure
	let nest = d3.nest();

	// add one nesting for each hierarchy level
	mapping.hierarchy.value.forEach(function(level){
		console.log(level)
    nest = nest.key(d => d.hierarchy.get(level))
  });
	// compute the nest
	nest = nest.rollup(v => v[0]) // avoid arrays with just one item
		.entries(data)

	const nestedData = {"key":"root", "values":nest};

	const hierarchy = d3.hierarchy(nestedData, d => d.values)
    .sum(d => d.value ? d.value.size : 0);

	const partition = d3.partition()
		.size([2 * Math.PI, radius])

	console.log(hierarchy)
}
