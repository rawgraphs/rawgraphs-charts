import * as d3 from 'd3'
import { legend, dateFormats, labelsOcclusion } from '@raw-temp/rawgraphs-core'
import '../d3-styles.js'
import Chart from 'chart.js'
import { color } from 'd3'

export function render(
  canvasNode,
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
    maxRadius,
    showStroke,
    showPoints,
    pointsRadius,
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

  // size scale
  const size = d3
    .scaleSqrt()
    .domain([0, d3.max(data, (d) => d.size)])
    .rangeRound([0, maxRadius])


  const ctx = canvasNode.getContext('2d')
  canvasNode.style.backgroundColor = background;

  const transformedData = {
    datasets: [{
      label: '',
      backgroundColor: data.map(d => colorScale(d.color)),
      data: data.map(d => ({
        ...d,
        r: size(d.size),
      }))
    }]
  }

  var myBubbleChart = new Chart(ctx, {
    type: 'bubble',
    data: transformedData,
    options: {
      responsive: true,
      animation: false,
      layout: {
        padding: {
          left: marginLeft,
          right: marginRight,
          top: marginTop,
          bottom: marginBottom,
        }
      }

    }
  });


}
