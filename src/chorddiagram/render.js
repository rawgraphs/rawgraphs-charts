/*
Chord Diagram mainly based on the documents by Mike Bostrock: 
https://observablehq.com/@d3/chord-diagram
https://observablehq.com/@d3/chord-dependency-diagram

And on the document from Yan Holtz:
https://d3-graph-gallery.com/graph/chord_axis_labels.html

Implementation of the Chord Diagram and the Porting to RawGraps2.0 is based on the implementation of the Arc Diagram:
https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/arcdiagram

and on the official instructions for adding a new card;
https://github.com/rawgraphs/rawgraphs-charts/blob/master/docs/add-a-new-chart.md
*/

import * as d3 from 'd3';

export function render(svgNode, data, visualOptions, mapping, originalData) {
  const {
    // artboard
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    //chart
    ringWidth,
    chordPadding,
    chordPaddingSource,
    chordPaddingTarget,
    chordColors,
    chordOpacity,
    showChordGroupLabels,
    fontSize,
    fontFamily,
  } = visualOptions

  const { names, matrix } = matrixFromData(data);

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const diameter = Math.min(innerWidth, innerHeight);
  const radius = diameter / 2;

  const translationX = innerWidth / 2 + marginLeft;
  const translationY = innerHeight / 2 + marginTop;

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
    .attr('transform', `translate(${translationX},${translationY})`)
    .attr('id', 'chord_diagram');

  const outerRadius = radius;
  const innerRadius = outerRadius - ringWidth;

  const chords = createChords(matrix, innerRadius);

  drawRing(svg, chords, innerRadius, outerRadius);
  drawChords(svg, chords, innerRadius);
  if (showChordGroupLabels) {
    drawGroupLabels(svg, chords, names, outerRadius);
  }

  function matrixFromData(data) {

    let names = Array.from(new Set(data.flatMap(entry => [entry.source, entry.target])));
    const numberOfNodes = names.length;

    const matrix = Array(numberOfNodes);
    for (let row = 0; row < numberOfNodes; row++) {
      matrix[row] = Array(numberOfNodes).fill(0);
    }

    for (let entry of data) {
      const sourceIndex = names.indexOf(entry.source);
      const targetIndex = names.indexOf(entry.target);
      const value = entry.value;
      matrix[sourceIndex][targetIndex] = value;
    }

    return { names, matrix };
  }

  function createChords(matrix, innerRadius) {
    const chords = d3.chordDirected()
      .padAngle(chordPadding / innerRadius)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending);
    return chords(matrix);
  }

  function drawRing(svg, chords, innerRadius, outerRadius) {

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    svg.append("g")
      .selectAll("g")
      .data(chords.groups)
      .join("g")
      .append("path")
      .attr("fill", (d) => chordColors(names[d.index]))
      .attr("d", arc)
  }

  function drawChords(svg, chords, innerRadius) {

    const ribbon = d3.ribbonArrow()
      .sourceRadius(() => innerRadius - chordPaddingSource)
      .targetRadius(() => innerRadius - chordPaddingTarget)

    svg.append("g")
      .attr("fill-opacity", chordOpacity)
      .selectAll("path")
      .data(chords)
      .join("path")
      .attr("fill", (d) => chordColors(names[d.source.index]))
      .attr("d", ribbon);
  }

  function drawGroupLabels(svg, chords, names, radius) {

    const labels = svg.append("g")
      .attr("font-size", fontSize)
      .attr("font-family", fontFamily)
      .selectAll("g")
      .data(chords.groups)
      .join("g");

    const groupLabels = labels.append("g")
      .selectAll("g")
      .data(d => [{ value: d.value, angle: (d.startAngle + d.endAngle) / 2 }])
      .join("g")
      .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${radius},0)`)
      .append("text")
      .attr("x", 8)
      .attr("dy", "0.35em")
      .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
      .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)

    labels.select("text")
      .attr("font-weight", "bold")
      .text(function (d) {
        return this.getAttribute("text-anchor") === "end"
          ? `↑ ${names[d.index]}`
          : `${names[d.index]} ↓`;
      });
  }
}