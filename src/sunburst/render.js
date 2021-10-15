import * as d3 from 'd3'
import { legend, labelsOcclusion } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

/*
Credits:
Inspired by https://observablehq.com/@d3/sunburst
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
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // legend
    showLegend,
    legendWidth,
    // chart
    padding,
    // labels
    label1Style,
    label2Style,
    label3Style,
    // colors
    colorScale,
    // labels
    showHierarchyLabels,
    labelHierarchyStyle,
    labelStyles,
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

  const radius = chartWidth > chartHeight ? chartHeight / 2 : chartWidth / 2

  // create the hierarchical structure
  const nest = d3.rollup(
    data,
    (v) => v[0],
    ...mapping.hierarchy.value.map((level) => (d) => d.hierarchy.get(level))
  )

  const hierarchy = d3
    .hierarchy(nest)
    .sum((d) => (d[1] instanceof Map ? 0 : d[1].size)) // since maps have also a .size porperty, sum only values for leaves, and not for Maps
  //@TODO: find a way to filter hierarchy

  const partition = (nest) =>
    d3
      .partition() // copied from example of d3v6, not clear the meaning
      .size([2 * Math.PI, radius])(hierarchy)

  const root = partition(nest)

  const arc = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle(padding / (radius / 2)) // convert padding in radians
    .padRadius(radius / 2)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1 - padding)

  const svg = d3.select(svgNode)

  // add background
  d3.select(svgNode)
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')

  svg
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`)
    .attr('id', 'viz')
    .selectAll('path')
    .data(root.descendants().filter((d) => d.depth))
    .join('path')
    .attr('fill', function (d) {
      if ('children' in d) {
        // if not leaf, check if leaves has the same value
        const childrenColors = [
          ...new Set(d.leaves().map((l) => l.data[1].color)),
        ]
        return childrenColors.length == 1
          ? colorScale(childrenColors[0])
          : '#cccccc'
      } else {
        // otherwise, if it's a leaf use its own color
        return colorScale(d.data[1].color)
      }
    })
    .attr('display', (d) => (d.data[0] != '' ? '' : 'none'))
    .attr('d', arc)
    .append('title')
    .text((d) => d.data[0])

  const textGroups = svg
    .append('g')
    .attr('id', 'labels')
    .attr('transform', `translate(${width / 2},${height / 2})`)
    .attr('text-anchor', 'middle')
    .selectAll('text')
    .data(root.descendants())
    .join('text')
    .filter((d) => (showHierarchyLabels ? true : !d.children)) // if showHierarchyLabels is false, hide non-leaf nodes
    .filter((d) => d.data[0] != '')
    .attr('transform', function (d) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI
      const y = (d.y0 + d.y1) / 2
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
    })

  textGroups
    .selectAll('tspan')
    // if node not a leaf, show just its name.
    .data((d) => {
      console.log(d)
      if (d.children) {
        return [
          {
            string: d.data[0],
            hierarchy: true,
          },
        ]
      } else {
        // if labels are mapped, return them
        if (mapping.label.value.length > 0) {
          return d.data[1].label.map((d) => ({ string: d, hierarchy: false }))
        } else {
          //otherwise, return just leaf name
          return [{ string: d.data[0], hierarchy: true }]
        }
      }
    })
    .join('tspan')
    .attr('x', 0)
    .attr('y', (d, i, n) => (i + 1) * 12 - (n.length / 2) * 12 - 2) // @TODO: 12 is the font size. we should expose this
    .text((d) => d.string)
    .styles((d, i) =>
      d.hierarchy ? styles[labelHierarchyStyle] : styles[labelStyles[i]]
    )

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    textGroups.selectAll('text').styles(styles.labelOutline)
  }

  if (autoHideLabels) {
    labelsOcclusion(textGroups, (d) => d.size)
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
