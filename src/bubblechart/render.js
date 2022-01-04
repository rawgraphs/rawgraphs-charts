import * as d3 from 'd3'
import { legend, dateFormats, labelsOcclusion } from '@rawgraphs/rawgraphs-core'
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
    width,
    height,
    background,
    xOrigin,
    yOrigin,
    maxDiameter,
    showStroke,
    showPoints,
    dotsDiameter,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
    showLabelsOutline,
    autoHideLabels,
    labelStyles,
    columnsNumber,
    showGrid,
    showSeriesLabels,
    sortSeriesBy,
    useSameYScale,
    useSameXScale,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  // if series is exposed, recreate the nested structure
  const nestedData = d3.groups(data, (d) => d.series)

  // comupte max values for series
  // will add it as property to each series.

  nestedData.forEach(function (serie) {
    serie.totalValue = data
      .filter((item) => item.series == serie[0])
      .reduce(
        (result, item) => (result + mapping.size.value ? item.size : 1),
        0
      )
  })

  // series sorting functions
  const seriesSortings = {
    totalDescending: function (a, b) {
      return d3.descending(a.totalValue, b.totalValue)
    },
    totalAscending: function (a, b) {
      return d3.ascending(a.totalValue, b.totalValue)
    },
    name: function (a, b) {
      return d3.ascending(a[0], b[0])
    },
  }
  // sort series
  nestedData.sort(seriesSortings[sortSeriesBy])

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
  const seriesLayer = svg.append('g').attr('id', 'series')

  // set up grid
  const gridding = d3Gridding
    .gridding()
    .size([width, height])
    .mode('grid')
    .padding(0) // no padding, margins will be applied inside
    .cols(columnsNumber)

  const griddingData = gridding(nestedData)

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

  // create the clip path
  svg
    .append('clipPath')
    .attr('id', 'serieClipPath')
    .append('rect')
    .attr('x', -margin.left)
    .attr('y', -margin.top)
    .attr('width', griddingData[0].width)
    .attr('height', griddingData[0].height)

  // create the grid
  const series = seriesLayer
    .selectAll('g')
    .data(griddingData)
    .join('g')
    .attr('id', (d) => d[0])
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')

  // compute the size scale, common to all the charts
  const maxRadius = maxDiameter / 2
  const sizeScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, (d) => d.size)])
    .rangeRound([0, maxRadius])

  /*
    YOU CAN PUT HERE CODE THAT APPLIES TO ALL THE SERIES
  */

  // do stuff for each serie
  series.each(function (serie, seriesIndex) {
    // make a local selection for each serie
    const selection = d3
      .select(this)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // add the clip path
    selection.attr('clip-path', 'url(#serieClipPath)')

    // add series titles
    if (showSeriesLabels) {
      d3.select(this)
        .append('text')
        .attr('y', 4)
        .attr('x', 4)
        .text((d) => d[0])
        .styles(styles.seriesLabel)
    }

    // compute each serie width and height
    const seriesWidth = serie.width - margin.right - margin.left
    const seriesHeight = serie.height - margin.top - margin.bottom
    // get series data
    const serieData = serie[1]

    // calculate domains
    // y domain
    const yDomain = useSameYScale
      ? // compute extent of the whole dataset
        d3.extent(data, (e) => e.y)
      : // compute extent of the single serie
        d3.extent(serieData, (d) => d.y)

    if (yOrigin) {
      yDomain[0] = 0
    }

    // x domain
    const xDomain = useSameXScale
      ? // compute extent of the whole dataset
        d3.extent(data, (e) => e.x)
      : // compute extent of the single serie
        d3.extent(serieData, (d) => d.x)

    if (xOrigin) {
      xDomain[0] = 0
    }

    // create scales
    // x scale
    const xScale =
      mapping.x.dataType.type === 'date' ? d3.scaleTime() : d3.scaleLinear()

    xScale.domain(xDomain).rangeRound([0, seriesWidth]).nice()

    // y scale

    const yScale =
      mapping.y.dataType.type === 'date' ? d3.scaleTime() : d3.scaleLinear()

    yScale.domain(yDomain).rangeRound([seriesHeight, 0]).nice()

    // create axis functions
    // x axis
    const xAxis = (g) => {
      return g
        .attr('transform', `translate(0,${seriesHeight})`)
        .call(d3.axisBottom(xScale))
        .call((g) =>
          g
            .append('text')
            .attr('x', seriesWidth)
            .attr('dy', -5)
            .attr('text-anchor', 'end')
            .text(mapping['x'].value)
            .styles(styles.axisLabel)
        )
    }

    // y axis
    const yAxis = (g) => {
      return g
        .call(d3.axisLeft(yScale))
        .call((g) =>
          g
            .append('text')
            .attr('x', 4)
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'hanging')
            .text(mapping['y'].value)
            .styles(styles.axisLabel)
        )
    }

    // append axes to the svg
    const axisLayer = selection.append('g').attr('id', 'axis')

    axisLayer.append('g').call(xAxis)
    axisLayer.append('g').call(yAxis)

    //create a group for visualization
    const vizLayer = selection.append('g').attr('id', 'viz')

    // add connection line
    if (mapping.connectedBy.value) {
      const line = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))

      vizLayer
        .append('path')
        .attr('d', () =>
          line(
            serieData.sort((a, b) => {
              return d3.ascending(a.connectedBy, b.connectedBy)
            })
          )
        )
        .attr('stroke', 'grey')
        .attr('stroke-width', 0.5)
        .attr('fill', 'none')
    }

    // create circles
    const bubbles = vizLayer
      .selectAll('g')
      .data(
        serieData.sort((a, b) => {
          console.log(a, b)
          const sortValueA = mapping.size.value ? sizeScale(a.size) : maxRadius
          const sortValueB = mapping.size.value ? sizeScale(b.size) : maxRadius
          return sortValueB - sortValueA
        })
      )
      .join('g')

    bubbles
      .append('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('fill', (d) => {
        return colorScale(d.color)
      })
      .attr('r', (d) => {
        return mapping.size.value ? sizeScale(d.size) : maxRadius
      })
      .attr('stroke', showStroke ? 'white' : 'none')

    // add dots on the center
    if (showPoints) {
      bubbles
        .append('circle')
        .attr('cx', (d) => xScale(d.x))
        .attr('cy', (d) => yScale(d.y))
        .attr('fill', 'black')
        .attr('r', dotsDiameter / 2)
    }

    //create a group for labels
    const labelsLayer = vizLayer.append('g').attr('id', 'labels')

    // add labels
    labelsLayer
      .selectAll('g')
      .data(mapping.label.value ? serieData : [])
      .join('g')
      .attr('transform', (d) => `translate(${xScale(d.x)},${yScale(d.y)})`)
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'text-before-edge')
      .selectAll('tspan')
      .data((d) => (Array.isArray(d.label) ? d.label : [d.label]))
      .join('tspan')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', (d, i) => i * 12) //@TODO fix magic number
      .text((d, i) => {
        if (d && mapping.label.dataType[i].type === 'date') {
          return d3.timeFormat(
            dateFormats[mapping.label.dataType[i].dateFormat]
          )(d)
        } else {
          return d
        }
      })
      .styles((d, i) => styles[labelStyles[i]])

    // center labels position
    labelsLayer.selectAll('text').call((sel) => {
      return sel.attr('transform', function (d) {
        const height = sel.node().getBBox().height
        return `translate(0,${-height / 2})`
      })
    })

    // add outline
    if (showLabelsOutline) {
      // NOTE: Adobe Illustrator does not support paint-order attr
      labelsLayer.selectAll('text').styles(styles.labelOutline)
    }

    // auto hide labels
    if (autoHideLabels) {
      labelsOcclusion(labelsLayer.selectAll('text'), (d) => d.size)
    }
    /*
      END OF THE CHART CODE
    */
  })

  // add legend
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

    if (mapping.size.value) {
      const legendSizeScale = sizeScale.copy()
      legendSizeScale
        .domain(d3.extent(data, (d) => d.size))
        .rangeRound([sizeScale(d3.min(data, (d) => d.size)), maxRadius])

      chartLegend.addSize(mapping.size.value, legendSizeScale, 'circle')
    }

    legendLayer.call(chartLegend)
  }
}
