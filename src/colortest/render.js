import * as d3 from 'd3'
// import { color } from 'd3';
// import { categoryLegend } from 'rawgraphs-core'

export function render(svgNode, data, visualOptions, mapping, originalData) {
  const {
    width = 500,
    height = 500,
    background = '#ffffff',
    colorScale,
  } = visualOptions

  const samples = colorScale.ticks ? colorScale.ticks() : colorScale.domain()

  const sampleHeight = height / samples.length

  const svg = d3.select(svgNode)
  const vizLayer = svg.append('g').attr('id', 'viz')

  vizLayer
    .selectAll('rect')
    .data(samples)
    .join('rect')
    .attr('width', width)
    .attr('height', sampleHeight)
    .attr('y', (d, i) => i * sampleHeight)
    .attr('stroke', '#222')
    .attr('fill', (d) => {
      const col = colorScale(d)
      return col
    })
}
