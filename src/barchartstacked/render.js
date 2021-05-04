import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
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
    stacksOrder,
    stacksPadding,
    SortXAxisBy,
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

  // sort series
  nestedData.sort((a, b) => {
    return {
      valueDescending: d3.descending(a.totalSize, b.totalSize),
      valueAscending: d3.ascending(a.totalSize, b.totalSize),
      name: d3.ascending(a.data[0], b.data[0]),
    }[sortSeriesBy]
  })

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

  // domains
  // sum all values for each serie / stack
  const scaleRollup = d3
    .rollups(
      data,
      (v) => d3.sum(v, (d) => d.size),
      (d) => d.stacks + '_' + d.series
    )
    .map((d) => d[1])

  let sizeDomain = [0, d3.max(scaleRollup)]

  // stacks (x axis) sorting functions
  const stacksSortings = {
    'Total value (descending)': function (a, b) {
      return d3.descending(a[1], b[1])
    },
    'Total value (ascending)': function (a, b) {
      return d3.ascending(a[1], b[1])
    },
    Name: function (a, b) {
      return d3.ascending(a[0], b[0])
    },
    Original: function (a, b) {
      return true
    },
  }
  // stacks (x axis) domain
  const stacksDomain = d3
    .rollups(
      data,
      (v) => d3.sum(v, (d) => d.size),
      (d) => d.stacks
    )
    .sort(stacksSortings[SortXAxisBy])
    .map((d) => d[0])

  const barsDomain = [...new Set(data.map((d) => d.bars))]

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
        d.data[1],
        ([e]) => e,
        (e) => e.stacks,
        (e) => e.bars
      )
    )

    // creaet an object with ordering methods
    const orderings = {
      Earliest: 'stackOrderAppearance',
      Ascending: 'stackOrderAscending',
      Descending: 'stackOrderDescending',
      'Inside out': 'stackOrderInsideOut',
      None: 'stackOrderNone',
      Reverse: 'stackOrderReverse',
    }

    // create the stack
    // define the funciton to retrieve the value
    // inspired by https://observablehq.com/@stevndegwa/stack-chart
    let stack = d3
      .stack()
      .keys(barsDomain)
      .value((data, key) => (data[1].has(key) ? data[1].get(key).size : 0))
      .order(d3[orderings[stacksOrder]])

    let stackedData = stack(localStack)

    // check if padding is too high and leave no space for bars
    if (stacksPadding * stacksDomain.length > serieWidth) {
      throw new Error(
        'Padding is too high, decrase it in the panel "chart" > "Padding"'
      )
    }

    // scales
    const stacksScale = d3
      .scaleBand()
      .range([0, serieWidth])
      .domain(stacksDomain)
      .padding(
        stacksPadding / (serieWidth / stacksDomain.length) //convert padding from px to percentage
      )

    let localDomain = [
      0,
      d3.max(
        d3
          .rollups(
            d.data[1],
            (v) => d3.sum(v, (d) => d.size),
            (d) => d.stacks
          )
          .map((d) => d[1])
      ),
    ]

    const sizeScale = d3
      .scaleLinear()
      .domain(useSameScale ? sizeDomain : localDomain)
      .nice()
      .range([serieHeight, 0])

    const bars = selection
      .selectAll('g')
      .data(stackedData)
      .join('g')
      .attr('id', (d) => d.key)
      .attr('fill', (d) => colorScale(d.key))
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => stacksScale(d.data[0]))
      .attr('y', (d) => sizeScale(d[1]))
      .attr('width', stacksScale.bandwidth())
      .attr('height', (d) => serieHeight - sizeScale(d[1] - d[0]))

    const xAxis = selection
      .append('g')
      .attr('id', 'xAxis')
      .attr('transform', 'translate(0,' + sizeScale(0) + ')')
      .call(d3.axisBottom(stacksScale).tickSizeOuter(0))

    const yAxis = selection
      .append('g')
      .attr('id', 'yAxis')
      .call(d3.axisLeft(sizeScale).tickSizeOuter(0))

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
      .attr('y', serieHeight - 4)
      .attr('x', serieWidth)
      .attr('text-anchor', 'end')
      .attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none')
      .text(mapping.stacks.value)
      .styles(styles.axisLabel)
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
