import * as d3 from 'd3'
import * as d3Contour from 'd3-contour'
import { legend, dateFormats, labelsOcclusion } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

export function colorDomain(data, mapping, visualOptions) {
  const {
    width,
    height,
    bandwidth,
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

  const contours = d3Contour
    .contourDensity()
    .x((d) => x(d.x))
    .y((d) => y(d.y))
    .size([chartWidth, chartHeight])
    .bandwidth(bandwidth)(data)

  const domain = contours.map((d) => d.value)

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
    showPoints,
    dotsDiameter,
    bandwidth,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
    showBandLabels,
    labelThresholds,
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

  svg
    .append('clipPath')
    .attr('id', 'plotClipPath')
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', chartWidth)
    .attr('height', chartHeight)

  const vizLayer = svg
    .append('g')
    .attr('id', 'viz')
    .attr('clip-path', 'url(#plotClipPath)')

  const contours = d3Contour
    .contourDensity()
    .x((d) => x(d.x))
    .y((d) => y(d.y))
    .size([chartWidth, chartHeight])
    .bandwidth(bandwidth)(data)

  const contourBand = vizLayer.selectAll('g').data(contours).join('g')

  contourBand
    .append('path')
    .attr('fill', (d) => colorScale(d.value))
    .attr('stroke', (d) => d3.lab(colorScale(d.value)).darker(1))
    .attr('stroke-opacity', (d, i) => (i % labelThresholds === 0 ? 1 : 0.3))
    .attr('d', d3.geoPath())

  if (showPoints) {
    vizLayer
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => x(d.x))
      .attr('cy', (d) => y(d.y))
      .attr('fill', 'black')
      .attr('r', dotsDiameter / 2)
  }

  const labelsLayer = svg.append('g').attr('id', 'labels')

  const axisLayer = svg.append('g').attr('id', 'axis')

  axisLayer.append('g').call(xAxis)
  axisLayer.append('g').call(yAxis)

  const steps = 40
  if (showBandLabels) {
    // adapted from https://observablehq.com/@fil/contour-labels-svg
    contours.forEach((cont, index) => {
      if (index % labelThresholds === 0) {
        cont.coordinates.forEach((polygon) => {
          polygon.forEach((ring, j) => {
            const p = ring.slice(1, Infinity),
              // best number of steps to divide ring.length
              possibilities = d3.range(steps, steps * 1.4),
              scores = possibilities.map((d) => -((p.length - 1) % d)),
              n = possibilities[d3.scan(scores)],
              // best starting point: bottom for first rings, top for holes
              start =
                1 + (d3.scan(p.map((xy) => (j === 0 ? -1 : 1) * xy[1])) % n),
              margin = 2

            p.forEach((xy, i) => {
              if (
                i % n === start &&
                xy[0] > margin &&
                xy[0] < chartWidth - margin &&
                xy[1] > margin &&
                xy[1] < chartHeight - margin
              ) {
                const a = (i - 2 + p.length) % p.length,
                  b = (i + 2) % p.length,
                  dx = p[b][0] - p[a][0],
                  dy = p[b][1] - p[a][1]
                if (dx === 0 && dy === 0) return

                const angle =
                  (Math.cos(Math.atan2(dy, dx)) < 0 ? Math.PI : 0) +
                  Math.atan2(dy, dx)

                labelsLayer
                  .append('text')
                  .attr('stroke', 'none')
                  .attr('text-anchor', 'middle')
                  .attr('dy', '0.3em')
                  .attr(
                    'transform',
                    `translate(${xy})rotate(${(angle * 180) / Math.PI})`
                  )
                  .text(cont.value)
                  .styles(styles.labelSecondary)
                //.styles(styles.labelOutline)
              }
            })
          })
        })
      }
    })
  }

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    labelsLayer.selectAll('text').styles(styles.labelOutline)
  }

  if (autoHideLabels) {
    labelsOcclusion(labelsLayer.selectAll('text'), (d, i) => i)
  }

  if (showLegend) {
    const legendLayer = d3
      .select(svgNode)
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width},${marginTop})`)

    const chartLegend = legend().legendWidth(legendWidth)

    if (colorScale.domain().length) {
      chartLegend.addColor('density', colorScale)
    }

    legendLayer.call(chartLegend)
  }
}
