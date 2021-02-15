import * as d3 from 'd3'
import { legend } from '@raw-temp/rawgraphs-core'
import * as d3Gridding from 'd3-gridding'
import '../d3-styles.js'

export function render(
  svgNode,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
  console.log('- render')

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
    streamsPadding,
    streamsOffset,
    // series options
    columnsNumber,
    useSameScale,
    sortSeriesBy,
    showSeriesLabels,
    repeatAxesLabels,
    showGrid = true,
    // color options
    colorScale,
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

  //check if there are negative values, in case throw error
  data.forEach((d) => {
    if (d.size < 0) {
      throw new Error('Values cannot be negative')
    }
  })

  // create nest structure
  const nestedData = d3
    .rollups(
      data,
      (v) => v,
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
    .attr('width', width)
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

  // domains
  // sum all values for each serie / stack
  const scaleRollup = d3
    .rollups(
      data,
      (v) => d3.sum(v, (d) => d.size),
      (d) => d.x + '_' + d.series
    )
    .map((d) => d[1])

  // @TODO: move here the stacking and then compute scale across all the stacks

  let sizeDomain = [0, d3.max(scaleRollup)]

  const streamsDomain = [...new Set(data.map((d) => d.streams))]

  // x scale
  const xDomain = d3.extent(data, (e) => e.x)
  let xScale

  switch (mapping.x.dataType.type) {
    case 'number':
      xScale = d3
        .scaleLinear()
        .domain(xDomain)
        .range([0, griddingData[0].width - margin.right - margin.left])
      break
    case 'date':
      xScale = d3
        .scaleTime()
        .domain(xDomain)
        .range([0, griddingData[0].width - margin.right - margin.left])
      break
  }

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
    //prepare data for stack
    let localStack = Array.from(
      d3.rollup(
        d.data[1].sort((a, b) => d3.ascending(a.x, b.x)), // check that x axis is properly sorted
        ([e]) => e,
        (e) => e.x,
        (e) => e.streams
      )
    )

    // create an object with ordering methods
    const orderings = {
      Earliest: 'stackOrderAppearance',
      Ascending: 'stackOrderAscending',
      Descending: 'stackOrderDescending',
      'Inside out': 'stackOrderInsideOut',
      None: 'stackOrderNone',
      Reverse: 'stackOrderReverse',
    }

    const offsets = {
      Expand: 'stackOffsetExpand',
      Diverging: 'stackOffsetDiverging',
      Silhouette: 'stackOffsetSilhouette',
      Wiggle: 'stackOffsetWiggle',
      None: 'stackOffsetNone',
    }

    // create the stack
    // define the function to retrieve the value
    // inspired by https://observablehq.com/@stevndegwa/stack-chart
    let stack = d3
      .stack()
      .keys(streamsDomain)
      .value((data, key) => (data[1].has(key) ? data[1].get(key).size : 0))
      .order(d3[orderings[streamsOrder]])
      .offset(d3[offsets[streamsOffset]])

    let stackedData = stack(localStack)

    let localDomain = [
      d3.min(stackedData, (d) => d3.min(d, (d) => d[0])),
      d3.max(stackedData, (d) => d3.max(d, (d) => d[1])),
    ]

    const sizeScale = d3
      .scaleLinear()
      .domain(useSameScale ? sizeDomain : localDomain)
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

    if (showSeriesLabels) {
      d3.select(this)
        .append('text')
        .attr('x', 4)
        .attr('y', 4)
        .text((d) => d.data[0])
        .styles(styles.seriesLabel)
    }

    // add the x axis titles
    selection
      .append('text')
      .styles(styles.axisLabel)
      .attr('y', serieHeight - 4)
      .attr('x', serieWidth)
      .attr('text-anchor', 'end')
      .attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none')
      .text(mapping.x.value)
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
