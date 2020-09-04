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
      alignment,
      iterations
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
  //get nodes from links
  const nodes = Array.from(new Set(links.flatMap(l => [l.source, l.target])), id => ({
    id
  }));

  // convert option with alignment function names
  const alignments = {
    'Left':'sankeyLeft',
    'Right':'sankeyRight',
    'Center':'sankeyCenter',
    'Justify': 'sankeyJustify'
}

console.log(alignments[alignment])

  const sankey = d3Sankey.sankey()
    .nodeId(d => d.id)
    .nodeAlign(d3Sankey[alignments[alignment]])
    .nodeWidth(nodesWidth)
    .nodePadding(nodesPadding)
    .extent([
      [0, 0],
      [chartWidth, chartHeight]
    ])
    .iterations(iterations)

  const network = sankey({
    nodes,
    links
  })

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
    .attr("stroke-opacity", 0.5)
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
}
