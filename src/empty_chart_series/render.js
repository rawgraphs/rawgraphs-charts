import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
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

  const vizLayer = svg.append('g').attr('id', 'viz')

  // if series is exposed, recreate the nested structure
  const nestedData = d3.rollups(
    data,
    (v) => v,
    (d) => d.series
  )

  // select the SVG element
  const svg = d3.select(svgNode)
  // create the grid
  const series = svg
    .selectAll('g')
    .data(griddingData)
    .join('g')
    .attr('id', (d) => d.data[0])
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
