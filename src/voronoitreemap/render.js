import * as d3 from 'd3'
import * as d3VoronoiTreemap from 'd3-voronoi-treemap'
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
    seed,
    padding,
    clipToPolygon,
    rotation,
    edges,
    isRegular,
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

  // sets the pseudorandom number generator which is used when randomness is required
  // this will produce repeatible repeatable results
  const random = d3.randomNormal.source(d3.randomLcg(seed))(0, 1)

  let voronoiTreemap = d3VoronoiTreemap.voronoiTreemap().prng(random)

  if (clipToPolygon) {
    // create the points
    let points = d3.range(edges).map((i) => {
      const rad = (rotation * Math.PI) / 180 + (i / edges) * 2 * Math.PI
      return [Math.cos(rad), Math.sin(rad)]
    })
    //calculatet scales
    let hscale = d3
      .scaleLinear()
      .domain(d3.extent(points, (d) => d[0]))
      .range([-chartWidth / 2, chartWidth / 2])

    let vscale = d3
      .scaleLinear()
      .domain(d3.extent(points, (d) => d[1]))
      .range([-chartHeight / 2, chartHeight / 2])

    // create the shape
    let clipShape = points.map((d) => {
      return isRegular
        ? chartHeight > chartWidth
          ? // if user asks for a regular polygon,
            // use the scale of tthe shortest dimension
            [hscale(d[0]), hscale(d[1])]
          : [vscale(d[0]), vscale(d[1])]
        : // else use the two separate scales
          [hscale(d[0]), vscale(d[1])]
    })
    // use clipping
    voronoiTreemap.clip(clipShape)
  } else {
    voronoiTreemap.size([chartWidth, chartHeight])
  }

  // compute the tesselation
  voronoiTreemap(hierarchy)

  // get nodes
  let allNodes = hierarchy
    .descendants()
    .sort((a, b) => d3.ascending(a.height, b.height))

  // @TODO understand how to place labels for hierarchical cells
  // below the old code for normal treemaps
  // if (showHierarchyLabels) {
  //   treemap.paddingTop(12)
  // }

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
    .attr('id', 'viz')
    // translate to the center
    .attr(
      'transform',
      clipToPolygon
        ? 'translate(' +
            (margin.left + chartWidth / 2) +
            ',' +
            (margin.top + chartHeight / 2) +
            ')'
        : 'translate(' + margin.left + ',' + margin.top + ')'
    )

  // draw cells
  svg
    .append('g')
    .attr('id', 'cells')
    .selectAll('path')
    .data(allNodes)
    .enter()
    .append('path')
    // d.polygon is the computed Voronoï cell encoding the relative weight of underlying original data
    .attr('d', (d) => d3.line()(d.polygon) + 'z')
    .attr('fill', (d) => (d.height > 0 ? 'none' : colorScale(d.data[1].color)))
    .attr('stroke', background)
    .attr('stroke-width', (d) => (d.height + 1) * padding)
    .attr('id', (d) => d.data[0])

  // draw labels
  let labels = svg
    .append('g')
    .attr('id', 'labels')
    .selectAll('text')
    .data(allNodes.filter((d) => d.height === 0))
    .enter()
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'text-before-edge')

  labels
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

  // align labels to the center of polygon
  labels.call((sel) => {
    return sel.attr('transform', (d) => {
      const height = sel.node().getBBox().height
      return (
        'translate(' +
        d.polygon.site.x +
        ',' +
        (d.polygon.site.y - height / 2) +
        ')'
      )
    })
  })

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
