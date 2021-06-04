import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

export function render(
  node,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
  // destructurate visual visualOptions
  const {
    // default options
    width,
    height,
    background,
    colorScale,
    // add below other options defined in visualOptions.js
  } = visualOptions

  // select the SVG element
  const svg = d3.select(node)
}
