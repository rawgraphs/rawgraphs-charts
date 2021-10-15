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
    // visual model options
    showDots,
    dotsDiameter,
    interpolation,
    innerDiameter,
    fillOpacity,
    //labels
    labelsPadding,
    //series options
    columnsNumber,
    sortSeriesBy,
    showSeriesLabels,
    showGrid,
    // color otpions
    colorScale,
  } = visualOptions

  // Margin convention
  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  //check if there are negative values, in case throw error
  data.forEach((d) => {
    if (d.value < 0) {
      throw new Error('Values cannot be negative')
    }
  })

  // convert string to d3 functions
  const curveType = {
    Linear: d3.curveLinearClosed,
    Basis: d3.curveBasisClosed,
    Cardinal: d3.curveCardinalClosed,
    'Catmull–Rom': d3.curveCatmullRomClosed,
  }

  // if series is exposed, recreate the nested structure
  const nestedData = d3
    .rollups(
      data,
      (v) => v,
      (d) => d.series,
      (d) => d.name
    )
    .map((d) => {
      //calc the total values
      d.totalSize = d3.sum(d[1].map((e) => e[1]).flat(), (e) => e.value)
      return d
    })
  // sort series
  nestedData.sort((a, b) => {
    return {
      valueDescending: d3.descending(a.totalSize, b.totalSize),
      valueAscending: d3.ascending(a.totalSize, b.totalSize),
      name: d3.ascending(a[0], b[0]),
    }[sortSeriesBy]
  })

  // select the SVG element
  const svg = d3.select(svgNode)

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
    .cols(mapping.series.value ? columnsNumber : 1)

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

  // create the grid
  const series = svg
    .selectAll('g')
    .data(griddingData)
    .join('g')
    .attr('id', (d) => d[0])
    .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')

  /*
    CODE FOR ALL THE SERIES
   */
  const axesDomain = mapping.axes.value
  // create the radial scale to dispose axes
  const radialScale = d3
    .scalePoint()
    .domain(axesDomain)
    .range([-Math.PI / 2, Math.PI * 1.5]) // starts from -PI/2 (upper part of circle)
    .padding(0.5) // calculate half padding at beginning and half at end
    .align(0) // put all the apdding at the end
    .round(false)

  const maxValue = d3.max(data, (d) => d.value)

  const innerRadius = innerDiameter / 2

  const outerRadius = d3.min([
    (griddingData[0].width - margin.right - margin.left) / 2,
    (griddingData[0].height - margin.top - margin.bottom) / 2,
  ])

  const axesScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .nice()
    .rangeRound([innerRadius, outerRadius])

  const axesGrid = d3
    .scaleLinear()
    .domain([maxValue, 0])
    .rangeRound([innerRadius, outerRadius])

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
    CODE FOR EACH SERIE
  */
  series.each(function (d, seriesIndex) {
    // make a local selection for each serie
    const selection = d3.select(this)
    // apply clipPath
    selection.attr('clip-path', 'url(#serieClipPath)')

    // compute each serie width and height
    const seriesWidth = d.width - margin.right - margin.left
    const seriesHeight = d.height - margin.top - margin.bottom
    // use the smallest dimension as diameter

    // get the array containing all the data for each radar chart
    let radarData = d[1]

    // create the axis and the grid
    let viz = selection
      .append('g')
      .attr('id', d[0])
      .attr(
        'transform',
        `translate(${outerRadius + margin.left}, ${outerRadius + margin.top})`
      )

    let axesLayer = viz.append('g').attr('id', 'axes')

    let axisFunction = d3.axisLeft(axesGrid)

    // add a circle for each tick on the axis
    axesLayer
      .selectAll('.grid')
      .data(axisFunction.scale().ticks())
      .enter()
      .append('circle')
      .attr('r', (d) => axesScale(d))
      .attr('fill', 'none')
      .attr('stroke', 'LightGray')
      .attr('class', 'grid')
      .attr('id', (d) => d)

    // add axes
    let axesGroups = axesLayer
      .selectAll('g')
      .data(axesDomain)
      .enter()
      .append('g')

    // draw a line for each axis
    axesGroups
      .append('line')
      .attr('x1', (d) => {
        return Math.cos(radialScale(d)) * innerRadius
      })
      .attr('y1', (d) => {
        return Math.sin(radialScale(d)) * innerRadius
      })
      .attr('x2', (d) => {
        return Math.cos(radialScale(d)) * outerRadius
      })
      .attr('y2', (d) => {
        return Math.sin(radialScale(d)) * outerRadius
      })
      .attr('stroke', 'black')

    //add a label for each axis
    axesGroups
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('x', (d) => {
        return Math.cos(radialScale(d)) * (outerRadius + labelsPadding)
      })
      .attr('y', (d) => {
        return Math.sin(radialScale(d)) * (outerRadius + labelsPadding)
      })
      .text((d) => d)
      .attr('font-family', 'Arial, sans-serif')
      .attr('font-size', 12)

    //draw scale for first axis
    axesLayer
      .append('g')
      .attr('id', 'y axis')
      .call(axisFunction)
      .attr('transform', `translate(${0}, ${-outerRadius - innerRadius})`)

    // draw each radar chart
    let plots = viz
      .append('g')
      .attr('id', 'radars')
      .selectAll('g')
      .data(radarData)
      .enter()
      .append('g')
      .attr('id', (d) => d[0])

    let radarLine = d3
      .lineRadial()
      .curve(curveType[interpolation])
      .radius((d) => axesScale(d.value))
      .angle((d) => radialScale(d.axes) + Math.PI / 2)

    plots
      .append('path')
      .attr('d', (d) => radarLine(d[1]))
      .attr('stroke', (d) => colorScale(d[1][0].color)) //first item of the data list
      .attr('fill', (d) => colorScale(d[1][0].color))
      .attr('fill-opacity', fillOpacity)

    if (showDots) {
      plots
        .append('g')
        .attr('id', 'dots')
        .selectAll('circle')
        .data((d) => d[1])
        .enter()
        .append('circle')
        .attr('cx', (d) => Math.cos(radialScale(d.axes)) * axesScale(d.value))
        .attr('cy', (d) => Math.sin(radialScale(d.axes)) * axesScale(d.value))
        .attr('r', dotsDiameter / 2)
        .attr('stroke', 'none')
        .attr('fill', (d) => colorScale(d.color))
    }

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
