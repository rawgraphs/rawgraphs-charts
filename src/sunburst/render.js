import * as d3 from 'd3'

export function render(svgNode, data, visualOptions, mapping, originalData) {

  const {
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale
  } = visualOptions;

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }

  // define style
  d3.select(svgNode).append('style')
    .text(`
      svg {
        background-color: ${background};
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
      }
      `)

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const radius = chartWidth > chartHeight ? chartHeight/2 : chartWidth/2;

  // create the hierarchical structure
  const nest = d3.rollup(data, v => v[0], ...mapping.hierarchy.value.map(level => (d => d.hierarchy.get(level))))

  const hierarchy = d3.hierarchy(nest)
    .sum(d => d[1] instanceof Map ? 0 : d[1].size); // since maps have also a .size porperty, sum only values for leaves, and not for Maps

  const partition = nest => d3.partition() // copied from example of d3v6, not clear the meaning
    .size([2 * Math.PI, radius])
  (hierarchy)

  const root = partition(nest);

  const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1 - 1)

  const svg = d3
    .select(svgNode)

    svg.append("g")
      .attr("transform", `translate(${width / 2},${width / 2})`)
      .attr("fill-opacity", 0.6)
      .selectAll("path")
      .data(root.descendants().filter(d => d.depth))
      .join("path")
        .attr("fill", function(d){
          if('children' in d) {
            // if not leaf, check if leaves has the same value
            const childrenColors = [...new Set(d.leaves().map(l => l.data[1].color))]
            return childrenColors.length == 1 ? colorScale(childrenColors[0]) : 'gray'
          } else {
            // otherwise, if it's a leaf use its own color
            return(colorScale(d.data[1].color))
          }
        })
        .attr("display", d => d.data[0] != "" ? '' : 'none')
        .attr("d", arc)
        .append("title")
          .text(d => d.data[0])

    svg.append("g")
      .attr("transform", `translate(${width / 2},${width / 2})`)
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
    .selectAll("text")
    .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10)) // TODO: expose minimum text size filter
    .join("text")
      .attr("transform", function(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .text(d => d.data[0]) // TODO: expose labels mapping

}
