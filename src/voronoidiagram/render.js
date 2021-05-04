import * as d3 from 'd3'
import { legend, dateFormats, labelsOcclusion } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

export function render(
  node,
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
    showStroke,
    showPoints,
    dotsDiameter,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
    showLabelsOutline,
    autoHideLabels,
    labelStyles,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // select the SVG element
  const svg = d3.select(node)

  svg
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'background')

  // scales
  // x scale
  const xDomain = xOrigin
    ? [0, d3.max(data, (d) => d.x)]
    : d3.extent(data, (d) => d.x)

  const xScale =
    mapping.x.dataType.type === 'date' ? d3.scaleTime() : d3.scaleLinear()

  xScale.domain(xDomain).rangeRound([0, chartWidth]).nice()

  // y scale
  const yDomain = yOrigin
    ? [0, d3.max(data, (d) => d.y)]
    : d3.extent(data, (d) => d.y)

  const yScale =
    mapping.y.dataType.type === 'date' ? d3.scaleTime() : d3.scaleLinear()

  yScale.domain(yDomain).rangeRound([chartHeight, 0]).nice()

  // axes
  const xAxis = (g) => {
    return g
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))
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
      .call(d3.axisLeft(yScale))
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

  const vizLayer = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('id', 'visualization')

  let points = data.map((d) => [xScale(d.x), yScale(d.y)])

  const delaunay = d3.Delaunay.from(points)

  const voronoi = delaunay.voronoi([0, 0, chartWidth, chartHeight])

  const cells = vizLayer
    .append('g')
    .attr('id', 'cells')
    .attr('stroke', showStroke ? '#ccc' : null)
    .selectAll('path')
    .data(points)
    .join('path')
    .attr('fill', (d, i) => colorScale(data[i].color))
    .attr('d', (d, i) => voronoi.renderCell(i))

  if (showPoints) {
    const dots = vizLayer
      .append('g')
      .selectAll('cicle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', dotsDiameter / 2)
      .attr('fill', 'black')
  }

  const axisLayer = vizLayer.append('g').attr('id', 'axis')

  axisLayer.append('g').call(xAxis)
  axisLayer.append('g').call(yAxis)

  const labelsLayer = vizLayer.append('g').attr('id', 'labels')

  labelsLayer
    .selectAll('g')
    .data(mapping.label.value ? data : [])
    .join('g')
    .attr('transform', (d) => `translate(${xScale(d.x)},${yScale(d.y)})`)
    .append('text')
    .attr('x', 0)
    .attr('y', 0)
    .attr('test', (d) => {
      console.log(d)
    })
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'text-before-edge')
    .selectAll('tspan')
    .data((d) => (Array.isArray(d.label) ? d.label : [d.label]))
    .join('tspan')
    .attr('x', 0)
    .attr('y', 0)
    .attr('dy', (d, i) => i * 12)
    .text((d, i) => {
      if (d && mapping.label.dataType[i].type === 'date') {
        return d3.timeFormat(dateFormats[mapping.label.dataType[i].dateFormat])(
          d
        )
      } else {
        return d
      }
    })
    .styles((d, i) => styles[labelStyles[i]])

  labelsLayer.selectAll('text').call((sel) => {
    return sel.attr('transform', function (d) {
      const height = sel.node().getBBox().height
      return `translate(0,${
        showPoints ? -height - dotsDiameter / 2 - 2 : -height / 2
      })`
    })
  })

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    labelsLayer.selectAll('text').styles(styles.labelOutline)
  }

  if (autoHideLabels) {
    labelsOcclusion(labelsLayer.selectAll('text'), (d) => d.size)
  }

  if (showLegend) {
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
