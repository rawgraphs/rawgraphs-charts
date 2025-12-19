import * as d3 from 'd3'
import { legend, dateFormats, labelsOcclusion } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'
import { createXAxis } from '../charts-utils'

const normalizeDateTypes = (mapping) => {
  const type = mapping.startDate.dataType.type
  if (type !== mapping.endDate.dataType.type) {
    throw new Error('startDate and endDate must have the same data type')
  }
  return type
}

const intervalsOverlap = (item, levelItems = [], type) => {
  // Return true if the interval overlaps with any item in the given level.
  return levelItems.some((existing) => {
    if (type === 'date') {
      const s = item.startDate.getTime()
      const e = item.endDate.getTime()
      const es = existing.startDate.getTime()
      const ee = existing.endDate.getTime()
      return (s > es && s < ee) || (e > es && e < ee) || (s < es && e > ee)
    }
    if (type === 'number') {
      const s = item.startDate
      const e = item.endDate
      const es = existing.startDate
      const ee = existing.endDate
      return (s > es && s < ee) || (e > es && e < ee) || (s < es && e > ee)
    }
    throw new Error('startDate and endDate must be numbers or dates')
  })
}

const sortGroups = (groups, sortGroupsBy) => {
  if (!sortGroupsBy) return
  if (sortGroupsBy === 'group') {
    groups.sort((a, b) => d3.ascending(a[0], b[0]))
    return
  }
  groups.sort((a, b) => d3[sortGroupsBy](a[1][0].startDate, b[1][0].startDate))
}

const layoutGroups = (data, mapping, sortGroupsBy) => {
  const type = normalizeDateTypes(mapping)

  const groups = d3.rollups(
    data,
    (values) => {
      values.sort((a, b) => d3.ascending(a.startDate, b.startDate))
      const levels = []
      values.forEach((item) => {
        let levelIndex = 0
        while (intervalsOverlap(item, levels[levelIndex], type)) levelIndex++
        if (!levels[levelIndex]) levels[levelIndex] = []
        levels[levelIndex].push({ level: levelIndex, ...item })
      })
      return levels.flat()
    },
    (d) => (d.group && d.group.length ? d.group : null)
  )

  sortGroups(groups, sortGroupsBy)

  // compute cumulative offsets for vertical positioning
  let offset = 0
  groups.forEach((group) => {
    group.offset = offset
    offset += d3.max(group[1], (d) => d.level + 1)
  })

  return groups
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
    xTicksAuto,
    xTicksAmount,
    xTicksOuter,
    xAxisPosition,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  const groups = layoutGroups(data, mapping, sortGroupsBy)

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

  const xAxis = createXAxis({
    xScale: x,
    yScale: d3.scaleLinear().domain([0, 1]).range([0, chartHeight]),
    serieHeight: chartHeight,
    serieWidth: chartWidth,
    yDomain: [0, 1],
    xTicksAuto,
    xTicksAmount,
    xTicksOuter,
    label: mapping.startDate.value,
    showLabel: true,
    axisLabelStyles: styles.axisLabel,
    tickSizeOuter: 0,
    position: xAxisPosition,
  })

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

  const vizLayer = svg.append('g').attr('id', 'viz')
  const groupsG = vizLayer
    .selectAll('g')
    .data(groups)
    .join('g')
    .attr('id', (d) => d[0])
    .attr('transform', (d) => `translate(0,${d.offset * lineStep})`)

  groupsG
    .append('text')
    .attr('x', (d) => (alignLabels ? x(d[1][0].startDate) - 4 : -4))
    .attr('y', lineStep / 2)
    .attr('text-anchor', 'end')
    .attr('dominant-baseline', 'middle')
    .text((d) => d[0])
    .styles(styles.labelSecondary)

  groupsG
    .selectAll('rect')
    .data((d) => d[1])
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
