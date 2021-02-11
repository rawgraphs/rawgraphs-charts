import * as d3 from 'd3'
import * as d3Contour from 'd3-contour'
import { legend, dateFormats, labelsOcclusion } from '@raw-temp/rawgraphs-core'
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
    radius,
    showPoints,
    pointsRadius,
    bandwidth,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
    showBandLabels,
    showLabelsOutline,
    autoHideLabels,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // x scale
  const xDomain = xOrigin
    ? [0, d3.max(data, (d) => d.x)]
    : d3.extent(data, (d) => d.x)

  const x =
    mapping.x.dataType.type === 'date' ? d3.scaleTime() : d3.scaleLinear()

  x.domain(xDomain).rangeRound([0, chartWidth]).nice()

  // y scale
  const yDomain = yOrigin
    ? [0, d3.max(data, (d) => d.y)]
    : d3.extent(data, (d) => d.y)

  const y =
    mapping.y.dataType.type === 'date' ? d3.scaleTime() : d3.scaleLinear()

  y.domain(yDomain).rangeRound([chartHeight, 0]).nice()

  const xAxis = (g) => {
    return g
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .call((g) =>
        g
          .append('text')
          .attr('x', chartWidth)
          .attr('dy', -5)
          .attr('text-anchor', 'end')
          .text(mapping['x'].value)
          .styles(styles.axisLabel)
      )
  }

  const yAxis = (g) => {
    return g
      .call(d3.axisLeft(y))
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

  const artboardBackground = d3
    .select(svgNode)
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'background')

  const svg = d3
    .select(svgNode)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('id', 'visualization')

  const axisLayer = svg.append('g').attr('id', 'axis')

  axisLayer.append('g').call(xAxis)
  axisLayer.append('g').call(yAxis)

  const vizLayer = svg.append('g').attr('id', 'viz')

  const contours = d3Contour
    .contourDensity()
    .x((d) => x(d.x))
    .y((d) => y(d.y))
    .size([chartWidth, chartHeight])
    //.thresholds(10)
    .bandwidth(bandwidth)(data)

  const labelsLayer = svg.append('g').attr('id', 'labels')
  const labelThreshold = 5
  const steps = 40
  contours.forEach((cont, index) => {
    if (index % labelThreshold === 0) {
      cont.coordinates.forEach((polygon) => {
        polygon.forEach((ring, j) => {
          const p = ring.slice(1, Infinity),
            // best number of steps to divide ring.length
            possibilities = d3.range(steps, steps * 1.4),
            scores = possibilities.map((d) => -((p.length - 1) % d)),
            n = possibilities[d3.scan(scores)],
            // best starting point: bottom for first rings, top for holes
            start =
              1 + (d3.scan(p.map((xy) => (j === 0 ? -1 : 1) * xy[1])) % n),
            margin = 2

          p.forEach((xy, i) => {
            if (
              i % n === start &&
              xy[0] > margin &&
              xy[0] < chartWidth - margin &&
              xy[1] > margin &&
              xy[1] < chartHeight - margin
            ) {
              const a = (i - 2 + p.length) % p.length,
                b = (i + 2) % p.length,
                dx = p[b][0] - p[a][0],
                dy = p[b][1] - p[a][1]
              if (dx === 0 && dy === 0) return

              // add the label's contour to the path stroke clip
              // mask
              //   .append("circle")
              //   .attr("r", 1.3)
              //   .attr("fill", "black")
              //   .attr("transform", `translate(${xy})`);

              //addlabel(labelsLayer, `${index}`, xy, Math.atan2(dy, dx))
              const angle =
                (Math.cos(Math.atan2(dy, dx)) < 0 ? Math.PI : 0) +
                Math.atan2(dy, dx)

              labelsLayer
                .append('text')
                //.attr('fill', '#fff')
                .attr('stroke', 'none')
                .attr('text-anchor', 'middle')
                .attr('dy', '0.3em')
                .attr(
                  'transform',
                  `translate(${xy})rotate(${(angle * 180) / Math.PI})`
                )
                .text(cont.value)
                .styles(styles.labelSecondary)
                .styles(styles.labelOutline)
            }
          })
        })
      })
    }
  })

  const contourBand = vizLayer.selectAll('g').data(contours).join('g')

  contourBand
    .append('path')
    .attr('fill', (d) => colorScale(d.value))
    .attr('stroke', (d) => d3.lab(colorScale(d.value)).darker(1))
    .attr('stroke-opacity', (d, i) => (i % labelThreshold === 0 ? 1 : 0.3))
    .attr('d', d3.geoPath())

  if (showPoints) {
    // hex
    //   .selectAll('circle')
    //   .data((d) => d)
    //   .join('circle')
    //   .attr('cx', (d) => x(d.x))
    //   .attr('cy', (d) => y(d.y))
    //   .attr('fill', 'black')
    //   .attr('r', pointsRadius)
  }

  if (showBandLabels) {
    // hex
    //   .append('text')
    //   .attr('text-anchor', 'middle')
    //   .attr('dominant-baseline', 'middle')
    //   .attr('x', (d) => d.x)
    //   .attr('y', (d) => d.y)
    //   .text((d) => d.length)
    //   .styles(styles.labelSecondary)
  }

  if (showLabelsOutline) {
    // NOTE: Adobe Illustrator does not support paint-order attr
    //hex.selectAll('text').styles(styles.labelOutline)
  }

  // if (showLegend) {
  //   const legendLayer = d3
  //     .select(svgNode)
  //     .append('g')
  //     .attr('id', 'legend')
  //     .attr('transform', `translate(${width},${marginTop})`)

  //   const chartLegend = legend().legendWidth(legendWidth)

  //   if (mapping.color.value) {
  //     chartLegend.addColor(mapping.color.value, colorScale)
  //   }

  //   if (mapping.size.value) {
  //     const legendSizeScale = size.copy()
  //     legendSizeScale
  //       .domain(d3.extent(data, (d) => d.size))
  //       .rangeRound([size(d3.min(data, (d) => d.size)), maxRadius])

  //     chartLegend.addSize(mapping.size.value, legendSizeScale, 'circle')
  //   }

  //   legendLayer.call(chartLegend)
  // }
}
