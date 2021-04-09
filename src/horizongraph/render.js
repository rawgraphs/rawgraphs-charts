import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

export function render(
  node,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
  // destructurate visual visualOptions
  const {
    // default options
    width,
    height,
    background,
    showLegend = false,
    //margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    padding,
    interpolation,
    bands,
    negativeStyle,
    // color
    colorScale,
  } = visualOptions

  // Margin convention
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  // select the SVG element
  const svg = d3.select(node)

  // nest data
  let nestedData = d3.groups(data, (d) => d.group)

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  const groupsDomain = nestedData.map((d) => d[0])

  const groupsScale = d3
    .scaleBand()
    .range([0, chartHeight])
    .domain(groupsDomain)
    .paddingOuter(0)
    .paddingInner(padding / (chartWidth / groupsDomain.length))

  // x scale
  const xDomain = d3.extent(data, (e) => e.x)
  const xScale =
    mapping.x.dataType.type === 'date' ? d3.scaleTime() : d3.scaleLinear()

  xScale.domain(xDomain).range([0, chartWidth])

  // y scale

  const yDomain = [
    0,
    d3.max([-d3.min(data, (e) => e.y), d3.max(data, (e) => e.y)]) / bands,
  ]
  const yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .range([groupsScale.bandwidth(), 0])

  // area function
  let area = d3
    .area()
    .curve(d3[interpolation])
    .x((d) => xScale(d.x))
    .y0(groupsScale.bandwidth())
    .y1((d) => yScale(d.y))

  // create the clip path
  svg
    .append('clipPath')
    .attr('id', 'groupClipPath')
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', chartWidth)
    .attr('height', groupsScale.bandwidth())

  // add background
  svg
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')

  // append areas
  let viz = svg
    .append('g')
    .attr(
      'transform',
      (d) => 'translate(' + margin.left + ',' + margin.top + ')'
    )

  let horizons = viz
    .attr('id', 'areas')
    .selectAll('g')
    .data(nestedData)
    .join('g')
    .attr('transform', (d) => 'translate(0,' + groupsScale(d[0]) + ')')
    .attr('id', (d) => d[0])
    .attr('clip-path', 'url(#groupClipPath)')

  //draw the positive areas
  horizons
    .append('g')
    .attr('id', 'positive')
    .selectAll('path')
    // create an array corresponding to the amount of required bands
    .data((d) =>
      [...Array(bands).keys()].map((e, i) => ({
        index: i,
        data: d,
      }))
    )
    .join('path')
    .attr('d', (d) => area(d.data[1]))
    .attr('fill', colorScale('positive'))
    .attr('opacity', 1 / bands)
    .attr(
      'transform',
      (d) => `translate(0, ${groupsScale.bandwidth() * d.index})`
    )

  // draw the negative areas
  horizons
    .append('g')
    .attr('id', 'negative')
    .selectAll('path')
    .data((d) =>
      [...Array(bands).keys()].map((e, i) => ({
        index: i,
        data: d,
      }))
    )
    .join('path')
    .attr('d', (d) => area(d.data[1]))
    .attr('fill', colorScale('negative'))
    .attr('opacity', 1 / bands)
    // if negative style is "top", just translate it.
    // otherwise, flip it and move to bottm.
    .attr('transform', (d) => {
      if (negativeStyle == 'top') {
        return `translate(0, ${
          -groupsScale.bandwidth() - groupsScale.bandwidth() * d.index
        })`
      } else if (negativeStyle == 'mirrored') {
        return `scale(1,-1) translate(0, ${
          -2 * groupsScale.bandwidth() - groupsScale.bandwidth() * d.index
        })`
      }
    })

  const yAxis = (g) => {
    return g.call(d3.axisLeft(groupsScale).tickSizeOuter(0))
  }
  const xAxis = (g) => {
    return g
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
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

  const axisLayer = viz.append('g').attr('id', 'axis')

  axisLayer.append('g').call(yAxis)
  axisLayer.append('g').call(xAxis)
}
