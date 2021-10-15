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
    showLegend,
    legendWidth,
    // chart
    nonOverlap,
    showDots,
    dotsDiameter,
    // series
    columnsNumber,
    showSeriesLabels,
    showGrid,
    // color dimension option, defined in visualOptions.js
    colorScale,
  } = visualOptions

  // Margin convention
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }
  const dotsRadius = dotsDiameter / 2

  // if series is exposed, recreate the nested structure
  const nestedData = d3.groups(data, (d) => d.series)

  // select the SVG element
  const svg = d3.select(svgNode)

  // add background
  svg
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')

  // add the visualization layer
  const vizLayer = svg.append('g').attr('id', 'viz')

  // set up grid
  const gridding = d3Gridding
    .gridding()
    .size([width, height])
    .mode('grid')
    .padding(0) // no padding, margins will be applied inside
    .cols(columnsNumber)

  const griddingData = gridding(nestedData)

  // create the clip path
  svg
    .append('clipPath')
    .attr('id', 'serieClipPath')
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', griddingData[0].width)
    .attr('height', griddingData[0].height)

  // draw the grid if asked
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

  // create the grid
  const series = vizLayer
    .selectAll('g')
    .data(griddingData)
    .join('g')
    .attr('id', (d) => d[0])
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')

  // get info on series
  const seriesWidth = griddingData[0].width - margin.right - margin.left
  const seriesHeight = griddingData[0].height - margin.top - margin.bottom

  // scales
  let columns = [mapping.source.value, mapping.target.value]
  let xScale = d3
    .scalePoint()
    .domain(columns)
    .range([margin.left, griddingData[0].width - margin.right])

  let yGlobalScale = d3
    .scaleLinear()
    .domain(d3.extent(data.flatMap((d) => [d.source, d.target])))
    .range([griddingData[0].height - margin.bottom, margin.top])

  /*
      YOU CAN PUT HERE CODE THAT APPLIES TO ALL THE SERIES
    */

  // do stuff for each serie
  series.each(function (d, seriesIndex) {
    // make a local selection for each serie
    const selection = d3.select(this)

    selection.attr('clip-path', 'url(#serieClipPath)')

    // add axes ticks
    selection
      .append('g')
      .attr('text-anchor', 'middle')
      .styles(styles.axisLabel)
      .selectAll('g')
      .data(columns)
      .join('g')
      .attr('transform', (d, i) => `translate(${xScale(d)},${margin.top})`)
      .call((g) =>
        g
          .append('text')
          .attr('y', -9)
          .text((d) => d)
      )
      .call((g) =>
        g
          .append('line')
          .attr('y1', 0)
          .attr('y2', -6)
          .attr('stroke', 'currentColor')
      )

    //add lines
    let slopes = selection
      .append('g')
      .selectAll('g')
      .data(d[1])
      .join('g')
      .attr('id', (d, i) => d.name)

    slopes
      .append('line')
      .attr('x1', (d) => xScale(mapping.source.value))
      .attr('x2', (d) => xScale(mapping.target.value))
      .attr('y1', (d) => yGlobalScale(d.source))
      .attr('y2', (d) => yGlobalScale(d.target))
      .attr('stroke', (d) => colorScale(d.color))
      .attr('fill', 'none')

    if (showDots) {
      slopes
        .append('circle')
        .attr('cx', (d) => xScale(mapping.source.value))
        .attr('cy', (d) => yGlobalScale(d.source))
        .attr('r', dotsRadius)
        .attr('fill', (d) => colorScale(d.color))

      slopes
        .append('circle')
        .attr('cx', (d) => xScale(mapping.target.value))
        .attr('cy', (d) => yGlobalScale(d.target))
        .attr('r', dotsRadius)
        .attr('fill', (d) => colorScale(d.color))
    }

    // create a single flat dataset containing all the labels
    let labels = d[1].flatMap((d) => {
      // return the couple for source and target
      return [
        {
          label:
            mapping.name.value != undefined
              ? d.name + ' ' + d.source
              : d.source,
          type: 'source',
          originalX: xScale(mapping.source.value) - dotsRadius - 4,
          x: xScale(mapping.source.value),
          y:
            yGlobalScale(d.source) +
            parseInt(styles.labelSecondary.fontSize) / 2,
        },
        {
          label:
            mapping.name.value != undefined
              ? d.name + ' ' + d.target
              : d.target,
          type: 'target',
          originalX: xScale(mapping.target.value) + dotsRadius + 4,
          x: xScale(mapping.target.value),
          y:
            yGlobalScale(d.target) +
            parseInt(styles.labelSecondary.fontSize) / 2,
        },
      ]
    })

    // use forces to avoid overlaps
    const simulation = d3
      .forceSimulation(labels)
      .force(
        'y',
        d3.forceY().y((d) => d.y)
      )
      .force(
        'x',
        d3
          .forceX()
          .x((d) => d.x)
          .strength(1)
      )
      .force('collision', d3.forceCollide().radius(nonOverlap))
      .stop()
      .tick(150) // precalculate positions

    // add labels
    let sourceLabels = selection
      .append('g')
      .selectAll('text')
      .data(labels)
      .join('text')
      .text((d) => d.label)
      .attr('transform', (d) => `translate(${d.originalX},${d.y})`)
      .attr('text-anchor', (d) => (d.type == 'source' ? 'end' : 'start'))
      .styles(styles.labelSecondary)

    // add series titles
    if (showSeriesLabels) {
      selection
        .append('text')
        .attr('x', 5)
        .attr('y', 5)
        .text((d) => d[0])
        .styles(styles.seriesLabel)
    }
  })

  // show legends
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
