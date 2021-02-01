import * as d3 from 'd3'
import { rawgraphsLegend } from '@raw-temp/rawgraphs-core'
import * as d3Gridding from 'd3-gridding'

export function render(svgNode, data, visualOptions, mapping, originalData) {
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
    stacksOrder,
    stacksPadding,
    // series options
    columnsNumber,
    useSameScale,
    sortSeriesBy,
    showSeriesLabels,
    repeatAxesLabels,
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
    .attr(
      'transform',
      (d) => 'translate(' + (d.x + margin.left) + ',' + (d.y + margin.top) + ')'
    )

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

  const stacksDomain = [...new Set(data.map((d) => d.stacks))]

  const barsDomain = [...new Set(data.map((d) => d.bars))]

  series.each(function (d, serieIndex) {
    // make a local selection for each serie
    const selection = d3.select(this)

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
    // .offset(d3.stackOffsetNone)

    let stackedData = stack(localStack)

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

    console.log('cs', colorScale.domain(), colorScale.range())

    const bars = selection
      .selectAll('g')
      .data(stackedData)
      .join('g')
      .attr('id', (d) => d.key)
      .attr('fill', (d) => {
        console.log(d.key, colorScale(d.key))
        return colorScale(d.key)
      })
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => stacksScale(d.data[0]))
      .attr('y', (d) => sizeScale(d[1]))
      .attr('width', stacksScale.bandwidth())
      .attr('height', (d) => {
        if (d[1] - d[0] < 0) {
          console.log('Values cannot be negative', d) // @TODO: provide error if a value is negative
        }
        return serieHeight - sizeScale(d[1] - d[0])
      })

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
      selection
        .append('text')
        .attr('class', 'title')
        .text((d) => d.data[0])
        .attr('y', -4)
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('font-weight', 'bold')
    }

    // add the x axis titles
    selection
      .append('text')
      .attr('dy', serieHeight - 4)
      .attr('x', serieWidth)
      .attr('class', 'axisTitle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
      .attr('font-style', 'italic')
      .attr('text-anchor', 'end')
      .attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none')
      .text(mapping.stacks.value)
  })

  // add legend
  if (showLegend) {
    const legendLayer = d3
      .select(svgNode)
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width},${marginTop})`)

    const legend = rawgraphsLegend().legendWidth(legendWidth)

    legend.addColor('Sets', colorScale)

    legendLayer.call(legend)
  }
}
