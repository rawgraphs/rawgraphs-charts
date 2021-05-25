import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import * as d3Gridding from 'd3-gridding'
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
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    showLegend,
    legendWidth,
    // series
    columnsNumber,
    showSeriesLabels,
    showGrid,
    // color dimension option, defined in visualOptions.js
    colorScale,
  } = visualOptions

  // Margin convention
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  // if series is exposed, recreate the nested structure
  const nestedData = d3.groups(data, (d) => d.series)

  // select the SVG element
  const svg = d3.select(svgNode)

  // add background
  svg
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')

  // add the visualization layer
  const vizLayer = svg.append('g').attr('id', 'viz')

  // set up grid
  const gridding = d3Gridding
    .gridding()
    .size([width, height])
    .mode('grid')
    .padding(0) // no padding, margins will be applied inside
    .cols(columnsNumber)

  const griddingData = gridding(nestedData)

  // draw the grid if asked
  if (showGrid) {
    svg
      .append('g')
      .attr('id', 'grid')
      .selectAll('rect')
      .data(griddingData)
      .enter()
      .append('rect')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('width', (d) => d.width)
      .attr('height', (d) => d.height)
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
  }

  // create the grid
  const series = vizLayer
    .selectAll('g')
    .data(griddingData)
    .join('g')
    .attr('id', (d) => d[0])
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')

  // get info on series
  const seriesWidth = griddingData[0].width - margin.right - margin.left
  const seriesHeight = griddingData[0].height - margin.top - margin.bottom

  // scales
  let columns = [mapping.source.value, mapping.target.value]
  let xScale = d3
    .scalePoint()
    .domain(columns)
    .range([margin.left, griddingData[0].width - margin.right])

  let yGlobalScale = d3
    .scaleLinear()
    .domain(d3.extent(data.flatMap((d) => [d.source, d.target])))
    .range([griddingData[0].height - margin.bottom, margin.top])

  /*
      YOU CAN PUT HERE CODE THAT APPLIES TO ALL THE SERIES
    */

  // do stuff for each serie
  series.each(function (d, seriesIndex) {
    // make a local selection for each serie
    const selection = d3.select(this)

    // add axes ticks
    selection
      .append('g')
      .attr('text-anchor', 'middle')
      .selectAll('g')
      .data(columns)
      .join('g')
      .attr('transform', (d, i) => `translate(${xScale(d)},20)`)
      .call((g) => g.append('text').text((d) => d))
      .call((g) =>
        g
          .append('line')
          .attr('y1', 3)
          .attr('y2', 9)
          .attr('stroke', 'currentColor')
      )

    //add lines
    selection
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .selectAll('line')
      .data(d[1])
      .join('line')
      .attr('x1', (d) => xScale(mapping.source.value))
      .attr('x2', (d) => xScale(mapping.target.value))
      .attr('y1', (d) => yGlobalScale(d.source))
      .attr('y2', (d) => yGlobalScale(d.target))

    // add labels
    let sourceLabels = selection
      .append('g')
      .selectAll('text')
      .data(d[1])
      .join('text')
      .text((d) => (mapping.name ? d.name + ' ' + d.source : d.source))
      .attr(
        'transform',
        (d) =>
          `translate(${xScale(mapping.source.value)},${yGlobalScale(d.source)})`
      )
      .attr('text-anchor', 'end')
      .styles(styles.labelSecondary)

    // use forces to avoid overlaps
    const simulation = d3
      .forceSimulation(d[1])
      .force(
        'y',
        d3.forceY().y((d) => yGlobalScale(d.source))
      )
      .force('x', d3.forceX().x(xScale(mapping.source.value)))
      .force('collision', d3.forceCollide().radius(8))

    simulation.on('tick', () => {
      sourceLabels.attr('transform', function (d) {
        d.x = xScale(mapping.source.value) // constrain x for all labels
        return `translate(${d.x},${d.y})`
      })
    })

    selection
      .append('g')
      .selectAll('text')
      .data(d[1])
      .join('text')
      .text((d) => (mapping.name ? d.name + ' ' + d.target : d.target))
      .attr('x', (d) => xScale(mapping.target.value))
      .attr('y', (d) => yGlobalScale(d.target))
      .attr('text-anchor', 'start')
      .styles(styles.labelSecondary)

    /*
      ADD HERE THE CHART CODE
    */
  })
}
