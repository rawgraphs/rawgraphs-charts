import * as d3 from 'd3'
// import { categoryLegend } from 'rawgraphs-core'

export function render(svgNode, data, visualOptions, mapping, originalData) {

	console.log('- render')

  const {
    width = 500,
    height = 500,
    background='#ffffff',
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    padding,
    rounding,
    sortXAxisBy,
    sortYAxisBy,
    showGrid,
    showLabels,
    label1Style,
    label2Style,
    label3Style,
    colorScale,
  } = visualOptions;



  const labelStyles = [label1Style, label2Style, label3Style];


  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }

  // define style
  d3.select(svgNode).append('style')
    .text(`
      #viz {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
      }

      #viz #axes path, #axes line {
        stroke:#161616
      }

      #viz .tick > line {
        stroke: #e5e5e5;
      }

      #viz .axisTitle {
        font-size: 12px;
        font-weight: bold;
        fill: #161616;
      }

			#viz .labels {
				font-size: 8px;
			}

			#viz .Primary {
				font-weight: bold;
			}

			#viz .Tertiary {
				font-weight: lighter;
				font-style: oblique;
			}
      `)

  let chartWidth = width - margin.left - margin.right;
  let chartHeight = height - margin.top - margin.bottom;

  // sort data
  let rowsValues = d3.rollups(data, v => d3.sum(v, d => d.size), d => d.y).map(d => ({key:d[0], value:d[1]}));

  const colsValues = d3.rollups(data, v => d3.sum(v, d => d.size), d => d.x).map(d => ({key:d[0], value:d[1]}));

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
  const rows = [...new Set(rowsValues.map(d =>d.key))]
  const cols = [...new Set(colsValues.map(d =>d.key))]

  let cellSize;

  if(rows.length > cols.length){
    cellSize = (chartHeight - rows.length * padding) / rows.length;
    chartWidth = (cellSize + padding) * cols.length;
  } else {
    cellSize = (chartWidth - cols.length * padding) / cols.length;
    chartHeight = (cellSize + padding) * rows.length;
  }

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

	// add background
	d3.select(svgNode)
		.append("rect")
		.attr("width", width)
		.attr("height", height)
		.attr("x", 0)
		.attr("y", 0)
		.attr("fill", background)
		.attr("id", "backgorund");

  const svg = d3
    .select(svgNode)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "viz")

  if(showGrid){
  // add the X gridlines
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + (cellSize/2+1) + ",0)") // not clear why there is an offset of 2px
        .call(d3.axisTop(x)
          .tickSize(Math.round(-chartHeight+1))
          .tickSizeOuter(0)
          .tickFormat("")
        )

    // add the Y gridlines
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + (cellSize/2+1) + ")") // not clear why there is an offset of 2px
        .call(d3.axisLeft(y)
            .tickSize(Math.round(-chartWidth+1))
            .tickSizeOuter(0)
            .tickFormat("")
        )
  }
 // add top x axis
  svg.append("g")
    .call(d3.axisTop(x).tickSizeOuter(0))
    .selectAll("text")
      .attr("dx", Math.sqrt(12)) // proportional to text size. @TODO we should use a variable.
      .attr("dy", Math.sqrt(12)) // proportional to text size. @TODO we should use a variable
      .attr("text-anchor", "start")
      .attr("transform", "rotate(-45)")

  // add left y axis
  svg.append("g")
    .call(d3.axisLeft(y).tickSizeOuter(0))
    .selectAll("text")
      // .attr("dy", cellSize/2)

  // add y axis title
  svg.append("text")
    .attr("dx", -9) // proportional to tick lines
    .attr("dy", -9) // proportional to tick lines
    .style("text-anchor", "end")
    .attr("class","axisTitle")
    .text(mapping.y.value)

  // add x axis title
  svg.append("text")
    .attr("x", (chartWidth+9)/Math.sqrt(2)) // proportional to tick lines
    .attr("y", (chartWidth+9)/Math.sqrt(2)) // proportional to tick lines
    .attr("dx", Math.sqrt(12)) // proportional to text size. @TODO we should use a variable.
    .attr("dy", -Math.sqrt(12)) // proportional to text size. @TODO we should use a variable.
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "start")
    .attr("class","axisTitle")
    .text(mapping.x.value)

  // draw squares or circles for each value
  svg.selectAll()
    .data(data)
    .enter()
    .append("rect")
      .attr("x", d => x(d.x) + (cellSize - sizeScale(d.size) )/2)
      .attr("y", d => y(d.y) + (cellSize - sizeScale(d.size) )/2)
      .attr("rx", rounding)
      .attr("ry", rounding)
      .attr("width", d => sizeScale(d.size))
      .attr("height", d => sizeScale(d.size))
      .style("fill", d => colorScale(d.color))


    let texts = svg.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
        .attr("y", d => y(d.y) + cellSize/2)


    texts.selectAll("tspan")
			.data(d => d.label.map(e => ({'string':e, 'x': x(d.x) + cellSize/2})))
			.join("tspan")
			.attr("text-anchor", "middle")
			.attr("x", d => d.x)
			.attr("dy", (d, i, n) => (i+1) * 8 - n.length / 2 * 8) // 12 is the font size, should be automated
			.attr("class", (d,i) => i<3? labelStyles[i] : labelStyles[2]) // if there are more than three
			.text(d => d.string);
}
