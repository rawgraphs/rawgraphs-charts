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
    showLegend = false,
    //margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    padding = 1,
    // color
    colorScale,
  } = visualOptions

  // Margin convention
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  // select the SVG element
  const svg = d3.select(node)

  // nest data
  let nestedData = d3.groups(data, (d) => d.group)

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  const groupsDomain = nestedData.map((d) => d[0])

  const yScale = d3
    .scaleBand()
    .range([0, chartWidth])
    .domain(groupsDomain)
    .padding(padding / (chartWidth / groupsDomain.length))

  // add background
  svg
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')
}
