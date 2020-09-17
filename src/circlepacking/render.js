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
		label1Style,
		label2Style,
		label3Style,
		padding,
		sortCirclesBy = 'Size (descending)',
	} = visualOptions;

	const margin = {
		top: marginTop,
		right: marginRight,
		bottom: marginBottom,
		left: marginLeft
	}

	const labelStyles = [label1Style, label2Style, label3Style];

	// define style
	d3.select(svgNode).append('style')
		.text(`
      #viz {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
      }

			#viz .Primary {
				font-weight: bold;
			}

			#viz .Tertiary {
				font-weight: lighter;
				font-style: oblique;
			}

			#viz .ancestors {
				fill: none;
				stroke: gray;
			}

      `)

	const chartWidth = width - margin.left - margin.right;
	const chartHeight = height - margin.top - margin.bottom;

	switch(sortCirclesBy) {
  case "Size (descending)":
    data.sort((a,b) => d3.descending(a.size, b.size))
    break;
  case "Size (ascending)":
    data.sort((a,b) => d3.ascending(a.size, b.size))
    break;
	case "Original":
    //do nothing
    break;
  }

	// create the hierarchical structure
	const nest = d3.rollup(data,
		v => v[0],
		...mapping.hierarchy.value.map(level => (d => d.hierarchy.get(level))))

	const hierarchy = d3.hierarchy(nest)
		.sum(d => d[1] instanceof Map ? 0 : d[1].size); // since maps have a .size porperty in native javascript, sum only values for leaves, and not for Maps

	const pack = data => d3.pack()
		.size([chartWidth, chartHeight])
		.padding(padding)
		(hierarchy)

	const root = pack(nest);

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

	const node = svg.append("g")
		.attr("id", "nodes")
		.selectAll("g")
		.data(root.descendants())
		.join("g")
		.attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)
		.attr("id", d => d.data[0])

	node.append("circle")
		.attr("r", d => d.r)
		.attr("class", "ancestors")
		.attr("fill", d => colorScale(d.data[1].color))

	const leaves = node.filter(d => !d.children); // filter nodes that are not leaves

	leaves.select("circle")
		.attr("id", (d, i) => "path" + i)
		.attr("class", "leaves")

	leaves.append("clipPath")
		.attr("id", (d, i) => "clip" + i)
		.append("use")
		.attr("xlink:href", (d, i) => "#path"+i);

	leaves.append("text")
		.attr("clip-path", (d,i) => "url(#clip" + i + ")")
		.selectAll("tspan")
		.data(d => d.data[1].label)
		.join("tspan")
		.attr("text-anchor", "middle")
		.attr("x", 0)
		.attr("y", (d, i, n) => (i+1) * 12 - n.length / 2 *12) // 12 is the font size, should be automated
		.attr("class", (d,i) => i<3? labelStyles[i] : labelStyles[2]) // if there are more than three
		.text(d => d);

}
