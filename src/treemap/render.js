import * as d3 from 'd3'

export function render(svgNode, data, visualOptions, mapping, originalData) {
  console.log('- render')

  const {
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
    tiling,
    label1Style,
    label2Style,
    label3Style,
    padding,
    rounding,
    drawHierarchy,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const labelStyles = [label1Style, label2Style, label3Style]

  // define style
  d3.select(svgNode).append('style').text(`
      #viz {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
      }

			#viz .Primary {
				font-weight: bold;
			}

			#viz .Tertiary {
				font-weight: lighter;
				font-style: oblique;
			}

			#viz .ancestors {
				fill: none;
				stroke: gray
			}
      `)

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  const radius = chartWidth > chartHeight ? chartHeight / 2 : chartWidth / 2

  // create the hierarchical structure
  const nest = d3.rollup(
    data,
    (v) => v[0],
    ...mapping.hierarchy.value.map((level) => (d) => d.hierarchy.get(level))
  )

  const hierarchy = d3
    .hierarchy(nest)
    .sum((d) => (d[1] instanceof Map ? 0 : d[1].size)) // since maps have a .size porperty in native javascript, sum only values for leaves, and not for Maps

  //@TODO: understand how to handle empty values

  // convert string to d3 functions
  const tileType = {
    Binary: d3.treemapBinary,
    Dice: d3.treemapDice,
    Slice: d3.treemapSlice,
    'Slice and dice': d3.treemapSliceDice,
    Squarify: d3.treemapSquarify,
  }

  const treemap = (nest) =>
    d3
      .treemap()
      .tile(tileType[tiling])
      .size([chartWidth, chartHeight])
      .padding(padding)
      .round(rounding)(hierarchy)

  const root = treemap(nest)

  // add background
  d3.select(svgNode)
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')

  const svg = d3
    .select(svgNode)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('id', 'viz')

  // if selected, draw a rectangle for each level in the hierarchy
  // @TODO: understand if we want to add hierarchy names
  if (drawHierarchy) {
    const ancestors = svg
      .append('g')
      .attr('id', 'ancestors')
      .selectAll('rect')
      .data(root.descendants())
      .join('rect')
      .attr('x', (d) => d.x0)
      .attr('y', (d) => d.y0)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('class', 'ancestors')
  }

  const leaves = svg
    .append('g')
    .attr('id', 'leaves')
    .selectAll('g')
    .data(root.leaves())
    .join('g')
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`)

  leaves.append('title').text((d) => d.data[0])

  leaves
    .append('rect')
    .attr('id', (d, i) => 'path' + i)
    .attr('fill', (d) => colorScale(d.data[1].color))
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)

  leaves
    .append('clipPath')
    .attr('id', (d, i) => 'clip' + i)
    .append('use')
    .attr('xlink:href', (d, i) => '#path' + i)

  leaves
    .append('text')
    .attr('clip-path', (d, i) => 'url(#clip' + i + ')')
    .selectAll('tspan')
    .data((d) => d.data[1].label)
    .join('tspan')
    .attr('x', 3)
    .attr('y', (d, i) => (i + 1) * 12) // 12 is the font size, should be automated
    .attr('class', (d, i) => (i < 3 ? labelStyles[i] : labelStyles[2])) // if there are more than three
    .text((d) => d)
}
