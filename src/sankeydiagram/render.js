import * as d3 from 'd3'
import * as d3Sankey from 'd3-sankey'
import '../d3-styles.js'

/*
Credits:
Inspired by https://observablehq.com/@d3/sankey-diagram
*/

export function render(
  svgNode,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
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
    iterations,
    //labels
    showValues,
    // color scale
    colorScale,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // links are a deep copy of the dataset, to avoid modification of origina data variable
  const links = data.map((d) => Object.assign({}, d))

  //get nodes from links
  const nodes = Array.from(
    new Set(links.flatMap((l) => [l.source, l.target])),
    (id) => ({
      id,
    })
  )

  // convert option with alignment function names
  const alignments = {
    Left: 'sankeyLeft',
    Right: 'sankeyRight',
    Center: 'sankeyCenter',
    Justify: 'sankeyJustify',
  }

  const sankey = d3Sankey
    .sankey()
    .nodeId((d) => d.id)
    .nodeAlign(d3Sankey[alignments[alignment]])
    .nodeWidth(nodesWidth)
    .nodePadding(nodesPadding)
    .extent([
      [0, 0],
      [chartWidth, chartHeight],
    ])
    .iterations(iterations)

  const network = sankey({
    nodes,
    links,
  })

  // add background
  d3.select(svgNode)
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')

  const svg = d3
    .select(svgNode)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('id', 'viz')

  svg
    .append('g')
    .selectAll('rect')
    .data(network.nodes)
    .join('rect')
    .attr('x', (d) => d.x0)
    .attr('y', (d) => d.y0)
    .attr('height', (d) => d.y1 - d.y0)
    .attr('width', (d) => d.x1 - d.x0)
    .attr('fill', 'black')
    .append('title')
    .text((d) => `${d.id}: ${d.value}`)

  const link = svg
    .append('g')
    .attr('fill', 'none')
    .attr('stroke-opacity', 0.5)
    .selectAll('g')
    .data(network.links)
    .join('g')
    .style('mix-blend-mode', 'multiply')

  link
    .append('path')
    .attr('d', d3Sankey.sankeyLinkHorizontal())
    .attr('stroke', (d) => colorScale(d.source.id))
    .attr('stroke-width', (d) => Math.max(1, d.width))

  link
    .append('title')
    .text((d) => `${d.source.name} → ${d.target.name}: ${d.value}`)

  const nodesLabels = svg
    .append('g')
    .selectAll('text')
    .data(network.nodes)
    .join('text')
    .attr('x', (d) => (d.x0 < width / 2 ? d.x1 + 4 : d.x0 - 4))
    .attr('y', (d) => d.y0 + (d.y1 - d.y0) / 2)
    .attr('text-anchor', (d) => (d.x0 < width / 2 ? 'start' : 'end'))

  nodesLabels
    .append('tspan')
    .attr('alignment-baseline', 'middle')
    .text((d) => d.id)
    .styles(styles.labelPrimary)

  if (showValues) {
    nodesLabels
      .append('tspan')
      .attr('alignment-baseline', 'middle')
      .attr('x', (d) => (d.x0 < width / 2 ? d.x1 + 4 : d.x0 - 4))
      .attr('dy', parseFloat(styles.labelPrimary.fontSize) + 2)
      .text((d) => d.value)
      .styles(styles.labelSecondary)

    nodesLabels.attr(
      'transform',
      `translate(0,${-parseFloat(styles.labelSecondary.fontSize) / 2})`
    )
  }
}
