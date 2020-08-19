import * as d3 from 'd3'

export function render(svgNode, data, visualOptions, mapping, originalData) {

  console.log('sunburst',data)

  const {
    width = 500,
    height = 500,
    background='#ffffff',
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
  } = visualOptions;

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  }
  const chartWidth = width-margin.left-margin.right-(showLegend?legendWidth:0);
  const chartHeight = height-margin.top-margin.bottom;
}
