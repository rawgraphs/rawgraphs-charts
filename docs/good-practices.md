# Good practices

This page aims at collecting some basic principles behind the creation of new charts.

## Legends

Legends can be created using the [legend module]() in rawgraphs-core.

The legend should be added by extending the artboard: if the user set a width of 800 px, and the legend width is 200 px, the total arboard size should be 1000px.

You can see [how we handle them in buble](https://github.com/rawgraphs/rawgraphs-charts/blob/master/src/bubblechart/render.js#L224) chart as example.

All the options related to legends should be contained in the "Artboard" panel.

By default we suggest to provide the following visual options:

```javascript
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard',
  },

  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
    container: 'width',
    containerCondition: {
      showLegend: true,
    },
  },
```

the first option allow the user to show the label, and the second one to define its width.

## Define Styles in the Chart (No External CSS)

In order to include all the styles within the SVG code and allow the users to export exactly what they are looking at in RAWGraphs, external CSS styles cannot be used. Every style or attribute declaration has to be explicitly defined in the draw function (i.e. through [.style](https://github.com/d3/d3-selection#selection_style) or [.attr](https://github.com/d3/d3-selection#selection_attr) D3's operators).

Styles present in many charts can be added to the `src/styles/base.css` file and used in the chart using the `d3-styles`module provided by `rawgraphs-charts`.

To use it, import it in the chart:

```js
import '../d3-styles.js'
```

It will extend D3 allowing the usage of styles, for example you can add a text and then apply one of the styles defined in `src/styles/base.css`:

```js
svg
  .append('text')
  .attr('x', 10)
  .attr('y', 20)
  .text('My chart')
  .styles(styles.seriesLabel)
```

## Avoid interaction in the render function

Adding interactions to the chart doesn't make too much sense in RAWGraphs since it's meant for producing static visualizations.

Every time the user changes mapping or options the render function is called again redrawing the visualization.

Furthermore, when you export the `.rawgraphs` there is no way to keep track of the user interaction.

## Series (small multiples)

If you plan to add the ability to create small multiples you should use the [d3-gridding module](https://github.com/romsson/d3-gridding).

As dimension, expose it as "series":

```js
{
  id: 'series',
  name: 'Series',
  validTypes: ['number', 'string', 'date'],
  required: false,
  operation: 'get',
},
```

D3-gridding is already included in the NMP package, to use it you must first of all import it:

```js
import * as d3Gridding from 'd3-gridding'
```

in the `render` function, first of all nest the data according to series:

```js
const nestedData = d3
  .groups(data, (d) => d.series)
```

Then set up the grid:

```js
const gridding = d3Gridding
    .gridding()
    .size([width, height])
    .mode('grid')
    .padding(0)
    .cols(mapping.series.value ? columnsNumber : 1)
```

And then add to the svg node the gridding:

```js
const svg = d3.select(svgNode)
  .append('g')
  .attr('id', 'viz')

const series = svg
  .selectAll('g')
  .data(griddingData)
  .join('g')
  .attr('id', (d) => d.data[0])
  .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
```

Now you can add the chart code inside an [each loop](https://github.com/d3/d3-selection#selection_each) as the following one:

```js
series.each(function (d, seriesIndex) {
  // make a local selection for each serie
  const selection = d3
    .select(this)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  
  // compute each serie width and height
  const seriesWidth = d.width - margin.right - margin.left
  const seriesHeight = d.height - margin.top - margin.bottom
  
  const seriesData = d.data
}
```

Note that margins must be applied inside each selection, and not to the whole SVG.