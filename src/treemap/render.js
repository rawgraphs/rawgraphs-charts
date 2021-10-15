import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

/*
Credits:
Inspired by https://observablehq.com/@d3/treemap
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
    // margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // legend
    showLegend,
    legendWidth,
    // colors
    colorScale,
    // chart options
    tiling,
    padding,
    // labels
    showLabelsOutline,
    showHierarchyLabels,
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

  //@TODO: understand how to handle empty values

  const treemap = d3
    .treemap()
    .tile(d3[tiling])
    .size([chartWidth, chartHeight])
    .padding(padding)
    .round(true)

  if (showHierarchyLabels) {
    treemap.paddingTop(12)
  }

  const root = treemap(hierarchy)

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

  // if selected, draw a rectangle for each level in the hierarchy

  if (showHierarchyLabels) {
    const ancestorData = root.descendants().filter((d) => d.children)
    const depthScale = d3.scaleLinear().domain([0, root.leaves()[0].depth + 1])
    const ancestors = svg
      .append('g')
      .attr('id', 'ancestors')
      .selectAll('rect')
      .data(ancestorData)
      .join('g')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`)

    ancestors
      .append('rect')
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('id', (d, i) => 'path_ancestor' + i)
      .attr('fill', '#ccc')
      .attr('fill-opacity', (d) => depthScale(d.depth))
      .attr('stroke', '#ccc')
      .attr('stroke-opacity', (d) => depthScale(d.depth) + 0.1)

    if (showHierarchyLabels) {
      ancestors
        .append('clipPath')
        .attr('id', (d, i) => 'clip_ancestor' + i)
        .append('use')
        .attr('xlink:href', (d, i) => '#path_ancestor' + i)

      ancestors
        .append('text')
        .attr('x', padding)
        .attr('y', 2)
        .attr('clip-path', (d, i) => 'url(#clip_ancestor' + i + ')')
        .attr('font-family', 'Arial, sans-serif')
        .attr('font-size', 8)
        .attr('dominant-baseline', 'text-before-edge')
        .attr('class', 'txt')
        .text((d) => {
          return d.depth === 0 && !d.data[0] ? 'Root' : d.data[0]
        })
    }
  }

  const leaves = svg
    .append('g')
    .attr('id', 'leaves')
    .selectAll('g')
    .data(root.leaves())
    .join('g')
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`)

  leaves
    .append('rect')
    .attr('id', (d, i) => 'path' + i)
    .attr('fill', (d) => colorScale(d.data[1].color))
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)

  leaves
    .append('clipPath')
    .attr('id', (d, i) => 'clip' + i)
    .append('use')
    .attr('xlink:href', (d, i) => '#path' + i)

  const texts = leaves
    .append('text')
    .attr('clip-path', (d, i) => 'url(#clip' + i + ')')
    .attr('font-family', 'Arial, sans-serif')
    .attr('font-size', 10)
    .attr('dominant-baseline', 'text-before-edge')
    .attr('class', 'txt')

  texts
    .selectAll('tspan')
    .data((d, i, a) => {
      return Array.isArray(d.data[1].label)
        ? d.data[1].label
        : [d.data[1].label]
    })
    .join('tspan')
    .attr('x', 3)
    .attr('y', (d, i) => i * 1.1 + 0.2 + 'em')
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

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    d3.selectAll('.txt').styles(styles.labelOutline)
  }

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
