import * as d3 from "d3";
// import { categoryLegend } from 'rawgraphs-core'

export function render(svgNode, data, visualOptions, mapping, originalData) {
  const {
    width,
    height,
    background,
    xOrigin,
    yOrigin,
    maxRadius,
    showPoints,
    pointsRadius,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
  } = visualOptions;

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  };
  const chartWidth =
    width - margin.left - margin.right - (showLegend ? legendWidth : 0);
  const chartHeight = height - margin.top - margin.bottom;

  // x scale
  const xDomain = xOrigin
    ? [0, d3.max(data, (d) => d.x)]
    : d3.extent(data, (d) => d.x);

  const x =
    mapping.x.dataType.type === "date" ? d3.scaleTime() : d3.scaleLinear();

  x.domain(xDomain).rangeRound([0, chartWidth]);

  // y scale
  const yDomain = yOrigin
    ? [0, d3.max(data, (d) => d.y)]
    : d3.extent(data, (d) => d.y);

  const y =
    mapping.y.dataType.type === "date" ? d3.scaleTime() : d3.scaleLinear();

  y.domain(yDomain).rangeRound([chartHeight, 0]);

  // size scale
  const size = d3
    .scaleSqrt()
    .domain([0, d3.max(data, (d) => d.size)])
    .rangeRound([0, maxRadius]);

  const xAxis = (g) => {
    return g
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
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
          .append("text")
          .attr("font-family", "sans-serif")
          .attr("font-size", 12)
          .attr("x", 4)
          .attr("fill", "black")
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .attr("dominant-baseline", "hanging")
          .text(mapping["y"].value)
      );
  };

  const artboardBackground = d3
    .select(svgNode)
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
    .attr("id", "visualization");

  const axisLayer = svg.append("g").attr("id", "axis");

  axisLayer.append("g").call(xAxis);
  axisLayer.append("g").call(yAxis);

  const vizLayer = svg.append("g").attr("id", "viz");

  vizLayer
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => x(d.x))
    .attr("cy", (d) => y(d.y))
    .attr("fill", (d) => {
      return mapping.color ? colorScale(d.color) : "grey";
    })
    .attr("r", (d) => {
      return mapping.size ? size(d.size) : maxRadius;
    });

  const pointsLayer = svg.append("g").attr("id", "points");

  pointsLayer
    .selectAll("circle")
    .data(showPoints ? data : [])
    .join("circle")
    .attr("cx", (d) => x(d.x))
    .attr("cy", (d) => y(d.y))
    .attr("fill", "black")
    .attr("r", pointsRadius);

  const labelsLayer = svg.append("g").attr("id", "labels");

  labelsLayer
    .selectAll("text")
    .data(mapping.label ? data : [])
    .join("text")
    .attr("dy", "0.35em")
    .attr("x", (d) => x(d.x))
    .attr("y", (d) => y(d.y))
    .attr("font-family", "Arial, sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .text((d) => (Array.isArray(d.label) ? d.label.join(", ") : d.label));

  if (showLegend) {
    // const legendLayer = d3.select(svgNode).append("g").attr("id", "legend")
    //   .attr("transform", `translate(${width-legendWidth},${margin.top})`)
    //
    // d3.select(legendSvg).html(null)
    // const externalSvg = d3.select(legendSvg).append("g").attr("id", "legendSvg")
    //   .attr("transform", `translate(0,20)`)
    //
    // if(mapping.color){
    //   const legendColor = d3Legend.legendColor()
    //     .titleWidth(legendWidth)
    //     .scale(color)
    //     .title(mapping.color.value)
    //     .labelOffset(5)
    //     .labelWrap(legendWidth-20)
    //
    //   if(mapping.color.dataType === "string"){
    //     legendColor
    //       .cells(colorDomain.length)
    //       .labels(colorDomain)
    //    }
    //
    //   externalSvg.call(legendColor).call(g=>{
    //     g.selectAll("text")
    //       .attr("font-family","Arial, sans-serif")
    //       .attr("font-size", 12)
    //     g.select(".legendTitle").attr("font-weight", "bold")
    //    })
    // }
    //
    // legendLayer.node().appendChild(legendSvg)
  }
}
