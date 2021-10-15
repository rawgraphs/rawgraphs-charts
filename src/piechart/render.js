import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import * as d3Gridding from 'd3-gridding'
import '../d3-styles.js'

export function colorDomain(data, mapping) {
  const domain = mapping.arcs.value
  return {
    domain,
    type: 'number',
  }
}

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
    // Series
    columnsNumber,
    showGrid,
    showSeriesLabels,
    sortPiesBy,
    // chart
    showArcValues,
    drawDonut,
    arcTichkness,
    sortArcsBy,
    // legend
    showLegend,
    legendWidth,
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

  data.forEach((d) => {
    // compute the total value for each pie
    d.totalValue = d3.sum(mapping.arcs.value.map((arc) => d[arc]))
  })

  // arcs sorting functions
  const arcsSortings = {
    totalDescending: function (a, b) {
      return d3.descending(a.value, b.value)
    },
    totalAscending: function (a, b) {
      return d3.ascending(a.value, b.value)
    },
    name: function (a, b) {
      return d3.ascending(a.name, b.name)
    },
    original: function (a, b) {
      return true
    },
  }

  // computet the total value for each dimension mapped as arc
  let arcsSize = mapping.arcs.value.map((arc) => ({
    name: arc,
    value: d3.sum(data.map((d) => d[arc])),
  }))
  // sort it, will be used later
  arcsSize.sort(arcsSortings[sortArcsBy])

  // pies sorting functions
  const pieSortings = {
    totalDescending: function (a, b) {
      return d3.descending(a.totalValue, b.totalValue)
    },
    totalAscending: function (a, b) {
      return d3.ascending(a.totalValue, b.totalValue)
    },
    name: function (a, b) {
      return d3.ascending(a.series, b.series)
    },
    original: function (a, b) {
      return true
    },
  }

  data.sort(pieSortings[sortPiesBy])

  // select the SVG element
  const svg = d3
    .select(svgNode)
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)

  // add background
  svg
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')

  const vizLayer = svg.append('g').attr('id', 'viz')
  // create the grid

  // set up grid
  const gridding = d3Gridding
    .gridding()
    .size([width, height])
    .mode('grid')
    .padding(0) // no padding, margins will be applied inside
    .cols(columnsNumber)

  const griddingData = gridding(data)

  const series = vizLayer
    .selectAll('g')
    .data(griddingData)
    .join('g')
    .attr('id', (d) => d.name)
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')

  //get max radius
  const maxRadius =
    d3.min([
      griddingData[0].width - margin.right - margin.left,
      griddingData[0].height - margin.top - margin.bottom,
    ]) / 2

  //create size scale
  const sizeScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, (d) => d.totalValue)])
    .range([0, maxRadius])

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

  // do stuff for each pie
  series.each(function (d, seriesIndex) {
    // make a local selection for each serie
    const selection = d3.select(this)

    // compute each serie width and height
    const seriesWidth = d.width - margin.right - margin.left
    const seriesHeight = d.height - margin.top - margin.bottom

    //create the pie
    //extrtactt arcs values
    let arcs = arcsSize.map((arc) => d[arc.name])
    // computet angles, using tthte give order and setting sort to null
    let angles = d3.pie().sort(null)(arcs)
    // compuet biggest radius
    let radius = sizeScale(d.totalValue)

    let arc = d3
      .arc()
      .innerRadius(
        drawDonut && sizeScale(d.totalValue) > arcTichkness
          ? sizeScale(d.totalValue) - arcTichkness
          : 0
      )
      .outerRadius(radius)

    let pie = selection
      .append('g')
      .attr('id', 'pie')
      .attr(
        'transform',
        'translate(' +
          (margin.left + seriesWidth / 2) +
          ',' +
          (margin.top + seriesHeight / 2) +
          ')'
      )

    pie
      .selectAll('path')
      .data(angles)
      .join('path')
      .attr('fill', (d, i) => {
        return colorScale(arcsSize[i].name)
      })
      .attr('stroke', background)
      .attr('d', (e) => arc.startAngle(e.startAngle).endAngle(e.endAngle)())

    // add arcs labels
    if (showArcValues) {
      let pieLabels = pie
        .append('g')
        .attr('id', 'labels')
        .selectAll('g')
        .data(angles)
        .join('g')
        .attr('transform', (e) => {
          return `translate(${arc
            .startAngle(e.startAngle)
            .endAngle(e.endAngle)
            .centroid(e)})`
        })

      pieLabels
        .append('text')
        .text((d) => d.data)
        .attr('text-anchor', 'middle')
        .styles(styles.labelSecondary)
    }

    if (showSeriesLabels) {
      selection
        .append('text')
        .text((d) => (d.series ? d.series : ''))
        .attr('y', margin.top + seriesHeight / 2 - radius - 4)
        .attr('x', margin.left + seriesWidth / 2)
        .styles(styles.seriesLabel)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'auto')
    }
  })

  // add legend
  if (showLegend) {
    const legendLayer = svg
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width},${marginTop})`)

    const chartLegend = legend().legendWidth(legendWidth)

    chartLegend.addColor('Arcs colors', colorScale)

    if (mapping.series.value) {
      const legendSizeScale = sizeScale.copy()
      legendSizeScale
        .domain(d3.extent(data, (d) => d.totalValue))
        .rangeRound([sizeScale(d3.min(data, (d) => d.totalValue)), maxRadius])

      chartLegend.addSize('Area', legendSizeScale, 'circle')
    }

    legendLayer.call(chartLegend)
  }
}
