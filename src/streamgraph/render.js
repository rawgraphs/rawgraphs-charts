import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import * as d3Gridding from 'd3-gridding'
import '../d3-styles.js'

/*
Credits:
Inspired by https://observablehq.com/@d3/streamgraph
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
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    streamsOrder,
    streamsOffset,
    interpolation,
    showYAxis,
    // series options
    columnsNumber,
    useSameScale,
    sortSeriesBy,
    showSeriesLabels,
    repeatAxesLabels,
    showGrid,
    // color options
    colorScale,
    // legend
    showLegend,
    legendWidth,
    // labels
    showLabels,
    labelsType,
    showLabelsOutline,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  //check if there are negative values, in case throw error
  data.forEach((d) => {
    if (d.size < 0) {
      throw new Error('Values cannot be negative')
    }
  })

  const streamsDomain = [...new Set(data.map((d) => d.streams))]
  // create the stack function
  // define the function to retrieve the value
  // inspired by https://observablehq.com/@stevndegwa/stack-chart
  let stack = d3
    .stack()
    .keys(streamsDomain)
    .value((data, key) => (data[1].has(key) ? data[1].get(key).size : 0))
    .order(d3[streamsOrder])
    .offset(d3[streamsOffset])

  // create nest structure
  const nestedData = d3
    .rollups(
      data,
      (v) => {
        let localStack = Array.from(
          d3.rollup(
            v.sort((a, b) => d3.ascending(a.x, b.x)), // check that x axis is properly sorted
            ([e]) => e,
            (e) => e.x,
            (e) => e.streams
          )
        )

        return stack(localStack)
      },
      (d) => d.series
    )
    .map((d) => ({ data: d, totalSize: d3.sum(d[1], (d) => d.size) }))

  // series sorting functions
  const seriesSortings = {
    'Total value (descending)': function (a, b) {
      return d3.descending(a.totalValue, b.totalValue)
    },
    'Total value (ascending)': function (a, b) {
      return d3.ascending(a.totalValue, b.totalValue)
    },
    Name: function (a, b) {
      return d3.ascending(a[0], b[0])
    },
  }
  // sort series
  nestedData.sort(seriesSortings[sortSeriesBy])

  // add background
  d3.select(svgNode)
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')

  // set up grid
  const gridding = d3Gridding
    .gridding()
    .size([width, height])
    .mode('grid')
    .padding(0) // no padding, margins will be applied inside
    .cols(columnsNumber)

  const griddingData = gridding(nestedData)

  const svg = d3.select(svgNode).append('g').attr('id', 'viz')

  const series = svg
    .selectAll('g')
    .data(griddingData)
    .join('g')
    .attr('id', (d) => d[0])
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')

  // calculate global stacks value
  const stacksValues = nestedData.map((d) => d.data[1]).flat(2)

  const globalDomain = [
    d3.min(stacksValues, (d) => d[0]),
    d3.max(stacksValues, (d) => d[1]),
  ]

  // x scale
  const xDomain = d3.extent(data, (e) => e.x)

  const xScale =
    mapping.x.dataType.type === 'date' ? d3.scaleTime() : d3.scaleLinear()

  xScale
    .domain(xDomain)
    .range([0, griddingData[0].width - margin.right - margin.left])

  // add grid
  if (showGrid) {
    svg
      .append('g')
      .attr('id', 'grid')
      .selectAll('rect')
      .data(griddingData)
      .enter()
      .append('rect')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('width', (d) => d.width)
      .attr('height', (d) => d.height)
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
  }

  /*
      YOU CAN PUT HERE CODE THAT APPLIES TO ALL THE SERIES
    */

  series.each(function (d, serieIndex) {
    // make a local selection for each serie
    const selection = d3
      .select(this)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // compute each serie width and height
    const serieWidth = d.width - margin.right - margin.left
    const serieHeight = d.height - margin.top - margin.bottom

    const stackedData = d.data[1].filter((d) => d3.sum(d[0] + d[1]) > 0)

    console.log(stackedData)

    let localDomain = [
      d3.min(stackedData, (d) => d3.min(d, (d) => d[0])),
      d3.max(stackedData, (d) => d3.max(d, (d) => d[1])),
    ]

    const sizeScale = d3
      .scaleLinear()
      .domain(useSameScale ? globalDomain : localDomain)
      .nice()
      .range([serieHeight, 0])

    const areas = selection
      .append('g')
      .selectAll('path')
      .data(stackedData)
      .join('path')
      .attr('fill', ({ key }) => {
        return colorScale(key)
      })
      .attr(
        'd',
        d3
          .area()
          .curve(d3[interpolation])
          .x((d) => xScale(d.data[0]))
          .y0((d) => sizeScale(d[0]))
          .y1((d) => sizeScale(d[1]))
      )
      .append('title')
      .text(({ key }) => key)

    const xAxis = selection
      .append('g')
      .attr('id', 'xAxis')
      .attr('transform', 'translate(0,' + serieHeight + ')')
      .call(d3.axisBottom(xScale).tickSizeOuter(0))

    if (showYAxis) {
      const yAxis = selection
        .append('g')
        .attr('id', 'yAxis')
        //.attr('transform', 'translate(0,' + serieHeight + ')')
        .call(d3.axisLeft(sizeScale).tickSizeOuter(0))
    }

    if (showSeriesLabels) {
      d3.select(this)
        .append('text')
        .attr('x', 4)
        .attr('y', 4)
        .text((d) => d.data[0])
        .styles(styles.seriesLabel)
    }

    // add the axes titles
    selection
      .append('text')
      .styles(styles.axisLabel)
      .attr('y', serieHeight - 4)
      .attr('x', serieWidth)
      .attr('text-anchor', 'end')
      .attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none')
      .text(mapping.x.value)

    selection
      .append('text')
      .styles(styles.axisLabel)
      .attr('x', 4)
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'hanging')
      .attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none')
      .text(mapping['size'].value)

    if (showLabels) {
      // if is on path, add paths to defs and then add texts
      if (labelsType == 'On path') {
        let defs = d3.select(svgNode).append('defs')

        defs
          .selectAll('path')
          .data(stackedData.filter((d) => d3.sum(d, (e) => e[1] - e[0]) > 0))
          .join('path')
          .attr('id', (d, i) => 'path-' + serieIndex + '-' + i)
          .attr(
            'd',
            d3
              .line()
              .curve(d3[interpolation])
              .x((d) => xScale(d.data[0]))
              .y((d) => sizeScale((d[0] + d[1]) / 2))
          )

        selection
          .append('g')
          .attr('id', 'labels')
          .selectAll('text')
          .data(stackedData.filter((d) => d3.sum(d, (e) => e[1] - e[0]) > 0))
          .join('text')
          .attr('dy', '0.5ex')
          .attr('class', 'label')
          .append('textPath')
          .attr('xlink:xlink:href', (d, i) => '#path-' + serieIndex + '-' + i)
          .attr('startOffset', (d) => {
            // find max value
            const maxIndex = d3.maxIndex(d, (e) => e[1] - e[0])
            // get x position
            d.offset = Math.round((maxIndex / d.length) * 100)
            //clamp offset between 5% and 95%, return it
            return Math.min(95, Math.max(5, d.offset)) + '%'
          })
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', (d) =>
            d.offset > 90 ? 'end' : d.offset < 10 ? 'start' : 'middle'
          )
          .text((d) => d.key)
          .styles(styles.labelPrimary)

        if (showLabelsOutline) {
          labels.styles(styles.labelOutline)
        }
      }
      // if it is on point, find the maximum point
      if (labelsType == 'On point') {
        let labels = selection
          .append('g')
          .attr('id', 'labels')
          .selectAll('text')
          .data(stackedData.filter((d) => d3.sum(d, (e) => e[1] - e[0]) > 0))
          .join('text')
          .attr('x', (d) => {
            // find max value index
            const maxIndex = d3.maxIndex(d, (e) => e[1] - e[0])
            d.maxElement = d[maxIndex]
            // get x position
            return xScale(d.maxElement.data[0])
          })
          .attr('y', (d) => sizeScale((d.maxElement[0] + d.maxElement[1]) / 2))
          .attr('text-anchor', (d) =>
            xScale(d.maxElement.data[0]) > serieWidth - 10
              ? 'end'
              : xScale(d.maxElement.data[0]) < 10
              ? 'start'
              : 'middle'
          )
          .attr('alignment-baseline', 'middle')
          .text((d) => d.key)
          .styles(styles.labelPrimary)

        if (showLabelsOutline) {
          labels.styles(styles.labelOutline)
        }
      }
    }
  })

  // add legend
  if (showLegend) {
    const legendLayer = d3
      .select(svgNode)
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width},${marginTop})`)

    const chartLegend = legend().legendWidth(legendWidth)

    chartLegend.addColor('Colors', colorScale)

    legendLayer.call(chartLegend)
  }
}
