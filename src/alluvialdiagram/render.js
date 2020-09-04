import * as d3 from 'd3'
import * as d3Sankey from 'd3-sankey'
// import { categoryLegend } from 'rawgraphs-core'

export function render(svgNode, data, visualOptions, mapping, originalData) {

  const {
      width,
      height,
      background,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      nodesWidth,
      nodesPadding,
			linksOpacity,
			sortNodesBy,
			verticalAlignment,
  } = visualOptions;

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const links = data;

  //get unique nodes from links. @TODO: probably it could be improved
	let nodes = links.flatMap(l => [{id:l.source, step:l.sourceStep}, {id:l.target, step:l.targetStep}])
										.reduce((map, obj) => {
										    map.set(obj.id, obj)
										    return map;
										}, new Map())

	nodes = Array.from(nodes).map(d => d[1])

  // convert option with alignment function names
  const alignments = {
    'Left':'sankeyLeft',
    'Right':'sankeyRight',
    'Center':'sankeyCenter',
    'Justify': 'sankeyJustify'
}

  const sankey = d3Sankey.sankey()
    .nodeId(d => d.id)
    .nodeWidth(nodesWidth)
    .nodePadding(nodesPadding)
    .extent([
      [0, 0],
      [chartWidth, chartHeight]
    ])
    .iterations(1)

		// compute the sankey network (calculate size, define x and y positions.)
  const network = sankey({
    nodes,
    links
  })

	//network.nodes.sort((a,b) => d3.descending(a.value, b.value))

	switch(sortNodesBy) {
		case "Total value (descending)":
			network.nodes.sort((a,b) => d3.descending(a.value, b.value));
			break;
		case "Total value (ascending)":
			network.nodes.sort((a,b) => d3.ascending(a.value, b.value));
			break;
		case "Name":
			network.nodes.sort((a,b) => d3.ascending(a.id, b.id));
			break;
	}


	// update nodes position
	d3.groups(network.nodes, d => d.step)
		// for each group, compute position
		.forEach(group => {
			// compute the starting point.
			// if top, do nothing.
			// if bottom, sum the size of nodes and required padding.
			// if center, the hal of the previous
			let yPos0 = 0;
			const totalSize = d3.sum(group[1], d => d.y1 - d.y0) + (group[1].length - 1) * nodesPadding
			console.log(totalSize)
			switch(verticalAlignment) {
				case 'Bottom':
					yPos0 = chartHeight - totalSize;
					break;
				case "Center":
					yPos0 = (chartHeight - totalSize)/2;
					break;
			}

			// take the list of nodes in the group, and recompute positions
			group[1].reduce((ypos, node) => {
				console.log(ypos, node);
				const nodeSize = node.y1 - node.y0;
				node.y0 = ypos;
				node.y1 = ypos + nodeSize;
				return ypos + nodeSize + nodesPadding
			}, yPos0)

		});

	// updates link position
	sankey.update(network);

  const svg = d3.select(svgNode).append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "visualization")

  svg.append("g")
    .selectAll("rect")
    .data(network.nodes)
    .join("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("height", d => d.y1 - d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("fill", 'black')
    .append("title")
    .text(d => `${d.id}: ${d.value}`);

  const link = svg.append("g")
    .attr("fill", "none")
    .attr("stroke-opacity", linksOpacity)
    .selectAll("g")
    .data(network.links)
    .join("g")
    .style("mix-blend-mode", "multiply");

  link.append("path")
    .attr("d", d3Sankey.sankeyLinkHorizontal())
    .attr("stroke", 'gray')
    .attr("stroke-width", d => Math.max(1, d.width));

  link.append("title")
    .text(d => `${d.source.name} → ${d.target.name}: ${d.value}`);

  svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .selectAll("text")
    .data(network.nodes)
    .join("text")
    .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
    .attr("y", d => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
    .text(d => d.id);

	// add steps titles
	const firstNodes = d3.groups(network.nodes, d => d.step).map(d => d[1][0])
	console.log(firstNodes)

	svg.append("g")
	.attr("font-family", "sans-serif")
	.attr("font-size", 10)
	.attr("font-weight", "bold")
	.selectAll("text")
	.data(firstNodes)
	.join("text")
	.attr("x", d => d.x0 + nodesPadding/2)
	.attr("y", d => d.y0 - 6)
	.attr("text-anchor", "middle")
	.text(d => d.step)

}
