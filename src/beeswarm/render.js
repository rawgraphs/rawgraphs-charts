import * as d3 from "d3";
import * as d3Array from 'd3-array'
// import { categoryLegend } from 'rawgraphs-core'

export function render(svgNode, data, visualOptions, mapping, originalData) {

	console.log('- render')

	const {
		// artboard options
		width,
		height,
		background,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		// chart options
		minDiameter,
		maxDiameter,
		simulationStrength,
		nodePadding,
		sortSeriesBy,
		// colors
		colorScale,
		//TODO add labels legends
	} = visualOptions;

	const margin = {
		top: marginTop,
		right: marginRight,
		bottom: marginBottom,
		left: marginLeft,
	};

	// create nest structure
	const grouped = d3.groups(data, d => d.series)
	// reduce them for sorting
	const reduced = grouped.reduce((map, d) => {
		map[d[0]] = d3.sum(d[1], e => e.size);
		return map
	}, {})

	// define chart dimension
	const chartWidth = width - margin.left - margin.right;
	const chartHeight = height - margin.top - margin.bottom;

	// @TODO: add sorting
	switch (sortSeriesBy) {
		case "Total value (descending)":
			grouped.sort((a, b) => d3.descending(reduced[a[0]], reduced[b[0]]))
			break;
		case "Total value (ascending)":
			grouped.sort((a, b) => d3.ascending(reduced[a[0]], reduced[b[0]]))
			break;
		case "Name":
			grouped.sort((a, b) => d3.ascending(a[0], b[0]))
	}


	mapping.xValue.dataType === "number" ? mapping.xValue.dataType = {
		"type": "number"
	} : null // @TODO it should be better to have always the same kind of object in mapping

	let xScale;
	const xDomain = d3.extent(data, d => d.xValue);

	switch (mapping.xValue.dataType.type) {
		case "number":
			xScale = d3.scaleLinear().domain(xDomain).nice().range([0, chartWidth]);
			break;
		case "date":
			xScale = d3.scaleTime().domain(xDomain).nice().range([0, chartWidth]);
			break;
	}
	// create scale for sizes
	const sizeScale = d3.scaleSqrt()
		.domain(d3.extent(data, d => d.size))
		.range([minDiameter / 2, maxDiameter / 2])

	// create y scale
	const yScale = d3.scaleBand()
		.rangeRound([0, chartHeight])
		.domain(grouped.map(d => d[0]))
		.align(0.5)
		.padding(0);

	// prepare data with initial vales, so the simulation won't start from 0,0
	data.forEach(d => {
		d.x = xScale(d.xValue);
		d.y = yScale(d.series) + yScale.bandwidth() / 2;
	})

	// initialise simulation
	let simulation = d3.forceSimulation(data)
		.force('x', d3.forceX().x(d => xScale(d.xValue)))
		.force("y", d3.forceY(d => yScale(d.series) + yScale.bandwidth() / 2))
		.force('collision', d3.forceCollide().radius(d => sizeScale(d.size) + nodePadding))

	// add background
	d3.select(svgNode)
		.append("rect")
		.attr("width", width)
		.attr("height", height)
		.attr("x", 0)
		.attr("y", 0)
		.attr("fill", background)
		.attr("id", "backgorund");

	// get svg node
	const svg = d3
		.select(svgNode)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.attr("id", "visualization")

	// draw the scale and axes
	const axisLayer = svg
		.append("g")
		.attr("id", "axis")

	// draw y axis
	axisLayer.append("g")
		.attr("id", "y axis")
		.call(d3.axisLeft(yScale)
			.tickSize(Math.round(-chartWidth))
			.tickSizeOuter(0)
		)

	// draw x axis
	axisLayer.append("g")
		.attr("id", "y axis")
		.attr("transform", `translate(0,${chartHeight})`)
		.call(d3.axisBottom(xScale).tickSizeOuter(0))

	// draw the viz
	const vizLayer = svg
		.append("g")
		.selectAll("g")
		.data(grouped)
		.join("g")
		.attr("id", d => d[0])

	// let the simulation run in background
	// @TODO move this to a web worker
	//console.log("---------------new simulation---------------")
	for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
		//console.log(i+"/"+n+"("+ (i/n*100) + ")")
		simulation.tick();
	}
	//console.log("---------------end of simulation---------------")

	//add all the circles
	let circles = vizLayer.append("g")
		.attr("id", "viz")
		.selectAll('circle')
		.data(d => d[1])
		.join('circle')
		.attr('cx', d => d.x)
		.attr('cy', d => d.y)
		.attr('r', d => sizeScale(d.size))
		.style('fill', d => colorScale(d.color))

}
