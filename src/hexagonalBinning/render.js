import * as d3 from 'd3'
import * as d3Hexbin from 'd3-hexbin'
import { legend, labelsOcclusion } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

export function colorDomain(data, mapping, visualOptions) {
  const {
    width,
    height,
    diameter,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    xOrigin,
    yOrigin,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  if (!data) {
    return {
      domain: [],
      type: 'number',
    }
  }

  // x scale
  const xDomain = xOrigin
    ? [0, d3.max(data, (d) => d.x)]
    : d3.extent(data, (d) => d.x)

  const x = mapping.x.dataType === 'date' ? d3.scaleTime() : d3.scaleLinear()

  x.domain(xDomain).rangeRound([0, chartWidth]).nice()

  // y scale
  const yDomain = yOrigin
    ? [0, d3.max(data, (d) => d.y)]
    : d3.extent(data, (d) => d.y)

  const y = mapping.y.dataType === 'date' ? d3.scaleTime() : d3.scaleLinear()

  y.domain(yDomain).rangeRound([chartHeight, 0]).nice()

  const hexbin = d3Hexbin
    .hexbin()
    .x((d) => x(d.x))
    .y((d) => y(d.y))
    .radius(diameter / 2)
    .extent([
      [margin.left, margin.top],
      [chartWidth, chartHeight],
    ])

  const bins = hexbin(data)
  const domain = bins.map((d) => d.length)
  return {
    domain,
    type: 'number',
  }
}

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
    xOrigin,
    yOrigin,
    diameter,
    weightSize,
    showPoints,
    dotsDiameter,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
    showCountLabels,
    showLabelsOutline,
    autoHideLabels,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // x scale
  const xDomain = xOrigin
    ? [0, d3.max(data, (d) => d.x)]
    : d3.extent(data, (d) => d.x)

  const x =
    mapping.x.dataType.type === 'date' ? d3.scaleTime() : d3.scaleLinear()

  x.domain(xDomain).rangeRound([0, chartWidth]).nice()

  // y scale
  const yDomain = yOrigin
    ? [0, d3.max(data, (d) => d.y)]
    : d3.extent(data, (d) => d.y)

  const y =
    mapping.y.dataType.type === 'date' ? d3.scaleTime() : d3.scaleLinear()

  y.domain(yDomain).rangeRound([chartHeight, 0]).nice()

  const xAxis = (g) => {
    return g
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .call((g) =>
        g
          .append('text')
          .attr('x', chartWidth)
          .attr('dy', -5)
          .attr('text-anchor', 'end')
          .text(mapping['x'].value)
          .styles(styles.axisLabel)
      )
  }

  const yAxis = (g) => {
    return g
      .call(d3.axisLeft(y))
      .call((g) =>
        g
          .append('text')
          .attr('x', 4)
          .attr('text-anchor', 'start')
          .attr('dominant-baseline', 'hanging')
          .text(mapping['y'].value)
          .styles(styles.axisLabel)
      )
  }

  const artboardBackground = d3
    .select(svgNode)
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'background')

  const svg = d3
    .select(svgNode)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('id', 'visualization')

  const axisLayer = svg.append('g').attr('id', 'axis')

  axisLayer.append('g').call(xAxis)
  axisLayer.append('g').call(yAxis)

  const vizLayer = svg.append('g').attr('id', 'viz')

  const hexbin = d3Hexbin
    .hexbin()
    .x((d) => x(d.x))
    .y((d) => y(d.y))
    .radius(diameter / 2)
    .extent([
      [margin.left, margin.top],
      [chartWidth, chartHeight],
    ])

  const bins = hexbin(data)

  const size = d3
    .scaleSqrt()
    .domain([0, d3.max(bins, (d) => d.length)])
    .rangeRound([weightSize ? 0 : diameter / 2, diameter / 2])

  const hex = vizLayer.selectAll('g').data(bins).join('g')

  hex
    .append('path')
    .attr('d', (d) => hexbin.hexagon(size(d.length)))
    .attr('transform', (d) => `translate(${d.x},${d.y})`)
    .attr('fill', (d) => colorScale(d.length))
    .attr('stroke', 'white')

  if (showPoints) {
    hex
      .selectAll('circle')
      .data((d) => d)
      .join('circle')
      .attr('cx', (d) => x(d.x))
      .attr('cy', (d) => y(d.y))
      .attr('fill', 'black')
      .attr('r', dotsDiameter / 2)
  }

  if (showCountLabels) {
    hex
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .text((d) => d.length)
      .styles(styles.labelSecondary)
  }

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    hex.selectAll('text').styles(styles.labelOutline)
  }

  if (autoHideLabels) {
    labelsOcclusion(hex.selectAll('text'), (d) => d.length)
  }

  if (showLegend) {
    const legendLayer = d3
      .select(svgNode)
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width},${marginTop})`)

    const chartLegend = legend().legendWidth(legendWidth)

    if (colorScale.domain().length) {
      chartLegend.addColor('count', colorScale)
    }

    legendLayer.call(chartLegend)
  }
}
