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
    sortGroupsBy,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    barPadding,
    colorScale,
    alignLabels,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  if (mapping.startDate.dataType.type != mapping.endDate.dataType.type) {
    throw new Error('startDate and endDate must have the same data type')
  }

  const groups = d3.rollups(
    data,
    (v) => {
      v.sort((a, b) => d3.ascending(a.startDate, b.startDate))

      let levels = [],
        level = 0
      v.forEach(function (item) {
        let l = 0
        while (overlap(item, levels[l], mapping.startDate.dataType.type)) l++
        if (!levels[l]) levels[l] = []
        levels[l].push({
          level: l + level,
          ...item,
        })
      })

      level++
      return levels.flat()
    },
    (d) => (d.group && d.group.length ? d.group : null)
  )

  groups.sort((a, b) => {
    if (!sortGroupsBy) return
    if (sortGroupsBy === 'group') {
      return d3.ascending(a[0], b[0])
    } else {
      return d3[sortGroupsBy](a[1][0].startDate, b[1][0].startDate)
    }
  })

  // x scale
  const xMin = d3.min(data, (d) => d.startDate)
  const xMax = d3.max(data, (d) => d.endDate)

  const x =
    mapping.startDate.dataType.type === 'date'
      ? d3.scaleTime()
      : d3.scaleLinear()

  x.domain([xMin, xMax]).rangeRound([0, chartWidth]).nice()

  const lines = d3.sum(groups, (g) => d3.max(g[1], (d) => d.level + 1))
  const heightScale = d3
    .scaleBand()
    .domain(d3.range(lines))
    .range([0, chartHeight])
    .paddingInner(barPadding)
    .paddingOuter(barPadding / 2)
    .align(1)

  const lineHeight = heightScale.bandwidth()
  const lineStep = heightScale.step()

  const xAxis = (g) => {
    return g
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
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

  let stack = d3
    .stack()
    .keys(groups.map((d) => d[0]))
    .value((d, key) => {
      const a = d.filter((f) => f[0] === key)[0]
      return d3.max(a[1].map((c) => c.level)) + 1
    })

  const vizLayer = svg.append('g').attr('id', 'viz')
  const groupsG = vizLayer
    .selectAll('g')
    .data(stack([groups]))
    .join('g')
    .attr('id', (d) => d.key)
    .attr('transform', (d) => `translate(0,${d[0][0] * lineStep})`)

  groupsG
    .append('text')
    .attr('x', (d) =>
      alignLabels ? x(d[0].data[d.index][1][0].startDate) - 4 : -4
    )
    .attr('y', lineStep / 2)
    .attr('text-anchor', 'end')
    .attr('dominant-baseline', 'middle')
    .text((d) => d.key)
    .styles(styles.labelSecondary)

  groupsG
    .selectAll('rect')
    .data((d, i) => d[0].data[d.index][1])
    .join('rect')
    .attr('x', (d) => x(d.startDate))
    .attr('y', (d) => lineStep * d.level + (lineStep - lineHeight) / 2)
    .attr('width', (d) => d3.max([1, x(d.endDate) - x(d.startDate)]))
    .attr('height', lineHeight)
    .attr('fill', (d) => colorScale(d.color))

  groupsG
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', chartWidth)
    .attr('y2', 0)
    .styles(styles.axisLine)

  if (showLegend) {
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

function overlap(item, g, type) {
  if (!g) return false
  for (const i in g) {
    if (type === 'date') {
      // get time and compare it
      if (
        (item.startDate.getTime() > g[i].startDate.getTime() &&
          item.startDate.getTime() < g[i].endDate.getTime()) ||
        (item.endDate.getTime() > g[i].startDate.getTime() &&
          item.endDate.getTime() < g[i].endDate.getTime()) ||
        (item.startDate.getTime() < g[i].startDate.getTime() &&
          item.endDate.getTime() > g[i].endDate.getTime())
      ) {
        return true
      }
    } else if (type === 'number') {
      // if it's a number, just compare values
      if (
        (item.startDate > g[i].startDate && item.startDate < g[i].endDate) ||
        (item.endDate > g[i].startDate && item.endDate < g[i].endDate) ||
        (item.startDate < g[i].startDate && item.endDate > g[i].endDate)
      ) {
        return true
      }
    } else {
      throw new Error('startDate and endDate must be numbers or dates')
    }
  }
  return false
}
