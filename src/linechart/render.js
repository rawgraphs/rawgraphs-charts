import * as d3 from "d3";
// import { categoryLegend } from 'rawgraphs-core'

export function render(svgNode, data, visualOptions, mapping, originalData) {

	const singleData = data[0] //for now no series

  const {
    // artboard options
    width,
    height,
    background,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20,
    // chart options
    interpolation,
    showPoints,
    pointsRadius,
    strokeWidth,
    // series options
    columnsNumber = 2,
    useSameScale = false,
    sortSeriesBy = "Total value (descending)",
    gutter = 2,
    //TODO add labels legends and colors
  } = visualOptions;

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  };

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // const rowsNumber = Math.ceil(data.length/columnsNumber)
  //
  // const chartWidth = ((width - margin.left - margin.right) - (columnsNumber - 1) * gutter) / columnsNumber
  // const chartHeight = ((height - margin.top - margin.bottom) - (rowsNumber - 1) * gutter) / rowsNumber
  //
  // let grid = data.map(function(d,i){
  //
	//   const xpos = Math.floor(i/rowsNumber);
	//   const ypos = i%rowsNumber;
  //
	//   return {
	// 	  x: xpos * (chartWidth + gutter),
	// 	  y: ypos * (chartHeight + gutter),
	// 	  width: chartWidth,
	// 	  height: chartHeight
	//   }
  // })

  // get domains
  const xDomain = d3.extent(originalData, d => d[mapping.x.value]) // calculate from original data, simpler.
  const yDomain = d3.extent(originalData, d => d[mapping.y.value]) // same as above

  // get list of unique strings for colors
  // we take them from mapped data since they could be aggregated.
  const colorKeysSet = new Set();
  data.forEach(serie => serie[1].forEach(line => colorKeysSet.add(line[1][0][1]['color']))) // the line[1][0][1] notation is due to the nested array structure
  const colorKeys = [...colorKeysSet]

  // create the scales
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(colorKeys);
  const x = d3.scaleLinear().domain(xDomain).nice().range([0, chartWidth]);
  const y = d3.scaleLinear().domain(yDomain).nice().range([chartHeight, 0]);

  const xAxis = (g) => {
    return g
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x).ticks(width / 80))
      .call((g) =>
        g
          .append("text")
          .attr("font-family", "Arial, sans-serif")
          .attr("font-size", 12)
          .attr("x", chartWidth)
          .attr("dy", -5)
          .attr("fill", "black")
          .attr("font-weight", "bold")
          .attr("text-anchor", "end")
          .text(mapping["x"].value)
      );
  };

  const yAxis = (g) => {
    return g
      .call(d3.axisLeft(y))
      .call((g) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("font-family", "sans-serif")
          .attr("font-size", 12)
          .attr("x", 4)
          .attr("fill", "black")
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .text(mapping["y"].value)
      );
  };

  // convert string to d3 functions
  const curveType = {
    Basis: d3.curveBasis,
    Bundle: d3.curveBundle,
    Cardinal: d3.curveCardinal,
    "Catmull–Rom": d3.curveCatmullRom,
    Linear: d3.curveLinear,
    "Monotone X": d3.curveMonotoneX,
    Natural: d3.curveNatural,
    Step: d3.curveStep,
    "Step After": d3.curveStepAfter,
    "Step Before": d3.curveStepBefore,
  };

  const line = d3
    .line()
    .x(function (d) {
      return x(d[1].x);
    })
    .y(function (d) {
      return y(d[1].y);
    })
    .curve(curveType[interpolation]);

  // define SVG background color
  d3.select(svgNode).attr("style","background-color:"+background);

  const svg = d3
    .select(svgNode)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "visualization")

  const axisLayer = svg.append("g").attr("id", "axis");

  axisLayer.append("g").call(xAxis);
  axisLayer.append("g").call(yAxis);

  // const gridLayer = svg
  // 	.append("g")
	// .selectAll("rect")
	// .data(grid)
	// .join("rect")
	// .attr("x", (d) => d.x)
	// .attr("y", (d) => d.y)
	// .attr("width", (d) => d.width)
	// .attr("height", (d) => d.height)
	// .attr("fill", "none")
	// .attr("stroke", "gray")

  const vizLayer = svg
    .append("g")
    .attr("id", "viz")
    .attr("fill", "none")
    .attr("stroke-width", strokeWidth)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");

	//understand how to create a line for each entry in the dataset

  const groups = vizLayer
    .selectAll("g")
    .data(data[0][1])
    .join("g")

  groups
    .append("path")
    .style("mix-blend-mode", "multiply")
    .attr("d", (d) => line(d[1].sort((a, b) => d3.descending(a[0], b[0]))))
    .attr("stroke", (d) => colorScale(d[1][0][1]['color']))
    .attr("fill", "none");

  if (showPoints) {
    groups
      .append("g")
      .selectAll("circle")
      .data((d) => d[1])
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d[1].x))
      .attr("cy", (d) => y(d[1].y))
      .attr("r", pointsRadius)
      .attr("fill", (d) => colorScale(d[1]['color']));
  }
}
