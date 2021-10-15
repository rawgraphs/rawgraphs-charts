import * as d3 from 'd3'
import { legend, labelsOcclusion } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

/*
Credits:
Inspired by https://observablehq.com/@d3/circle-packing
*/

export function render(
  svgNode,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
  const {
    // artboard
    width,
    height,
    background,
    // margin
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // legend
    showLegend,
    legendWidth,
    // chart options
    padding,
    sortCirclesBy,
    // color
    colorScale,
    // labels
    showLabelsOutline,
    showHierarchyLabels,
    hierarchyLabelsStyle,
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

  // create the hierarchical structure
  const nest = d3.rollup(
    data,
    (v) => v[0],
    ...mapping.hierarchy.value.map((level) => (d) => d.hierarchy.get(level))
  )

  const hierarchy = d3
    .hierarchy(nest)
    .sum((d) => (d[1] instanceof Map ? 0 : d[1].size)) // since maps have a .size porperty in native javascript, sum only values for leaves, and not for Maps
    .sort((a, b) => {
      if (sortCirclesBy !== 'original') {
        return d3[sortCirclesBy](a.value, b.value)
      }
    })

  const pack = (data) =>
    d3
      .pack()
      .size([chartWidth, chartHeight])
      .padding(showHierarchyLabels ? padding + 4 : padding)(hierarchy)

  const root = pack(nest)

  const circle = d3
    .arc()
    .innerRadius(0)
    .outerRadius((d) => d)
    .startAngle(-Math.PI)
    .endAngle(Math.PI)

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

  const node = svg
    .append('g')
    .attr('id', 'nodes')
    .selectAll('g')
    .data(root.descendants())
    .join('g')
    .attr('transform', (d) => `translate(${d.x + 1},${d.y + 1})`)
    .attr('id', (d) => d.data[0])

  node
    .append('path')
    .attr('id', (d) => 'p_' + (d.x + d.y + d.r + d.depth + d.height))
    .attr('d', (d) => circle(d.r))
    .attr('fill', (d) => (d.children ? 'none' : colorScale(d.data[1].color)))
    .attr('stroke', (d) => (d.children ? '#ccc' : 'none'))

  const leaves = node.filter((d) => !d.children)

  if (showHierarchyLabels) {
    const parents = node.filter((d) => d.children)
    if (hierarchyLabelsStyle === 'onPath') {
      parents
        .append('text')
        .attr('fill', 'black')
        .attr('text-anchor', 'middle')
        .attr('font-family', "'Arial', sans-serif")
        .attr('font-size', 8)
        .attr('dominant-baseline', 'middle')
        .append('textPath')
        .attr('href', (d) => '#p_' + (d.x + d.y + d.r + d.depth + d.height))
        .attr('startOffset', '50%')
        .text((d) => d.data[0])
    }
    if (hierarchyLabelsStyle === 'onPoint') {
      parents
        .append('text')
        .attr('fill', 'black')
        .attr('text-anchor', 'middle')
        .attr('font-family', "'Arial', sans-serif")
        .attr('font-size', 8)
        .attr('dominant-baseline', 'middle')
        .attr('x', (d) => 0)
        .attr('y', (d) => -d.r)
        .text((d) => d.data[0])
    }
  }

  const labelsLayer = svg.append('g').attr('id', 'labels')

  labelsLayer
    .selectAll('g')
    .data(mapping.label.value ? root.leaves() : [])
    .join('g')
    .attr('transform', (d) => `translate(${d.x + 1},${d.y + 1})`)
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'text-before-edge')
    .selectAll('tspan')
    .data((d, i, a) => {
      return Array.isArray(d.data[1].label)
        ? d.data[1].label
        : [d.data[1].label]
    })
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

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr

    labelsLayer.selectAll('text').styles(styles.labelOutline)
  }

  if (autoHideLabels) {
    //labelsOcclusion(texts, (d) => d.r)
    labelsOcclusion(labelsLayer.selectAll('text'), (d) => d.r)
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
      chartLegend.addColor(
        mapping.color.value + ` [${mapping.color.config.aggregation}]`,
        colorScale
      )
    }
    // calculate the scale
    let sizeScale = d3
      .scaleSqrt()
      .domain(d3.extent(hierarchy.leaves(), (d) => d.value))
      .rangeRound(d3.extent(hierarchy.leaves(), (d) => d.r))

    // if the maximum radius is bigger than a quarter of the legend width,
    // we must rescale it to fit in it. In this way, the maximum diameter in the legend
    // will be the half of legend width
    if (sizeScale.range()[1] > legendWidth / 4) {
      sizeScale
        .domain([
          sizeScale.invert(legendWidth / 8),
          sizeScale.invert(legendWidth / 4),
        ])
        .rangeRound([legendWidth / 8, legendWidth / 4])
    }

    chartLegend.addSize(
      mapping.size.value
        ? mapping.size.value + ` [${mapping.size.config.aggregation}]`
        : 'Number of records',
      sizeScale,
      'circle'
    )

    legendLayer.call(chartLegend)
  }
}
