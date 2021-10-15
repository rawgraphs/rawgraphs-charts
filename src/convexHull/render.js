import * as d3 from 'd3'
import { legend, dateFormats, labelsOcclusion } from '@rawgraphs/rawgraphs-core'
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
    width,
    height,
    background,
    xOrigin,
    yOrigin,
    showPoints,
    dotsDiameter,
    groupStrokeWidth,
    groupOpacity,
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

  const vizLayer = svg.append('g').attr('id', 'viz')

  const hullsData = d3.groups(data, (d) =>
    d.group && d.group.length ? d.group : null
  )
  const hulls = vizLayer
    .selectAll('g.hulls')
    .data(hullsData)
    .join('g')
    .attr('class', 'hulls')

  hulls
    .append('path')
    .attr('d', (d) => {
      const points = d[1].map((p) => [x(p.x), y(p.y)])
      if (points.length === 1) {
        return d3.arc()({
          innerRadius: 0,
          outerRadius: groupStrokeWidth / 2,
          startAngle: 0,
          endAngle: 360,
        })
      } else if (points.length === 2) {
        return `M${points.join('L')}Z`
      } else {
        const hull = d3.polygonHull(points)
        return `M${hull.join('L')}Z`
      }
    })
    .attr('fill', (d) => colorScale(d[0]))
    .attr('stroke', (d) => colorScale(d[0]))
    .attr('stroke-width', (d) => (d[1].length === 1 ? 0 : groupStrokeWidth))
    .attr('stroke-linejoin', 'round')
    .attr('opacity', groupOpacity)
    .filter((d) => d[1].length === 1)
    .attr('transform', (d) => `translate(${x(d[1][0].x)}, ${y(d[1][0].y)})`)

  const points = hulls
    .append('g')
    .selectAll('cirlce')
    .data((d) => d[1])
    .join('circle')

  if (showPoints) {
    points
      .attr('cx', (d) => x(d.x))
      .attr('cy', (d) => y(d.y))
      .attr('fill', (d) => {
        return colorScale(d.group)
      })
      .attr('r', dotsDiameter / 2)
  }

  const labelsLayer = svg.append('g').attr('id', 'labels')
  labelsLayer
    .selectAll('g')
    .data(mapping.label.value ? data : [])
    .join('g')
    .attr('transform', (d) => `translate(${x(d.x)},${y(d.y)})`)
    .append('text')
    .attr('x', 0)
    .attr('y', 0)
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
      return `translate(0,${-height / 2})`
    })
  })

  const axisLayer = svg.append('g').attr('id', 'axis')

  axisLayer.append('g').call(xAxis)
  axisLayer.append('g').call(yAxis)

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    labelsLayer.selectAll('text').styles(styles.labelOutline)
  }

  if (autoHideLabels) {
    labelsOcclusion(labelsLayer.selectAll('text'), (d) => d.size)
  }

  if (showLegend) {
    const legendLayer = d3
      .select(svgNode)
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width},${marginTop})`)

    const chartLegend = legend().legendWidth(legendWidth)

    if (mapping.group.value) {
      chartLegend.addColor(mapping.group.value, colorScale)
    }

    legendLayer.call(chartLegend)
  }
}
