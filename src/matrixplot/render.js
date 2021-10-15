import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import '../d3-styles'

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
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    padding,
    rounding,
    sortXAxisBy,
    sortYAxisBy,
    showGrid,
    colorScale,
    labelStyles,
    showLabelsOutline,
    // legend
    showLegend,
    legendWidth,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  let chartWidth = width - margin.left - margin.right
  let chartHeight = height - margin.top - margin.bottom

  // sort data
  let rowsValues = d3
    .rollups(
      data,
      (v) => d3.sum(v, (d) => d.size),
      (d) => d.y
    )
    .map((d) => ({ key: d[0], value: d[1] }))

  const colsValues = d3
    .rollups(
      data,
      (v) => d3.sum(v, (d) => d.size),
      (d) => d.x
    )
    .map((d) => ({ key: d[0], value: d[1] }))

  switch (sortXAxisBy) {
    case 'Total value (descending)':
      colsValues.sort((a, b) => d3.descending(a.value, b.value))
      break
    case 'Total value (ascending)':
      colsValues.sort((a, b) => d3.ascending(a.value, b.value))
      break
    case 'Name':
      colsValues.sort((a, b) => d3.ascending(a.key, b.key))
  }

  switch (sortYAxisBy) {
    case 'Total value (descending)':
      rowsValues.sort((a, b) => d3.descending(a.value, b.value))
      break
    case 'Total value (ascending)':
      rowsValues.sort((a, b) => d3.ascending(a.value, b.value))
      break
    case 'Name':
      rowsValues.sort((a, b) => d3.ascending(a.key, b.key))
  }

  // first thing, understand if there are more rows or lines
  const rows = [...new Set(rowsValues.map((d) => d.key))]
  const cols = [...new Set(colsValues.map((d) => d.key))]

  let cellSize

  if (rows.length > cols.length) {
    cellSize = (chartHeight - rows.length * padding) / rows.length
    chartWidth = (cellSize + padding) * cols.length
  } else {
    cellSize = (chartWidth - cols.length * padding) / cols.length
    chartHeight = (cellSize + padding) * rows.length
  }

  const x = d3
    .scaleBand()
    .range([0, chartWidth])
    .domain(cols)
    .padding(padding / cellSize) // d3 expects padding expressed in % (0-1)

  const y = d3
    .scaleBand()
    .range([0, chartHeight])
    .domain(rows)
    .padding(padding / cellSize) // d3 expects padding expressed in % (0-1)

  const sizeScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, (d) => d.size)])
    .range([0, cellSize])

  const roundingScale = d3.scaleLinear().domain([0, 100]).rangeRound([0, 50])

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

  if (showGrid) {
    // add the X gridlines
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', 'translate(' + (cellSize / 2 + 1) + ',0)') // not clear why there is an offset of 2px
      .call(
        d3
          .axisTop(x)
          .tickSize(Math.round(-chartHeight + 1))
          .tickSizeOuter(0)
      )

    // add the Y gridlines
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', 'translate(0,' + (cellSize / 2 + 1) + ')') // not clear why there is an offset of 2px
      .call(
        d3
          .axisLeft(y)
          .tickSize(Math.round(-chartWidth + 1))
          .tickSizeOuter(0)
      )
  }
  // add top x axis
  svg
    .append('g')
    .call(d3.axisTop(x).tickSizeOuter(0))
    .selectAll('text')
    .attr('dx', Math.sqrt(12)) // proportional to text size. @TODO we should use a variable.
    .attr('dy', Math.sqrt(12)) // proportional to text size. @TODO we should use a variable
    .attr('text-anchor', 'start')
    .attr('transform', 'rotate(-45)')

  // add left y axis
  svg.append('g').call(d3.axisLeft(y).tickSizeOuter(0)).selectAll('text')

  // add y axis title
  svg
    .append('text')
    .attr('dx', -9) // proportional to tick lines
    .attr('dy', -9) // proportional to tick lines
    .style('text-anchor', 'end')
    .text(mapping.y.value)
    .styles(styles.axisLabel)

  // add x axis title
  svg
    .append('text')
    .attr('x', (chartWidth + 9) / Math.sqrt(2)) // proportional to tick lines
    .attr('y', (chartWidth + 9) / Math.sqrt(2)) // proportional to tick lines
    .attr('dx', Math.sqrt(12)) // proportional to text size. @TODO we should use a variable.
    .attr('dy', -Math.sqrt(12)) // proportional to text size. @TODO we should use a variable.
    .attr('transform', 'rotate(-45)')
    .style('text-anchor', 'start')
    .text(mapping.x.value)
    .styles(styles.axisLabel)

  // draw squares or circles for each value
  svg
    .selectAll()
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.x) + (cellSize - sizeScale(d.size)) / 2)
    .attr('y', (d) => y(d.y) + (cellSize - sizeScale(d.size)) / 2)
    .attr('rx', (d) => (roundingScale(rounding) * sizeScale(d.size)) / 100)
    .attr('ry', (d) => (roundingScale(rounding) * sizeScale(d.size)) / 100)
    .attr('width', (d) => sizeScale(d.size))
    .attr('height', (d) => sizeScale(d.size))
    .style('fill', (d) => colorScale(d.color))

  const labelsLayer = svg.append('g').attr('id', 'labels')

  labelsLayer
    .selectAll('g')
    .data(mapping.label.value ? data : [])
    .join('g')
    .attr(
      'transform',
      (d) => `translate(${x(d.x) + cellSize / 2},${y(d.y) + cellSize / 2})`
    )
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
    .attr(
      'dy',
      (d, i) => i * (+styles[labelStyles[i]].fontSize.replace('px', '') + 2)
    )
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

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    labelsLayer.selectAll('text').styles(styles.labelOutline)
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

    if (mapping.size.value) {
      const legendSizeScale = sizeScale.copy()
      const maxSize =
        sizeScale(d3.max(data, (d) => d.size)) > legendWidth * 0.66
          ? legendWidth * 0.66
          : sizeScale(d3.max(data, (d) => d.size))
      const shape = rounding >= 100 ? 'circle' : 'square'
      legendSizeScale
        .domain(d3.extent(data, (d) => d.size))
        .rangeRound([sizeScale(d3.min(data, (d) => d.size)), maxSize])

      if (shape === 'circle') {
        legendSizeScale.rangeRound(legendSizeScale.range().map((d) => d / 2))
      }

      chartLegend.addSize(mapping.size.value, legendSizeScale, shape)
    }

    legendLayer.call(chartLegend)
  }
}
