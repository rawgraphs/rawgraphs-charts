import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

export function render(
  node,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
  // destructurate visual visualOptions
  const {
    // default options
    width,
    height,
    background,
    dotsRadius,
    colorScale,
    // add below other options defined in visualOptions.js
  } = visualOptions

  // select the SVG element
  const svg = d3.select(node)

  svg
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', background)

  let xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.x))
    .rangeRound([0, width])
    .nice()

  let yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.y))
    .rangeRound([height, 0])
    .nice()

  svg
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => xScale(d.x))
    .attr('cy', (d) => yScale(d.y))
    .attr('r', dotsRadius)
    .attr('fill', (d) => colorScale(d.color))

  svg
    .append('text')
    .attr('x', 10)
    .attr('y', 20)
    .text('My chart')
    .styles(styles.seriesLabel)
  //
  const legendLayer = svg
    .append('g')
    .attr('id', 'legend')
    .attr('transform', `translate(${10},${40})`)

  // if color is mapped, create the legend
  if (mapping.color.value) {
    // create the legend object
    const chartLegend = legend().legendWidth(200)
    //add color to the legend
    chartLegend.addColor(mapping.color.value, colorScale)
    // render the legend
    legendLayer.call(chartLegend)
  }
}
