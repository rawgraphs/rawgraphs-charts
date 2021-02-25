# RAWGraphs Charts

This repo contains all the visual models used in [RAWGraphs app](https://github.com/rawgraphs/rawgraphs-app). It uses the [RAWGraphs core](https://github.com/rawgraphs/rawgraphs-core) API to define charts behaviours.

The repository contains also a sandbox enviroment to test directly the charts in development. 

## Installing

To run locally the charts, you will need [node.js](https://nodejs.org).

After cloning the repo, run `npm install` to install all the dependencies.

## Resources

- [Make your first chart](docs/make-yor-first-chart.md)
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

