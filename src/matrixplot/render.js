import * as d3 from 'd3'
// import { categoryLegend } from 'rawgraphs-core'

export function render(svgNode, data, visualOptions, mapping, originalData) {

  const {
    width = 500,
    height = 500,
    background='#ffffff',
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    padding,
    sortXAxisBy,
    sortYAxisBy,
    showLines, // TODO: add code for vertical and horizontal lines
    showLabels, // TODO: add labels
    labelsStyle // TODO: add labels styles
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
        background-color: ${background}
      }

			.tick > line {
				stroke: #e5e5e5;
			}
      `)

  let chartWidth = width - margin.left - margin.right;
  let chartHeight = height - margin.top - margin.bottom;

  // let's flatten the data array
  data = data.map(d => d[1])

  // sort data
  const rowsValues = d3.nest()
    .key(d => d.y)
    .rollup(v => d3.sum(v, d => d.size))
    .entries(data)

  const colsValues = d3.nest()
    .key(d => d.x)
    .rollup(v => d3.sum(v, d => d.size))
    .entries(data)

  switch(sortXAxisBy) {
  case "Total value (descending)":
    colsValues.sort((a,b) => d3.descending(a.value, b.value))
    break;
  case "Total value (ascending)":
    colsValues.sort((a,b) => d3.ascending(a.value, b.value))
    break;
  case "Name":
    colsValues.sort((a,b) => d3.ascending(a.key, b.key))
  }

  switch(sortYAxisBy) {
  case "Total value (descending)":
    rowsValues.sort((a,b) => d3.descending(a.value, b.value))
    break;
  case "Total value (ascending)":
    rowsValues.sort((a,b) => d3.ascending(a.value, b.value))
    break;
  case "Name":
    rowsValues.sort((a,b) => d3.ascending(a.key, b.key))
  }

  // first thing, understand if there are more rows or lines
  const rows = d3.map(rowsValues, d => d.key).keys()
  const cols = d3.map(colsValues, d => d.key).keys()
  const colorKeys = d3.map(data, d => d.color).keys()

  let cellSize;

  if(rows.length > cols.length){
    cellSize = (chartHeight - rows.length * padding) / rows.length;
    chartWidth = (cellSize + padding) * cols.length;
  } else {
    cellSize = (chartWidth - cols.length * padding) / cols.length;
    chartHeight = (cellSize + padding) * rows.length;
  }

  // const cellSize = rows.length > cols.length ? (chartHeight - rows.length * padding) / rows.length : (chartWidth - cols.length * padding) / cols.length;

  console.log(rows, cols, cellSize)

  const x = d3.scaleBand()
    .range([ 0, chartWidth ])
    .domain(cols)
    .padding(padding/cellSize); // d3 expects padding expressed in % (0-1)

  const y = d3.scaleBand()
    .range([ 0, chartHeight ])
    .domain(rows)
    .padding(padding/cellSize); // d3 expects padding expressed in % (0-1)

  const sizeScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.size)])
    .range([0, cellSize]);

  let colorScale;

  console.log(mapping.color)

  if(mapping.color.dataType == "string"){

    colorScale = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(colorKeys);
  } else if (mapping.color.dataType == "number") {
    colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain(d3.extent(data, d => d.color))
  }

  const svg = d3
    .select(svgNode)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "visualization")

	// add the X gridlines
	svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(" + (cellSize/2+2) + ",0)") // not clear why there is an offset of 2px
      .call(d3.axisTop(x)
        .tickSize(Math.round(-chartHeight))
				.tickSizeOuter(0)
      	.tickFormat("")
      )

  // add the Y gridlines
  svg.append("g")
      .attr("class", "grid")
			.attr("transform", "translate(0," + (cellSize/2+2) + ")") // not clear why there is an offset of 2px
      .call(d3.axisLeft(y)
          .tickSize(Math.round(-chartWidth))
					.tickSizeOuter(0)
          .tickFormat("")
      )

  svg.append("g")
    .style("font-size", 12)
    .call(d3.axisTop(x).tickSizeOuter(0))
    .selectAll("text")
      .style("text-anchor", "start")
      .attr("dx", "0.5em")
      .attr("transform", "rotate(-45)")

  svg.append("g")
    .style("font-size", 12)
    .call(d3.axisLeft(y).tickSizeOuter(0))

  svg.selectAll()
    .data(data)
    .enter()
    .append("rect")
      .attr("x", d => x(d.x) + (cellSize - sizeScale(d.size) )/2)
      .attr("y", d => y(d.y) + (cellSize - sizeScale(d.size) )/2)
      .attr("width", d => sizeScale(d.size))
      .attr("height", d => sizeScale(d.size))
      .style("fill", d => colorScale(d.color))
}
