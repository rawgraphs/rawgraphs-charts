# Adding a chart

While RAWGraphs API allows you to define your own chart in several ways, in this repository we adopt a strict structure to ensure readability.

Differently from other great projects out there, RAWGraphs does not come with a strict framework to write charts. In RAWGraphs, charts can be written as you prefer. Instead, what RAWGraphs requires is some specification on how to build the necessary interface to let users transform their data and control some visual aspects of the chart.

## The anatomy of a chart in rawgraphs-charts

Each chart is enclosed in a folder in the `src/` folder.

It is composed by eight files:

* **index.js** exporting the chart;
* **metadata.js** describes the chart;
* **dimensions.js** describes the data dimensions needed by the chart (e.g. "X Axis", "Size", "Color")
* **mapping.js** contains the code to tranform the data in the needed format. Mapping ***must*** always return a flat array of objects.
* **visualOptions.js** describes all the visual options related to the chart (e.g. width, minimum dots size, sorting options etc.)
* **render.js** containt the code needed to draw the chart.
* **\<chartName\>.js**: exports the chart.
* **\<chartName\>.svg**: contains the icon that will be shown in the interface.
* **\<chartName\>_thumb.svg**: contains the thumbnail that will be shown in the interface.

## Getting started

If you have not done this yet, please clone the `rawgraphs-charts` repository on your machine and follow the instructions to install dependencies.

First of all, open the `src/` directory and make a copy of the `empty_chart` directory and all the contained files.

Rename the folder as you prefer (e.g. myChart). Rename as well the file `empty_chart.js` with the same name (e.g. myChart.js).

Now you should have the following structure:

```
src
└── myChart
    ├── dimensions.js
    ├── myChart.js
    ├── index.js
    ├── metadata.js
    ├── render.js
    └── visualOptions.js
```

Let's start from the simple things.

#### 1. bootstrapping the chart

In the `index.js` file, update the name of the folder:

```javascript
export { default } from './myChart'
```

#### 2. Adding metadata

in the `metadata.js` file, you can add a name, a description, add a code link and a tutorial one. It's important to define a **unique id** that will be used by the RAWGraphs app to save projects.

```javascript
export const metadata = {
  name: 'My Amazing Chart',
  id: 'rawgraphs.myChart001',
  category: 'Dispersions, Propotions',
  description: 'a very simple scatterplot',
  code: 'https://observablehq.com/',
  tutorial: 'https://rawgraphs.io/learning/',
}
```

#### 3. define data dimensions

Now tht we set up the chart, we can define its beahviours. The first thing is to define which data dimensions the cart requires. For example, we want to create a simple scatterplot: we will need an `x` and a `y` value for each point we want to plot, and a `color` to fill it..

In the `dimensions.js` file we can add dimensions according to the [RAWGraphs-core API]():

```javascript
export const dimensions = [
  {
    id: 'x',
    name: 'x axis',
    validTypes: ['number'],
    required: true,
  },

  {
    id: 'y',
    name: 'y axis',
    validTypes: ['number'],
    required: true,
  },
  
  {
    id: 'color',
    name: 'Color',
    validTypes: ['number', 'date', 'string'],
    required: false,
  },
]
```

With the above code we are defining three dimensions: `x` and `y` that are compulsory and accept only numbers, and a third one `colors` tht accept any data type.  For each dimension we define,  the RAWGraphs frontend will create a GUI component to let the user associate one or more columns to that dimension.

For each dimension the `id` will be used in the code to refer to such variables. The `name` is used to render the app interface. `ValidTypes` defines wich data types are accepted (numbers, strings, dates, see the [API references](https://observablehq.com/)).

Dimensions can have additional informations, such as if it's possible to map more than one column per dimension or if the values can be aggregated and how. See the [API references](https://observablehq.com/) for a complete description.

#### 4. Define mapping

The next step is to define how the data should be transformed to be used in the chart.

RAWGraphs requires a plain table as input and as output. To make an example, let's say we want to show budget and box office with our scatterplot. The input table will have a structure like:

| Movie              | Budget | Box Office | Genre  |
| ------------------ | ------ | ---------- | ------ |
| Gone with the Wind | 3.9    | 402        | Drama  |
| Avatar             | 237    | 2790       | Action |

and we want to obtain the following dataset:

| x    | y    | color  |
| ---- | ---- | ------ |
| 3.9  | 402  | Drama  |
| 237  | 2790 | Action |

[RAWGraphs-core API]() allows to define how the input datasource should be reworked. In our case, we just want to get the dimension that the user mapped as `x `,  `y` and `color` without any transformation.

In the `mapping.js` file we should write:

```javascript
export const mapData = {
  x: 'get',
  y: 'get',
  color: 'get',
}
```

For more elaborate kind of mapping, plese read the [API documentation]().

At this point, you can start to test your chart in the sandbox, see the section [Test the chart in the sandbox](#test-the-chart-in-the-sandbox) if you prefer to see live the results of your operations.

#### 5. Define visual options

Visual options define those variables that we want to expose to the users to allow them to customize the visualization (e.g. width, height, radius, paddings, colors, ...). Any time we want to let the user control one of these aspect we can create an option. Similarly to dimensions, RAWGraphs frontend will create an appropriate GUI element to let the user control that property.

by default, each chart has a `width`, `height` and `background` property already set up.

In our example we can expose the dots radius and colors as visual options.

In the `visualOptions.js` file we should add: 

```javascript
export const visualOptions = {

  dotsRadius: {
    type: 'number',
    label: 'Dots radius',
    default: 5,
    group: 'chart',
  },
  
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'color',
  },
}
```

RAWGraphs allows four kind of options: number, text lists, boolean values, color scales.

Visual options can be enabled according to the value of another option, or can be repeated for dimensions allowing multiple values.

Furthermore, `colorScale` options have a slightly different syntax sicne you must define on which dimension it is based on (in our case, the `color` dimension).

For a complete desription please refer to the [API documentation]().

#### 6. Draw your chart

Now that we have all the needed information to render a chart, we can write the code that will create the visual output.

In render.js we can see its skeleton:

```javascript
import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

export function render(node, data, visualOptions, mapping, originalData, styles) {
  // do stuff
}
```

As you cna see by default we import d3.js and a couple of utilities from RAWGraphs, but you are not forced to do so - you can use vanilla javascript or any other library in the chart.

The render function indeed will  provide a DOM `node` (by default an SVG), the data, the visual options, and the mapping options defined by the user.

Withing the given node you can do whatever you want.

For our example, we will use [d3.js](https://d3js.org/) to create the simple scatterplot.

inside the `render` function first of all we destructurate the visual options and select the node:

```javascript
export function render(node, data, visualOptions, mapping) {
  // destructurate visual visualOptions
  const {
    // default options
    width,
    height,
    background,
    dotsRadius,
  } = visualOptions

  // select the SVG element
  const svg = d3.select(node)
} 
```

let's now add a rectangle proportional to the dimensions defined by the user and filled with the background color:

```javascript
svg
  .append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', background)
```

Let's create two scales and use them to plot the dots using the data provided by the render function:

```javascript
let xScale = d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.x))
  .rangeRound([0, width])
  .nice()

let yScale = d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.y))
  .rangeRound([height, 0])
  .nice()

svg
  .selectAll('circle')
  .data(data)
  .join('circle')
  .attr('cx', (d) => xScale(d.x))
  .attr('cy', (d) => yScale(d.y))
  .attr('r', dotsRadius)
  .attr('fill', (d) => colorScale(d.color))
```

#### 7. Add a legend

RAWGraphs provide an utility to easily create legends. To use it, import it at the beginning of your code:

```javascript
import { legend } from '@rawgraphs/rawgraphs-core'
```

and in the `render` function:

```js
const legendLayer = svg
  .append('g')
  .attr('id', 'legend')
  .attr('transform', `translate(${10},${10})`)

// if color is mapped, create the legend
if (mapping.color.value) {
  // create the legend object
  const chartLegend = legend().legendWidth(200)
  //add color to the legend
  chartLegend.addColor(mapping.color.value, colorScale)
  // render the legend
  legendLayer.call(chartLegend)
}
```

Legend width and position can be exposed as visual variable (see section [5. Define visual variables](#5-define-visual-options))

#### 8. Add styles

Finally, RAWGraphs bring some built-in styles that you can use in your chart. To use them, at the beginning of your chart code improt them:

```javascript
import '../d3-styles.js'
```

You can find the styles in the `src/styles/base.css`. even if it's a CSS file, RAWGprahs parse it as a Javascript object and therefore is not possible to use complex css selectors. Furthermore, even if they are described as classes they are not applied as classes but as inline code. In this way it's possible to export the SVG and open it in any vector editor without losing the styles.

Let's add a title to our visualisation. In the `render` function, add:

```javascript
svg
  .append('text')
  .attr('x', 10)
  .attr('y', 20)
  .text('My chart')
  .styles(styles.seriesLabel)
```

#### 9. Export your chart for RAWGraphs app

Finally, to use the chart in the rawgraphs app you must add it to the file `src/index.js`:

```javascript
export { default as myChart } from './myChart'
```

you can test locally in the sandbox environment bu following the steps in next section, or otherwise you can test it in the RAWGraphs app by following the [instruction in the main readme file](https://github.com/rawgraphs/rawgraphs-charts/tree/docs#creating-a-build-and-using-locally-in-rawgraphs-app).

## Test the chart in the sandbox

Sandbox is an environment built-in in charts that allows you to load configurations and see in real time the result of your coding.

### Create a configuration

A configuration is a JSON file containg all the choices that the user can make using the [RAWGraphs app](https://github.com/rawgraphs/rawgraphs-app) interface.

To add a new configuration, browse the `example/configurations` folder.

Create a new file (e.g. `myChart_test.js`).

First of all, you must load a test dataset. You can find some in the `example/datasets` folder or you can add your own. for this example we will use the movies dataset provided by RAWGraphs.  To import it write:

```javascript
import data from '../datasets/Movies.tsv'
```

Now let's import our chart:

```javascript
import chart from 'rawcharts/myChart'
```

Finally, let's define the configuration:

```javascript
export default {
  chart,
  data,
  dataTypes: {
    Year: {
      type: 'date',
      dateFormat: 'YYYY',
    },
    'Box Office (Millions, adjusted for inflation)': 'number',
    'Budget (Millions, adjusted for inflation)': 'number',
    Rating: 'number',
    Title: 'string',
    Genre: 'string',
  },
  mapping: {
    x: { value: ['Budget (Millions, adjusted for inflation)'] },
    y: { value: ['Box Office (Millions, adjusted for inflation)'] },
    color: { value: ['Genre'] },
  },
  visualOptions: {
    width: 800,
    height: 600,
    background: 'salmon',
    dotsRadius: 10,
  },
}
```

`dataTypes` define the data type for each column in the dataset.

`mapping` defines which columns of the dataset are mapped on the data dimensions defined by the chart (see section [3. define data dimensions](#3-define-data-dimensions))

`visualOptions` defines the visual options provided by the chart (see section [5. Define visual options](#5-define-visual-options)).

### Activate the sandbox

To activate the sandbox, after installing NPM dependencies, open the folder containing the rawgraphs-charts repository in the terminal and run:

```shell
npm run sandbox
```

It will create a localhost running all the example configurations at the address http://localhost:9000.

## Creating a build and testing locally in RAWGraphs app

To test your work in the RAWGraphs app interface, you need to [clone and install dependecies for the RAWGraphs-app repo](https://github.com/rawgraphs/rawgraphs-app#instructions-mac-os).

In terminal, browse the folder containging `rawgraphs-charts` and create a build with the command:

```shell
npm run build
```

Then create a link with the command:

```shell
yarn link
```

Open the terminal and browse the folder containing rawgraphs-app, link the local chart with the command:

```shell
yarn link "@rawgraphs/rawgraphs-charts"
```

In `ragraphs-app` repository, import your new chart in the file `src/charts.js`:

```js
import {
  ...,
  myChart
} from '@rawgraphs/rawgraphs-charts'

// New charts, not included into first release.
// Comment at necessity.
let charts = [
  ...,
  myChart,
]
```

And test it locally by starting the app:

```shell
yarn start
```

Everytime you will create a new build of `rawgraphs-chart` your local version of `rawgraphs-app` will be updated.

