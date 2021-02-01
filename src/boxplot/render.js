import * as d3 from 'd3'
import { rawgraphsLegend } from '@raw-temp/rawgraphs-core'

export function render(svgNode, data, visualOptions, mapping, originalData) {
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
    padding,
    iqrMultiplier, // to compute otuliers
    dotsRadius,
    //legend
    showLegend,
    legendWidth,
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

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // add background
  d3.select(svgNode)
    .append('rect')
    .attr('width', width)
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

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.value)) // Note that here the Y scale is set manually
    .range([chartHeight, 0])

  const groupsDomain = [...new Set(data.map((d) => d.group))]

  const xScale = d3
    .scaleBand()
    .range([0, chartWidth])
    .domain(groupsDomain)
    .padding(padding / (chartWidth / groupsDomain.length))

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
  console.log(nestedData)

  // append scales
  svg.append('g').attr('id', 'y axis').call(d3.axisLeft(yScale))

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
    .attr('x1', (d) => xScale(d[1].group) + xScale.bandwidth() / 2)
    .attr('x2', (d) => xScale(d[1].group) + xScale.bandwidth() / 2)
    .attr('y1', (d) => yScale(d[1].range[1]))
    .attr('y2', (d) => yScale(d[1].range[0]))
    .attr('stroke', (d) => colorScale(d[1].color))

  // add the boxes
  boxplots
    .append('rect')
    .attr('x', (d) => xScale(d[1].group))
    .attr('y', (d) => yScale(d[1].quartiles[2]))
    .attr('width', xScale.bandwidth())
    .attr(
      'height',
      (d) => yScale(d[1].quartiles[0]) - yScale(d[1].quartiles[2])
    )
    .attr('fill', 'silver')

  //add the half line
  boxplots
    .append('line')
    .attr('x1', (d) => xScale(d[1].group))
    .attr('y1', (d) => yScale(d[1].quartiles[1]))
    .attr('x2', (d) => xScale(d[1].group) + xScale.bandwidth())
    .attr('y2', (d) => yScale(d[1].quartiles[1]))
    .attr('stroke', background)

  boxplots
    .selectAll('circle')
    .data((d) => d[1].outliers)
    .join('circle')
    .attr('r', dotsRadius)
    .attr('cx', (d) => xScale(d.group) + xScale.bandwidth() / 2)
    .attr('cy', (d) => yScale(d.value))
    .attr('fill', background)
    .attr('stroke', 'silver')

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option

    const legendLayer = d3
      .select(svgNode)
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width},${marginTop})`)

    const legend = rawgraphsLegend().legendWidth(legendWidth)

    if (mapping.color.value) {
      legend.addColor(mapping.color.value, colorScale)
    }

    legendLayer.call(legend)
  }
}
