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
    rounding,
    sortXAxisBy,
    sortYAxisBy,
    showGrid,
    showLabels,
    label1Style,
    label2Style,
    label3Style, // TODO: add labels styles
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
      svg {
        background-color: ${background};
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
      }

      #axes path, #axes line {
        stroke:#161616
      }

      .tick > line {
        stroke: #e5e5e5;
      }

      .axisTitle {
        font-size: 12px;
        font-weight: bold;
        fill: #161616;
      }
      tspan.Primary {
        font-size: 8px;
        fill:red;
      }
      tspan.Secondary {
        font-size: 8px;
        fill:blue;
      }
      tspan.Tertiary {
        font-size: 8px;
        fill:green;
      }
      `)

  let chartWidth = width - margin.left - margin.right;
  let chartHeight = height - margin.top - margin.bottom;

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

  // let colorScaleOriginal;

  // if(mapping.color.dataType == "string"){

  //   colorScaleOriginal = d3.scaleOrdinal(d3.schemeCategory10)
  //     .domain(colorKeys);
  // } else if (mapping.color.dataType == "number") {
  //   colorScaleOriginal = d3.scaleSequential()
  //     .interpolator(d3.interpolateInferno)
  //     .domain(d3.extent(data, d => d.color))
  // }

  const svg = d3
    .select(svgNode)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "visualization")

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

  svg.append("g")
    .call(d3.axisTop(x).tickSizeOuter(0))
    .selectAll("text")
      .attr("dx", "0.5em")
      .attr("dy", cellSize)
      .attr("text-anchor", "start")
      .attr("transform", "rotate(-45)")

  svg.append("g")
    .call(d3.axisLeft(y).tickSizeOuter(0))
    .selectAll("text")
      .attr("dy", cellSize/2)

  svg.append("text")
    .attr("dx", -9)
    .style("text-anchor", "end")
    .attr("class","axisTitle")
    .text(mapping.y.value)

  svg.append("text")
    .attr("dx", -Math.sqrt(8))
    .attr("dy", -Math.sqrt(8))
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "start")
    .attr("class","axisTitle")
    .text(mapping.x.value)

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

  if(showLabels) {
    let texts = svg.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
        .attr("x", d => x(d.x) + (cellSize - sizeScale(d.size) )/2)
        .attr("y", d => y(d.y) + (cellSize - sizeScale(d.size) )/2)


    texts.selectAll("tspan")
        .data(d => d.label)
        .enter()
        .append("tspan")
        .attr("class", (d,i) => i<3? labelStyles[i] : labelStyles[2]) // if there are more than three
        .text(d => d)
  }
}
