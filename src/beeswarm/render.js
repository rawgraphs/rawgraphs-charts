import * as d3 from 'd3'
import { legend, dateFormats, labelsOcclusion } from '@rawgraphs/rawgraphs-core'
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
    // margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // legends
    showLegend,
    legendWidth,
    // chart options
    minDiameter,
    maxDiameter,
    simulationStrength,
    nodePadding,
    sortSeriesBy,
    // colors
    colorScale,
    showLabelsOutline,
    autoHideLabels,
    //TODO add labels legends
    labelStyles,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  // create nest structure
  const grouped = d3.groups(data, (d) => d.series)
  // reduce them for sorting
  const reduced = grouped.reduce((map, d) => {
    map[d[0]] = d3.sum(d[1], (e) => e.size)
    return map
  }, {})

  // define chart dimension
  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // sort series
  switch (sortSeriesBy) {
    case 'Total value (descending)':
      grouped.sort((a, b) => d3.descending(reduced[a[0]], reduced[b[0]]))
      break
    case 'Total value (ascending)':
      grouped.sort((a, b) => d3.ascending(reduced[a[0]], reduced[b[0]]))
      break
    case 'Name':
      grouped.sort((a, b) => d3.ascending(a[0], b[0]))
  }

  mapping.xValue.dataType === 'number'
    ? (mapping.xValue.dataType = {
        type: 'number',
      })
    : null // @TODO it should be better to have always the same kind of object in mapping

  let xScale
  const xDomain = d3.extent(data, (d) => d.xValue)

  switch (mapping.xValue.dataType.type) {
    case 'number':
      xScale = d3.scaleLinear().domain(xDomain).nice().range([0, chartWidth])
      break
    case 'date':
      xScale = d3.scaleTime().domain(xDomain).nice().range([0, chartWidth])
      break
  }
  // create scale for sizes
  const sizeScale = d3
    .scaleSqrt()
    .domain(d3.extent(data, (d) => d.size))
    .range([minDiameter / 2, maxDiameter / 2])

  // create y scale
  const yScale = d3
    .scaleBand()
    .rangeRound([0, chartHeight])
    .domain(grouped.map((d) => d[0]))
    .align(0.5)
    .padding(0)

  // prepare data with initial vales, so the simulation won't start from 0,0
  data.forEach((d) => {
    d.x = xScale(d.xValue)
    d.y = yScale(d.series) + yScale.bandwidth() / 2
  })

  // initialise simulation
  let simulation = d3
    .forceSimulation(data)
    .force(
      'x',
      d3.forceX().x((d) => xScale(d.xValue))
    )
    .force(
      'y',
      d3.forceY((d) => yScale(d.series) + yScale.bandwidth() / 2)
    )
    .force(
      'collision',
      d3.forceCollide().radius((d) => sizeScale(d.size) + nodePadding)
    )

  // add background
  d3.select(svgNode)
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')

  // get svg node
  const svg = d3
    .select(svgNode)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('id', 'viz')

  const xAxis = (g) => {
    return g
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .call((g) =>
        g
          .append('text')
          .attr('x', chartWidth)
          .attr('dy', -5)
          .attr('text-anchor', 'end')
          .text(mapping['xValue'].value)
          .styles(styles.axisLabel)
      )
  }

  const yAxis = (g) => {
    return g
      .call(
        d3.axisLeft(yScale).tickSize(Math.round(-chartWidth)).tickSizeOuter(0)
      )
      .call((g) => g.selectAll('line').styles(styles.axisLine))
      .call((g) =>
        g
          .append('text')
          .attr('x', 4)
          .attr('text-anchor', 'start')
          .attr('dominant-baseline', 'hanging')
          .text(mapping['series'].value)
          .styles(styles.axisLabel)
      )
  }

  // draw the scale and axes
  const axisLayer = svg.append('g').attr('id', 'axis')

  axisLayer.append('g').call(xAxis)
  axisLayer.append('g').call(yAxis)
  // // draw y axis
  // axisLayer
  //   .append('g')
  //   .attr('id', 'y axis')
  //   .call(
  //     d3.axisLeft(yScale).tickSize(Math.round(-chartWidth)).tickSizeOuter(0)
  //   )

  // // draw x axis
  // axisLayer
  //   .append('g')
  //   .attr('id', 'y axis')
  //   .attr('transform', `translate(0,${chartHeight})`)
  //   .call(d3.axisBottom(xScale).tickSizeOuter(0))

  // draw the viz
  const vizLayer = svg
    .append('g')
    .selectAll('g')
    .data(grouped)
    .join('g')
    .attr('id', (d) => d[0])

  // let the simulation run in background
  // @TODO move this to a web worker
  //console.log("---------------new simulation---------------")
  for (
    var i = 0,
      n = Math.ceil(
        Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
      );
    i < n;
    ++i
  ) {
    //console.log(i+"/"+n+"("+ (i/n*100) + ")")
    simulation.tick()
  }
  //console.log("---------------end of simulation---------------")

  //add all the circles
  vizLayer
    .append('g')
    .attr('id', 'cicles')
    .selectAll('circle')
    .data((d) => d[1])
    .join('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', (d) => sizeScale(d.size))
    .style('fill', (d) => colorScale(d.color))

  const labelsLayer = vizLayer.append('g').attr('class', 'labels')

  labelsLayer
    .selectAll('g')
    .data((d) => (mapping.label.value ? d[1] : []))
    .join('g')
    .attr('transform', (d) => `translate(${d.x},${d.y})`)
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
    .attr('dy', (d, i) => i * 12)
    .text((d, i) => {
      if (d && mapping.label.dataType[i].type === 'date') {
        return d3.timeFormat(dateFormats[mapping.label.dataType[i].dateFormat])(
          d
        )
      } else {
        return d
      }
    })
    .styles((d, i) => styles[labelStyles[i]])

  labelsLayer.selectAll('text').call((sel) => {
    return sel.attr('transform', function (d) {
      const height = sel.node().getBBox().height
      return `translate(0,${-height / 2})`
    })
  })

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    labelsLayer.selectAll('text').styles(styles.labelOutline)
  }

  if (autoHideLabels) {
    labelsOcclusion(labelsLayer.selectAll('text'), (d) => d.size)
  }

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

    chartLegend.addSize(
      mapping.size.value ? mapping.size.value : 'Number of records',
      sizeScale,
      'circle'
    )

    legendLayer.call(chartLegend)
  }
}
