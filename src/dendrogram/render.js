import * as d3 from 'd3'

export function render(svgNode, data, visualOptions, mapping, originalData) {

	console.log('- render')

	const {
		width,
		height,
		background,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		colorScale,
		maxRadius,
		layout,
		separationStress,
	} = visualOptions;

	const margin = {
		top: marginTop,
		right: marginRight,
		bottom: marginBottom,
		left: marginLeft
	}

	// define style
	d3.select(svgNode).append('style')
		.text(`
      #viz text {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
      }
			#viz #links {
				fill: none;
				stroke: gray;
			}
      `)

	const chartWidth = width - margin.left - margin.right;
	const chartHeight = height - margin.top - margin.bottom;

	// create the hierarchical structure
	const nest = d3.rollup(data, v => v[0], ...mapping.hierarchy.value.map(level => (d => d.hierarchy.get(level))))

	const hierarchy = d3.hierarchy(nest)
		.sum(d => d[1] instanceof Map ? 0 : d[1].size); // since maps have also a .size porperty, sum only values for leaves, and not for Maps

	// filter nodes with empty values in the hierarchy
	hierarchy.descendants()
		.filter(d => d.data[0] === "") // select nodes with empty key
		.forEach(d => {
			const index = d.parent.children.indexOf(d) // get its index in parent's children array
			d.parent.children.splice(index, 1); // remove it

			if (d.parent.children.length == 0) { // if it was the only children
				d.parent.data[1] = d.data[1]; // move its values to parent
				delete d.parent.children // and remove the empty children array
			}
		})

	// get total value. We sum the hypothetic radius (the square root of the value)
	const totalValue = d3.sum(hierarchy.leaves(), d => Math.sqrt(d.value) * 2);

	// size scale
	const sizeScale = d3.scaleLinear()
		.domain([0, d3.max(hierarchy.leaves(), d => Math.sqrt(d.value))])
		.range([0, maxRadius]);

	const layouts = {
		"Cluster Dendogram": d3.cluster(),
		"Tree": d3.tree()
	}

	// create a scale to compute separation distance among leaves
	const sepScale = d3.scaleLinear()
		.domain([0, totalValue])
		.range([0, chartHeight - hierarchy.leaves().length])

	console.log('best max', sepScale(d3.max(hierarchy.leaves(), d => Math.sqrt(d.value))) )

	const tree = nest => {
		return layouts[layout] // compute according to the options
			.size([chartHeight, chartWidth])
			.separation((a, b) => mapping.size.value ? sepScale(Math.sqrt(a.value)) + sepScale(Math.sqrt(b.value)) + 1 : 1)
			(hierarchy);
	}

	const root = tree(data);

	// add background
	d3.select(svgNode)
		.append("rect")
		.attr("width", width)
		.attr("height", height)
		.attr("x", 0)
		.attr("y", 0)
		.attr("fill", background)
		.attr("id", "backgorund");

	const svg = d3
		.select(svgNode)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.attr("id", "viz")

	svg.append("g")
		.attr("id", "links")
		.selectAll("path")
		.data(root.links())
		.join("path")
		.attr("d", d3.linkHorizontal()
			.x(d => d.y)
			.y(d => d.x));

	const node = svg.append("g")
		.attr("id", "nodes")
		.selectAll("g")
		.data(root.descendants())
		.join("g")
		.attr("id", d => d.data[0])
		.attr("transform", d => `translate(${d.y},${d.x})`);

	node.append("circle")
		.attr("fill", function(d) {
			if ('children' in d) {
				// if not leaf, check if leaves has the same value
				const childrenColors = [...new Set(d.leaves().map(l => l.data[1].color))]
				return childrenColors.length == 1 ? colorScale(childrenColors[0]) : 'gray'
			} else {
				// otherwise, if it's a leaf use its own color
				return (colorScale(d.data[1].color))
			}
		})
		.attr("r", d => sizeScale(Math.sqrt(d.value)));

	node.append("text")
		.attr("dy", "0.31em")
		.attr("x", d => d.children ? -6 : mapping.size.value ? sepScale(d.value) : maxRadius)
		.attr("text-anchor", d => d.children ? "end" : "start")
		.text(d => d.value)
	// .clone(true).lower()
	// .attr("stroke", "white");

}
