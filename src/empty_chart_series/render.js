import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import * as d3Gridding from 'd3-gridding'
import '../d3-styles.js'

export function render(svgNode, data, visualOptions, mapping, originalData) {
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
    .attr(
      'transform',
      (d) => 'translate(' + (d.x + margin.left) + ',' + (d.y + margin.top) + ')'
    )

  /*
      YOU CAN PUT HERE CODE THAT APPLIES TO ALL THE SERIES
    */

  // do stuff for each serie
  series.each(function (d, seriesIndex) {
    // make a local selection for each serie
    const selection = d3.select(this)

    // compute each serie width and height
    const seriesWidth = d.width - margin.right - margin.left
    const seriesHeight = d.height - margin.top - margin.bottom

    /*
      ADD HERE THE CHART CODE
    */
  })
}
