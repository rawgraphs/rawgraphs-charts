# RAWGraphs Charts

This repo contains all the visual models used in [RAWGraphs app](https://github.com/rawgraphs/rawgraphs-app). It uses the [RAWGraphs core](https://github.com/rawgraphs/rawgraphs-core) API to define charts behaviours.

The repository contains also a sandbox enviroment to test directly the charts in development. 

## Installing

To run locally the charts, you will need [node.js](https://nodejs.org).

After cloning the repo, run `npm install` to install all the dependencies.

## Resources

- Adding a new chart
- General principles
- RAWGraphs core API reference

## Running the sandbox environment

The sandbox enviroment is useful for testing purposes, it allows to load custom configurations (dataset, mapping, visual options) and to see directly the result.

To use it, clone the repository and install the NPM dependencies.

To activate the sandbox, run:

`npm run sandbox`

It will create a localhost running all the example configurations at the address

http://localhost:9000

## Creating a build and using locally in RAWGraphs app

To test your work in the RAWGraphs app interface, you will need to install Yarn.

1. Open the terminal and browse the `rawgraphs-charts` repo
2. Run the command `yarn link`
3. Clone the [rawgraphs-app](https://github.com/rawgraphs/rawgraphs-app) repository
4. Open the terminal and browse the `rawgraphs-app` repo
5. Install the dependencies by running `yarn install`
6. Link the local chart with the command  `yarn link "@rawgraphs/rawgraphs-charts"`

## Adding a configuration to the sandbox environment

A configuration is a JSON file containg all the choices that the user can make using the RAWGraphs app. <!--You can write your own or generate it with the RAWGraphs app in the `Export` section and selecting the `.rawgraphs` format which containt the configuration.-->

All the available configurations are located in the `example/configurations` folder.

Below, an example of configuration of a simple bar chart. 

```javascript
import myChart from 'rawcharts/barchart'
import data from '../datasets/simple-barchart.tsv'

export default {
  chart: myChart,
  data,
  dataTypes: {
    category: 'string',
    bar: 'string',
    value: 'number',
  },
  mapping: {
    series: { value: ['category'] },
    bars: { value: ['bar'] },
    size: { value: ['value'] },
    color: { value: ['category'] },
  },
  visualOptions: {
    width: 1000,
    height: 700,
    padding: 3,
    sortSeriesBy: 'Value (descending)',
    horizontalBars: false,
  },
}
```

at the beginning, you must import the chart you want (in this case, the Barchart) an the data you want to use.

Test datasets are located in the `example/datasets` folder.

the configuration must export:

* **Chart:** the name of the chart you imported
* **Data:** the imported dataset
* **DataTypes**: the list of column headers in the dataset and their type. It could be `string`, `number` or `date`.
* **Mapping:** the list of required dimension by the chart (e.g. series, bars, size and colors for barcharts) and which column of the dataset should be used.
* **visualOptions:** the setting for visual options required by a chart.

## The anatomy of a visual model

Each chart is enclosed in a folder in the `src/` folder.

It is composed by seven files:

* **index.js** exporting the chart;
* **metadata.js** describing the chart;
* **dimensions.js** define the data dimensions needed by the chart (e.g. "X Axis", "Size", "Color")
* **mapping.js** transforms the input data to the data format required by the chart
* **visualOptions.js** contains all the visual options related to the chart (e.g. width, minimum dots size, sorting options etc.)
* **render.js** containt all the instruction to create the visualisation

All the charts are then registered in the file `src/index.js`.

