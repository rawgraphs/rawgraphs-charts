import * as d3 from "d3";
// import { categoryLegend } from 'rawgraphs-core'

export function render(svgNode, data, visualOptions, mapping, originalData) {
  // console.log(mapping)
  //
  // const {
  //   width = 500,
  //   height = 500,
  //   background='#ffffff',
  //   xOrigin,
  //   yOrigin,
  //   maxRadius,
  //   showPoints,
  //   pointsRadius,
  //   showLegend,
  //   legendWidth,
  //   marginTop = 20,
  //   marginRight = 20,
  //   marginBottom = 20,
  //   marginLeft = 20
  // } = visualOptions;

  const {
    // artboard options
    width,
    height,
    background = "red",
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20,
    // chart options
    interpolation = "Cardinal",
    fillGaps = true,
    showPoints = true,
    pointsRadius = 3,
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

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // get string for colors
  const colorKeys = data.map(function (d) {
    const uniq = d3
      .map(d[1], (d) => d.color)
      .keys()
      .join(",");
    d[2] = uniq;
    return uniq;
  });

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(colorKeys);

  const xDomain = [
    d3.min(
      data.map(function (d) {
        return d3.min(d[1], (e) => e.x);
      })
    ),
    d3.max(
      data.map(function (d) {
        return d3.max(d[1], (e) => e.x);
      })
    ),
  ];

  const yDomain = [
    d3.min(
      data.map(function (d) {
        return d3.min(d[1], (e) => e.y);
      })
    ),
    d3.max(
      data.map(function (d) {
        return d3.max(d[1], (e) => e.y);
      })
    ),
  ];

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
      return x(d.x);
    })
    .y(function (d) {
      return y(d.y);
    })
    .curve(curveType[interpolation]); // TODO: use variables

  const svg = d3
    .select(svgNode)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "visualization");

  const axisLayer = svg.append("g").attr("id", "axis");

  axisLayer.append("g").call(xAxis);
  axisLayer.append("g").call(yAxis);

  const vizLayer = svg
    .append("g")
    .attr("id", "viz")
    .attr("fill", "none")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");

  const groups = vizLayer
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("stroke", (d) => colorScale(d[2]))
    .attr("fill", (d) => colorScale(d[2]));

  groups
    .append("path")
    .style("mix-blend-mode", "multiply")
    .attr("d", (d) => line(d[1]))
    .attr("fill", "none");

  if (showPoints) {
    groups
      .append("g")
      .selectAll("circle")
      .data((d) => d[1])
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", pointsRadius);
  }
}
