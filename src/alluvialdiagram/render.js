import * as d3 from 'd3'
import * as d3Sankey from 'd3-sankey'
import '../d3-styles.js'

export function render(
  svgNode,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
  const {
    // artboard
    width,
    height,
    background,
    // margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    nodesWidth,
    nodesPadding,
    linksOpacity,
    sortNodesBy,
    verticalAlignment,
    linksBlendMode,
    // color
    colorScale,
    // Labels
    showValues,
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

  //get unique nodes from links. @TODO: probably it could be improved
  let nodes = links
    .flatMap((l) => [
      {
        id: l.source,
        name: l.sourceName,
        step: l.sourceStep,
      },
      {
        id: l.target,
        name: l.targetName,
        step: l.targetStep,
      },
    ])
    .reduce((map, obj) => {
      map.set(obj.id, obj)
      return map
    }, new Map())

  nodes = Array.from(nodes).map((d) => d[1])

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
    .nodeWidth(nodesWidth)
    .nodePadding(nodesPadding)
    .extent([
      [0, 0],
      [chartWidth, chartHeight],
    ])
    .iterations(0) // no iterations since we compute all the positions

  // compute the sankey network (calculate size, define x and y positions.)
  const network = sankey({
    nodes,
    links,
  })

  // sort nodes according to options

  switch (sortNodesBy) {
    case 'sizeDescending':
      network.nodes.sort((a, b) => d3.descending(a.value, b.value))
      break
    case 'sizeAscending':
      network.nodes.sort((a, b) => d3.ascending(a.value, b.value))
      break
    case 'name':
      network.nodes
        //first sort by type
        .sort((a, b) => d3.ascending(typeof a.name, typeof b.name))
        // then by actual value
        .sort((a, b) => d3.ascending(a.name, b.name))
      break
  }

  //check the amount of space required
  let verticalSize = d3.rollups(
    network.nodes,
    (v) => v.length - 1,
    (d) => d.step
  )

  let maxItemsAmount = d3.max(verticalSize, (d) => d[1])

  if (maxItemsAmount * nodesPadding > chartHeight) {
    throw new Error(
      'Padding is too high for artboard height. To represent all the ' +
        maxItemsAmount +
        ' items, increase artbort height above ' +
        (maxItemsAmount * nodesPadding + margin.top + margin.bottom) +
        'px OR decrase padding below ' +
        Math.floor(chartHeight / maxItemsAmount) +
        'px in the panel "chart" > "Padding"'
    )
  }

  // compute x positions of groups
  // get the first node for each category
  // we don't use the sankey.nodeSort() and sankey.linkSort()
  // d3 functions since it doens't allow to center vertically the nodes

  const xScale = d3
    .scaleBand()
    .range([0, chartWidth - nodesWidth])
    .domain(mapping.steps.value)
    .align(0)
    .paddingInner(1)

  // update nodes vertical position
  d3.groups(network.nodes, (d) => d.step)
    // for each group, compute position
    .forEach((group) => {
      // compute the starting point.
      let yPos0 = 0
      const totalSize =
        d3.sum(group[1], (d) => d.y1 - d.y0) +
        (group[1].length - 1) * nodesPadding
      // if top, do nothing.
      // if bottom, sum the size of nodes and required padding.
      // if center, the hal of the previous
      switch (verticalAlignment) {
        case 'Bottom':
          yPos0 = chartHeight - totalSize
          break
        case 'Center':
          yPos0 = (chartHeight - totalSize) / 2
          break
      }

      // take the list of nodes in the group, and recompute positions
      group[1].reduce((ypos, node) => {
        const nodeSize = node.y1 - node.y0
        node.y0 = ypos
        node.y1 = ypos + nodeSize
        node.x0 = xScale(node.step)
        node.x1 = node.x0 + nodesWidth
        return ypos + nodeSize + nodesPadding
      }, yPos0)
    })

  // sort edges to avoid overlaps
  network.nodes.forEach((node) => {
    node.sourceLinks.sort((a, b) => d3.ascending(a.target.y0, b.target.y0))
    node.targetLinks.sort((a, b) => d3.ascending(a.source.y0, b.source.y0))
  })

  // updates link position
  sankey.update(network)

  // draw background
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
    .attr('id', 'visualization')

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
    .text((d) => `${d.name}: ${d.value}`)

  const link = svg
    .append('g')
    .attr('fill', 'none')
    .attr('stroke-opacity', linksOpacity)
    .selectAll('g')
    .data(network.links)
    .join('g')
    .style('mix-blend-mode', linksBlendMode)

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
    .attr('x', (d) => (d.x0 < width / 2 ? d.x1 + 4 : d.x0 - 4))
    .text((d) => d.name)
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

  // add steps titles
  const firstNodes = d3.groups(network.nodes, (d) => d.step).map((d) => d[1][0])

  svg
    .append('g')
    .selectAll('text')
    .data(firstNodes)
    .join('text')
    .attr('x', (d) => d.x0 + nodesWidth / 2)
    .attr('y', (d) => d.y0 - 4)
    .attr('text-anchor', 'middle')
    .text((d) => d.step)
    .styles(styles.axisLabel)
}
