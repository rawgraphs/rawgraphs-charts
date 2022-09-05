import * as d3 from 'd3'
import '../d3-styles.js'

export function render(node, data, visualOptions, mapping, styles) {
  // destructurate visual visualOptions
  const {
    //artboard
    title,
    background,
    width,
    height,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,

    //axis
    axisLeftLabel,
    axisLeftLabelVisible,
    axisRightLabel,
    axisRightLabelVisible,
    axisVerticalLabel,
    axisVerticalLabelVisible,
    labelLeftAlignment,
    labelLeftRotation,
    labelRightAlignment,
    labelRightRotation,

    //chart
    spaceCommonAxis,
    sortBarsBy,
    padding,
    colorScale1,
    colorScale2
  } = visualOptions

  const {
    minTitleHeight,
    titleSize,
    boundWidth,
    boundWidthOneChart,
    boundHeight,
    boundLeft,
    boundTop,
    x1Accessor,
    x2Accessor,
    yAccessor,
    barsSortings,
    barsDomain
  } = calcProps()

  const svg = d3.select(node)
  const bounds = createBounds()
  const {x1Scale, x2Scale, x1ScaleReverse, yScale} = createScales()
  const {x1Axis, x2Axis, yAxis} = createAxes()
  const {labelX1, labelX2} = createAxisLabels()
  const {bars1, bars2} = createBars()

  function calcProps() {
    const minTitleHeight = 300
    const titleSize = height / 30

    let boundWidth = width - marginLeft - marginRight
    let boundWidthOneChart = boundWidth - spaceCommonAxis
    let boundHeight = height - marginTop - marginBottom
    let boundLeft = marginLeft
    let boundTop =  boundHeight >= minTitleHeight ? marginTop + titleSize : marginTop

    if (boundHeight >= minTitleHeight) {
      boundHeight -= titleSize
    }

    const x1Accessor = d => d.x1
    const x2Accessor = d => d.x2
    const yAccessor = d => d.y

    const barsSortings = {
      totalDescending: (a, b) => d3.descending(a[1], b[1]),
      totalAscending: (a, b) => d3.ascending(a[1], b[1]),
      name: (a, b) => d3.ascending(a[0], b[0]),
      original: (a, b) => true,
    }

    const barsDomain = d3
        .rollups(
            data,
            (v) => d3.sum(v, (d) => d.size),
            (d) => d.y
        )
        .sort(barsSortings[sortBarsBy])
        .map((d) => d[0])

    return {minTitleHeight, titleSize, boundWidth, boundWidthOneChart, boundHeight, boundLeft, boundTop,
      x1Accessor, x2Accessor, yAccessor, barsSortings, barsDomain}
  }

  function createBounds() {
    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', background)

    if (titleSize) {
      svg.append('text')
          .text(title)
          .attr('x', width / 2)
          .attr('y', marginTop)
          .style("text-anchor", "middle")
          .attr("font-size", titleSize)
    }

    return svg.append("g")
        .attr("transform", `translate(
      ${boundLeft},
      ${boundTop})`)
  }

  function createScales() {
    const x1Scale = d3
        .scaleLinear()
        .domain(d3.extent(data, x1Accessor))
        .range([0, (boundWidthOneChart) / 2])
        .nice()

    const x1ScaleReverse = d3
        .scaleLinear()
        .domain(d3.extent(data, x1Accessor))
        .range([boundWidth, (boundWidth + spaceCommonAxis) / 2])
        .nice()

    const x2Scale = d3
        .scaleLinear()
        .domain(d3.extent(data, x2Accessor))
        .range([0, boundWidthOneChart / 2])
        .nice()

    const yScale = d3
        .scaleBand()
        .domain(barsDomain)
        .range([0, boundHeight])
        .padding(padding / (boundHeight / barsDomain.length))

    return {x1Scale, x2Scale, x1ScaleReverse, yScale}
  }

  function createAxes() {
    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
    const yAxis = bounds.append("g")
        .call(yAxisGenerator)
        .attr("text-anchor", "left")
    //yAxis.attr("transform", `translate(${(boundWidthOneChart)}, 0)`)//+ yAxis._groups[0][0].getBBox().width
    yAxis.attr("transform", `translate(${boundWidth / 2}, 0)`)
    yAxis.select("path")
        .remove()//attr("stroke", "none")
    yAxis.selectAll("line")
        .remove()//.attr("stroke", "none")
    yAxis.selectAll("text")
        .attr("dx", "0")
        .attr("x", "0")
        .attr("text-anchor", "middle")

    const x1AxisGenerator = d3.axisBottom()
        .scale(x1ScaleReverse)
    const x1Axis = bounds.append("g")
        .call(x1AxisGenerator)
        .attr("transform",
            `translate(${-(boundWidth + spaceCommonAxis) / 2}, ${boundHeight})`)

    x1Axis.selectAll("text")
        .attr("text-anchor", labelLeftAlignment)
        .attr("transform", `rotate(${labelLeftRotation})`)

    const x2AxisGenerator = d3.axisBottom()
        .scale(x2Scale)
    const x2Axis = bounds.append("g")
        .call(x2AxisGenerator)
        .attr("transform",
            `translate(${(boundWidth + spaceCommonAxis)  / 2}, ${boundHeight})`)


    x2Axis.selectAll("text")
        .attr("text-anchor", labelRightAlignment)
        .attr("transform", `rotate(${labelRightRotation})`)

    return({x1Axis, x2Axis, yAxis})
  }

  function createAxisLabels() {
    let labelX1 = null
    let labelX2 = null
    let labelY = null
    if (axisLeftLabelVisible) {
      const {x: x1} = x1Axis._groups[0][0].getBBox()
      labelX1 = x1Axis
          .append('text')
          .attr('font-family', 'sans-serif')
          .attr('font-size', 10)
          .attr('class', 'labels')
          .text(axisLeftLabel ? axisLeftLabel : mapping.x1.value)
          .attr("fill", "currentColor")
          .attr("dx", x1)
      labelX1
          .attr("transform", `translate(${labelX1._groups[0][0].getBBox().width / 2}, ${-5})`)
    }

    if (axisRightLabelVisible) {
      const {x: x2, width: widthX2} = x2Axis._groups[0][0].getBBox()
      labelX2 = x2Axis
          .append('text')
          .attr('font-family', 'sans-serif')
          .attr('font-size', 10)
          .attr('class', 'labels')
          .text(axisRightLabel ? axisRightLabel : mapping.x2.value)
          .attr("fill", "currentColor")
          .attr("dx", x2 + widthX2)
      labelX2
          .attr("transform", `translate(${-labelX2._groups[0][0].getBBox().width / 2}, -5)`)
    }

    if (axisVerticalLabelVisible) {
      labelY = yAxis
          .append('text')
          .attr('font-family', 'sans-serif')
          .attr('font-size', 10)
          .attr('class', 'labels')
          .text(axisVerticalLabel ? axisVerticalLabel : mapping.y.value)
          .attr("fill", "currentColor")
      labelY
          .attr("transform", `translate(${-labelY._groups[0][0].getBBox().width / 2}, 0)`)
    }


    return {labelX1, labelX2, labelY}
  }

  function createBars() {
    const bars1 = bounds
        .append('g')
        .attr('id', 'bars1')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', d => boundWidthOneChart / 2  - x1Scale(x1Accessor(d)))
        .attr('y', (d) => yScale(yAccessor(d)))
        .attr('height', yScale.bandwidth())
        .attr('width', (d) => x1Scale(x1Accessor(d)))
        //.attr('fill', "#3333ff")
        .attr('fill', (d) => colorScale1(d.x1))

    const bars2 = bounds
        .append('g')
        .attr('id', 'bars2')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', (boundWidth + spaceCommonAxis)  / 2)
        .attr('y', (d) => yScale(yAccessor(d)))
        .attr('height', yScale.bandwidth())
        .attr('width', (d) => x2Scale(x2Accessor(d)))
        //.attr('fill', "#ff5555")
        .attr('fill', (d) => colorScale2(d.x2))

    return {bars1, bars2}
  }
}
