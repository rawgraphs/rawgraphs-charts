import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

/*
Credits:
Inspired by https://observablehq.com/@d3/box-plot
*/

export function render(
  svgNode,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
  let {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // charts options
    barsWidth,
    iqrMultiplier, // to compute otuliers
    dotsDiameter,
    yOrigin,
    //legend
    showLegend,
    legendWidth,
    // color
    colorScale,
    // labels
    showValues,
  } = visualOptions

  // Margin convention
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // add background
  d3.select(svgNode)
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')

  const svg = d3
    .select(svgNode)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('id', 'viz')

  const yDomain = yOrigin
    ? [0, d3.max(data, (d) => d.value)]
    : d3.extent(data, (d) => d.value)

  const yScale = d3.scaleLinear().domain(yDomain).nice().range([chartHeight, 0])

  const groupsDomain = [...new Set(data.map((d) => d.group))]

  const xScale = d3
    .scalePoint()
    .rangeRound([0, chartWidth])
    .domain(groupsDomain)
    .padding(0.5)

  // if series is exposed, recreate the nested structure
  const nestedData = d3.rollups(
    data,
    (v) => {
      const values = v.map((d) => d.value).sort(d3.ascending)

      const min = values[0]
      const max = values[values.length - 1]
      const q1 = d3.quantile(values, 0.25)
      const q2 = d3.quantile(values, 0.5)
      const q3 = d3.quantile(values, 0.75)
      const iqr = q3 - q1 // interquartile range
      const r0 = Math.max(min, q1 - iqr * iqrMultiplier)
      const r1 = Math.min(max, q3 + iqr * iqrMultiplier)

      return {
        group: v[0].group,
        color: v[0].color,
        values: v,
        quartiles: [q1, q2, q3],
        range: [r0, r1],
        outliers: v.filter((d) => d.value < r0 || d.value > r1),
      }
    },
    (d) => d.group
  )
  // append scales
  svg
    .append('g')
    .attr('id', 'y axis')
    .call(d3.axisLeft(yScale))
    .append('text')
    .styles(styles.axisLabel)
    .attr('x', 4)
    .attr('text-anchor', 'start')
    .attr('dominant-baseline', 'hanging')
    .text(mapping['value'].value)

  svg
    .append('g')
    .attr('id', 'x axis')
    .attr('transform', 'translate(0,' + chartHeight + ')')
    .call(d3.axisBottom(xScale))

  //append boxplots

  const boxplots = svg
    .append('g')
    .attr('id', 'boxplots')
    .selectAll('g')
    .data(nestedData)
    .join('g')

  // add the line between quartiles
  boxplots
    .append('line')
    .attr('x1', (d) => xScale(d[1].group))
    .attr('x2', (d) => xScale(d[1].group))
    .attr('y1', (d) => yScale(d[1].range[1]))
    .attr('y2', (d) => yScale(d[1].range[0]))
    .attr('stroke', (d) => colorScale(d[1].color))
    .attr('stroke-dasharray', 4)

  // add lines at top and bottom
  boxplots
    .append('line')
    .attr('x1', (d) => xScale(d[1].group) - barsWidth / 2)
    .attr('x2', (d) => xScale(d[1].group) + barsWidth / 2)
    .attr('y1', (d) => yScale(d[1].range[1]))
    .attr('y2', (d) => yScale(d[1].range[1]))
    .attr('stroke', (d) => colorScale(d[1].color))

  boxplots
    .append('line')
    .attr('x1', (d) => xScale(d[1].group) - barsWidth / 2)
    .attr('x2', (d) => xScale(d[1].group) + barsWidth / 2)
    .attr('y1', (d) => yScale(d[1].range[0]))
    .attr('y2', (d) => yScale(d[1].range[0]))
    .attr('stroke', (d) => colorScale(d[1].color))

  // add the boxes
  boxplots
    .append('rect')
    .attr('x', (d) => xScale(d[1].group) - barsWidth / 2)
    .attr('y', (d) => yScale(d[1].quartiles[2]))
    .attr('width', barsWidth)
    .attr(
      'height',
      (d) => yScale(d[1].quartiles[0]) - yScale(d[1].quartiles[2])
    )
    .attr('fill', (d) => colorScale(d[1].color))

  //add the half line
  boxplots
    .append('line')
    .attr('x1', (d) => xScale(d[1].group) - barsWidth / 2)
    .attr('y1', (d) => yScale(d[1].quartiles[1]))
    .attr('x2', (d) => xScale(d[1].group) + barsWidth / 2)
    .attr('y2', (d) => yScale(d[1].quartiles[1]))
    .attr('stroke', background)

  boxplots
    .selectAll('circle')
    .data((d) => d[1].outliers)
    .join('circle')
    .attr('r', dotsDiameter / 2)
    .attr('cx', (d) => xScale(d.group))
    .attr('cy', (d) => yScale(d.value))
    .attr('fill', background)
    .attr('stroke', (d) => colorScale(d.color))

  if (showValues) {
    const valuesLabels = svg
      .append('g')
      .attr('id', 'boxplots')
      .selectAll('g')
      .data(nestedData)
      .join('g')

    valuesLabels
      .append('text')
      .styles(styles.labelSecondary)
      .attr('x', (d) => xScale(d[1].group) + barsWidth / 2 + 4)
      .attr('y', (d) => yScale(d[1].range[1]))
      .attr('dominant-baseline', 'middle')
      .text((d) => d[1].range[1])

    valuesLabels
      .append('text')
      .styles(styles.labelSecondary)
      .attr('x', (d) => xScale(d[1].group) + barsWidth / 2 + 4)
      .attr('y', (d) => yScale(d[1].range[0]))
      .attr('dominant-baseline', 'middle')
      .text((d) => d[1].range[0])

    valuesLabels
      .append('text')
      .styles(styles.labelSecondary)
      .attr('x', (d) => xScale(d[1].group) + barsWidth / 2 + 4)
      .attr('y', (d) => yScale(d[1].quartiles[1]))
      .attr('dominant-baseline', 'middle')
      .text((d) => d[1].quartiles[1])

    valuesLabels
      .append('text')
      .styles(styles.labelSecondary)
      .attr('x', (d) => xScale(d[1].group) - barsWidth / 2 - 4)
      .attr('y', (d) => yScale(d[1].quartiles[0]))
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'end')
      .text((d) => d[1].quartiles[0])

    valuesLabels
      .append('text')
      .styles(styles.labelSecondary)
      .attr('x', (d) => xScale(d[1].group) - 4)
      .attr('y', (d) => yScale(d[1].quartiles[2]))
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'end')
      .text((d) => d[1].quartiles[2])
  }

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option

    const legendLayer = d3
      .select(svgNode)
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
