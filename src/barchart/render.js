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
    padding,
    // series options
    columnsNumber,
    useSameScale = false,
    sortSeriesBy,
    gutterX,
    gutterY,
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
      (v) => v.sort((a, b) => d3.ascending(a.bars, b.bars)),
      (d) => d.series
    )
    .map((d) => ({ data: d }))

  const activeWidth = width - margin.right - margin.left
  const activeHeight = height - margin.top - margin.bottom

  // set up grid
  const gridding = d3Gridding
    .gridding()
    .size([activeWidth, activeHeight])
    .mode('grid')
    .padding(10)
    .cols(2)

  const griddingData = gridding(nestedData)

  const svg = d3
    .select(svgNode)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('id', 'viz')

  const series = svg
    .selectAll('g')
    .data(griddingData)
    .join('g')
    .attr('id', (d) => d[0])
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')

  // domains
  let sizeDomain = d3.extent(data, (d) => d.size)
  const barsDomain = [...new Set(data.map((d) => d.bars))]

  series.each(function (d) {
    // console.log('each', d3.select(this))
    const selection = d3.select(this)

    // scales
    const barScale = d3
      .scaleBand()
      .range([0, griddingData[0].width])
      .domain(barsDomain)
      .padding(
        padding / (griddingData[0].width / griddingData[0].data[1].length)
      )

    const sizeScale = d3
      .scaleLinear()
      .domain(useSameScale ? sizeDomain : d3.extent(d.data[1], (e) => e.size))
      .nice()
      .range([griddingData[0].height, 0])

    console.log(d3.extent(d.data[1], (e) => e.size))

    const bars = selection
      .append('g')
      .attr('class', 'bars')
      .selectAll('rect')
      .data((d) => d.data[1])
      .join('rect')
      .attr('id', (d) => d.series + ' - ' + d.bars)
      .attr('x', (d, i) => barScale(d.bars))
      .attr('y', (d) => sizeScale(d.size))
      .attr('height', (d) => sizeScale(0) - sizeScale(d.size))
      .attr('width', barScale.bandwidth())
      .attr('fill', (d) => colorScale(d.color))

    const xAxis = selection
      .append('g')
      .attr('id', 'xAxis')
      .attr('transform', (d) => 'translate(0,' + d.height + ')')
      .call(d3.axisBottom(barScale).tickSizeOuter(0))

    const yAxis = selection
      .append('g')
      .attr('id', 'yAxis')
      .call(d3.axisLeft(sizeScale).tickSizeOuter(0))
  })
}
