import * as d3 from "d3";
// import { categoryLegend } from 'rawgraphs-core'

export function render(svgNode, data, visualOptions, mapping, originalData) {

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
    columnsNumber,
    useSameScale = false, // TODO: add
    sortSeriesBy = "Total value (descending)",
    gutter,
    //TODO add labels legends and colors
  } = visualOptions;

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  };

  // compute the series grid according to amount of series and user optionss
  const rowsNumber = Math.ceil(data.length/columnsNumber)

  const chartWidth = ((width - margin.left - margin.right) - (columnsNumber - 1) * gutter) / columnsNumber
  const chartHeight = ((height - margin.top - margin.bottom) - (rowsNumber - 1) * gutter) / rowsNumber

  let grid = data.map(function(d,i){

    const xpos = i%columnsNumber;
    const ypos =  Math.floor(i/columnsNumber);

    return {
      x: xpos * (chartWidth + gutter),
      y: ypos * (chartHeight + gutter),
      width: chartWidth,
      height: chartHeight
    }
  })

  // comupte max values for series
  // will add it as property to each series.

  data.forEach(function(serie){
    const serieName = serie[0]
    let serieValue = originalData.filter(item => item[mapping.series.value] == serieName).reduce((result, item) => result + item[mapping.y.value], 0)
    serie.maxVlaue = serieValue
  })
  // sort the dataset
  if(sortSeriesBy == "Total value (descending)"){
    data.sort((a,b) => d3.descending(a.maxVlaue, b.maxVlaue))
  } else if(sortSeriesBy == "Total value (ascending)") {
    data.sort((a,b) => d3.ascending(a.maxVlaue, b.maxVlaue))
  } else if(sortSeriesBy == "Name"){
    data.sort((a,b) => d3.ascending(a[0], b[0]))
  }

  // get domains
  const xDomain = d3.extent(originalData, d => d[mapping.x.value]) // calculate from original data, simpler.
  const yDomain = d3.extent(originalData, d => d[mapping.y.value]) // same as above

  // get list of unique strings for colors
  // we take them from mapped data since they could be aggregated.
  const colorKeysSet = new Set();
  data.forEach(serie => serie[1].forEach(line => colorKeysSet.add(line[1][0][1]['color']))) // the line[1][0][1] notation is due to the nested array structure
  const colorKeys = [...colorKeysSet]

  // create the scales
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(colorKeys); //TODO: use RAWGraphs color scales
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

  const vizLayer = svg
    .append("g")
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("id", (d) => d[0])
    .attr("transform", (d,i) => "translate(" + grid[i].x + "," + grid[i].y + ")")
    .attr("fill", "none")
    .attr("stroke-width", strokeWidth)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");

  const axisLayer = vizLayer.append("g").attr("id", "axes")
    axisLayer.append("g").call(xAxis);
    axisLayer.append("g").call(yAxis);

  const groups = vizLayer
    .append("g")
    .attr("id", "viz")
    .selectAll("g")
    .data((d) => d[1])
    .join("g")
	.attr('id', (d) => d[0])

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
