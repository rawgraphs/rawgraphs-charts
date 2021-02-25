# Good practices

This page aims at collecting some basic principles behind the creation of new charts.

## Legends

Legends can be created using the [legend module]() in rawgraphs-core.

The legend should be added by extending the artboard: if the user set a width of 800 px, and the legend width is 200 px, the total arboard size should be 1000px.

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

If you plan to add the ability to create small multiples 