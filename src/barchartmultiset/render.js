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
    barsPadding,
    setsPadding,
    SortXAxisBy,
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
  let originalDomain = d3.extent(data, (d) => d.size)

  let sizeDomain =
    originalDomain[0] > 0 ? [0, originalDomain[1]] : originalDomain

  // sets (x axis) sorting functions
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
  // sets (x axis) domain
  const setsDomain = d3
    .rollups(
      data,
      (v) => d3.sum(v, (d) => d.size),
      (d) => d.groups
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

    // scales
    const setScale = d3
      .scaleBand()
      .range([0, serieWidth])
      .domain(setsDomain)
      .padding(
        setsPadding / (serieWidth / setsDomain.length) //convert padding from px to percentage
      )

    const barScale = d3
      .scaleBand()
      .range([0, setScale.bandwidth()])
      .domain(barsDomain)
      .padding(
        barsPadding / (setScale.bandwidth() / barsDomain.length) //convert padding from px to percentage
      )

    const localDomain = d3.extent(d.data[1], (e) => e.size)

    const sizeScale = d3
      .scaleLinear()
      .domain(useSameScale ? sizeDomain : localDomain)
      .nice()
      .range([serieHeight, 0])

    // check if padding is too high and leave no space for bars

    if (
      setsPadding * setsDomain.length +
        barsPadding * barsDomain.length * setsDomain.length >=
      serieWidth
    ) {
      throw new Error(
        'Paddings are too high, decrase them in the "chart" options panel'
      )
    }
    const minimumBarSize = serieWidth / setScale.domain() / barScale.domain()

    const bars = selection
      .append('g')
      .attr('class', 'bars')
      .selectAll('rect')
      .data((d) => d.data[1])
      .join('rect')
      .attr('id', (d) => d.series + ' - ' + d.bars)
      .attr('x', (d) => setScale(d.groups) + barScale(d.bars))
      .attr('y', (d) => sizeScale(Math.max(0, d.size)))
      .attr('height', (d) => Math.abs(sizeScale(d.size) - sizeScale(0)))
      .attr('width', barScale.bandwidth())
      .attr('fill', (d) => colorScale(d.bars))

    const xAxis = selection
      .append('g')
      .attr('id', 'xAxis')
      .attr('transform', 'translate(0,' + sizeScale(0) + ')')
      .call(d3.axisBottom(setScale).tickSizeOuter(0))

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
      .attr('y', sizeScale(0) - 4)
      .attr('x', serieWidth)
      .attr('text-anchor', 'end')
      .attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none')
      .styles(styles.axisLabel)
      .text('Sets')

    // add the y axis titles
    selection
      .append('text')
      .attr('y', 0)
      .attr('x', 4)
      .attr('dominant-baseline', 'hanging')
      .attr('text-anchor', 'start')
      .attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none')
      .styles(styles.axisLabel)
      .text('Value')
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
