import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

/*
Credits:
Inspired by https://observablehq.com/@d3/parallel-coordinates
*/

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
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart
    orientation,
    strokeWidth,
    strokeOpacity,
    // color
    colorScale,
    // legend
    showLegend,
    legendWidth,
    // add below other options defined in visualOptions.js
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  let chartWidth = width - margin.left - margin.right
  let chartHeight = height - margin.top - margin.bottom

  // select the SVG element
  const svg = d3.select(node)
  // add background
  svg
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')
  //add viz group
  let viz = svg
    .append('g')
    .attr('id', 'viz')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // create a boolean variable for simplicity

  const horizontal = orientation == 'horizontal'

  const keys = mapping.dimensions.value

  const axesScales = new Map(
    Array.from(keys, (key, i) => [
      key,
      d3.scaleLinear(
        d3.extent(data, (d) => d.dimensions[i]),
        [0, horizontal ? chartWidth : chartHeight]
      ),
    ])
  )

  const catScales = d3.scalePoint(keys, [
    0,
    horizontal ? chartHeight : chartWidth,
  ])

  const line = d3.line()

  if (horizontal) {
    line.x((d, i) => axesScales.get(keys[i])(d)).y((d, i) => catScales(keys[i]))
  } else {
    line.y((d, i) => axesScales.get(keys[i])(d)).x((d, i) => catScales(keys[i]))
  }

  //add lines
  viz
    .append('g')
    .attr('id', 'lines')
    .attr('fill', 'none')
    .selectAll('path')
    .data(data)
    .join('path')
    .attr('d', (d) => line(d.dimensions))
    .attr('stroke', (d) => colorScale(d.color))
    .attr('stroke-width', strokeWidth)
    .attr('stroke-opacity', strokeOpacity)

  // add axes
  viz
    .append('g')
    .selectAll('g')
    .data(keys)
    .join('g')
    .attr('transform', (d) =>
      horizontal
        ? `translate(0,${catScales(d)})`
        : `translate(${catScales(d)},0)`
    )
    .each(function (d) {
      if (horizontal) {
        d3.select(this).call(d3.axisBottom(axesScales.get(d)))
      } else {
        d3.select(this).call(d3.axisLeft(axesScales.get(d)))
      }
    })
    .call((g) =>
      g
        .append('text')
        .attr('y', -6)
        .attr('text-anchor', 'start')
        .attr('fill', 'currentColor')
        .text((d) => d)
    )

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option

    const legendLayer = svg
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width},${marginTop})`)

    const chartLegend = legend().legendWidth(legendWidth)

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale)
    }

    legendLayer.call(chartLegend)
  }
}
