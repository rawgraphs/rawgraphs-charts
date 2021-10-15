import * as d3 from 'd3'
import * as d3Sankey from 'd3-sankey'
import * as louvain from 'louvain'

/*
Credits:
Inspired by https://observablehq.com/@d3/arc-diagram
*/

export function render(svgNode, data, visualOptions, mapping, originalData) {
  const {
    // artboard
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    //chart
    minDiameter,
    maxDiameter,
    nodeSize,
    orderNodesBy,
    linkOpacity,
    sameSide,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // create a graph data file from the incoming data
  let graph = graphFromEdgesTable(data)

  //compute nodes modularity
  if (orderNodesBy == 'Minimize overlaps') {
    let community = louvain
      .jLouvain()
      .nodes(graph.nodes.map((d) => d.id))
      .edges(
        graph.links.map((d) => ({
          source: d.source.id,
          target: d.target.id,
          weight: d.value,
        }))
      )
    let results = community()
    graph.nodes.forEach((n) => (n.community = results[n.id]))
  }

  // sort nodes
  // 'Name', 'Links count (degree)', 'Total value'
  graph.nodes.sort((a, b) => {
    switch (orderNodesBy) {
      case 'Total value':
        return d3.descending(a.totalValue, b.totalValue)
      case 'Links count (degree)':
        return d3.ascending(a.degree, b.degree)
      case 'Name':
        return d3.ascending(a.id, b.id)
      case 'Minimize overlaps':
        return d3.ascending(a.community, b.community)
      default:
        return 0
    }
  })

  // size scale
  const sizeScale = d3
    .scaleSqrt()
    .domain([0, d3.max(graph.nodes, (d) => d[nodeSize])])
    .range([minDiameter, maxDiameter])

  // widthScale (for nodes)
  const widthScale = d3
    .scaleLinear()
    .domain([0, d3.max(graph.links, (d) => d.value)])
    .range([0, maxDiameter])

  // get the total size
  const totalValue = d3.sum(graph.nodes, (d) => sizeScale(d[nodeSize]) * 2)

  // compute padding
  const padding = (chartWidth - totalValue) / (graph.nodes.length - 1)

  // compute x positions. @TODO could be improved
  let xPos = 0
  graph.nodes.forEach((d, i) => {
    d.x = xPos + sizeScale(d[nodeSize])
    d.y = sameSide ? chartHeight - maxDiameter : chartHeight / 2
    xPos += padding + sizeScale(d[nodeSize]) * 2
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

  // draw links
  const arcs = svg.append('g').attr('id', 'arcs')

  arcs
    .selectAll('path')
    .data(graph.links)
    .enter()
    .append('path')
    .attr('d', (d) => {
      const r = Math.abs(d.source.x - d.target.x) / 2

      const sweep = sameSide ? (d.source.x < d.target.x ? 1 : 0) : 1

      return `M${d.source.x},${d.source.y}A${r},${r} 0,0,${sweep} ${d.target.x},${d.target.y}`
    })
    .attr('fill', 'none')
    .attr('stroke', 'gray')
    .attr('stroke-width', (d) => widthScale(d.value))
    .attr('opacity', linkOpacity)

  // draw nodes
  const nodes = svg
    .append('g')
    .attr('id', 'nodes')
    .selectAll('g')
    .data(graph.nodes)
    .enter()
    .append('g')
  // add circles
  nodes
    .append('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', (d) => sizeScale(d[nodeSize]))
  // add labels
  nodes
    .append('text')
    // .attr('x', (d) => d.x)
    // .attr('y', (d) => d.y + sizeScale(d[nodeSize]))
    .text((d) => d.id)
    .attr(
      'transform',
      (d) => `translate(${d.x},${d.y + sizeScale(d[nodeSize]) + 5}) rotate(-90)`
    )
    .attr('alignment-baseline', 'middle')
    .attr('font-family', 'Helvetica, Arial, sans-serif')
    .attr('font-size', 12)
    .attr('text-anchor', 'end')
}

/*
 helper function to create a graph js object
 */
function graphFromEdgesTable(_edgesTable) {
  // links are a deep copy of the dataset, to avoid modification of origina data variable
  let links = _edgesTable.map((d) => Object.assign({}, d))

  const nodes = Array.from(
    new Set(links.flatMap((l) => [l.source, l.target])),
    (id) => ({
      id,
      outLinks: [],
      inLinks: [],
      totalValue: 0,
      inValue: 0,
      outValue: 0,
      degree: 0,
      inDegree: 0,
      outDegree: 0,
      default: 1,
    })
  )

  const nodeById = new Map(nodes.map((d) => [d.id, d]))

  //links are now re-populated ank linked to nodes objects
  links = links.map(({ source, target, value }) => ({
    source: nodeById.get(source),
    target: nodeById.get(target),
    value,
  }))

  // links added to nodes objects
  for (const link of links) {
    const { source, target, value } = link
    //update source
    source.outLinks.push(link)
    source.totalValue += link.value
    source.outValue += link.value
    source.degree++
    source.outDegree++
    //update target
    target.inLinks.push(link)
    target.degree++
    target.inDegree++
    target.totalValue += link.value
    target.inValue += link.value
  }

  return { nodes, links }
}
