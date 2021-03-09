# RAWGraphs Charts

This repo contains a curated selection of charts included in [RAWGraphs app](https://github.com/rawgraphs/rawgraphs-app). It uses the [RAWGraphs core](https://github.com/rawgraphs/rawgraphs-core) API to define charts behaviours.

If you'd like to contribute, please check the "[contributing](#contributing)" section.

The repository contains also a sandbox enviroment to test directly the charts in development.

## Installation

If you want to run your instance of RAWGraphs locally on your machine, be sure you have the following requirements installed.

### Requirements

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node.js](https://nodejs.org/en/)

### Instructions (Mac OS)

Open the terminal and browse the folder where you want to install the charts and clone RAWGraphs from the command line:

```shell
git clone https://github.com/rawgraphs/rawgraphs-charts.git
```

browse to RAWGraphs root folder:

```shell
cd rawgraphs-charts
```

install client-side dependencies:

```shell
npm install
```

you cna now run the sandbox environment to test your charts

### Running the sandbox environment

The sandbox enviroment is useful for testing purposes, it allows to load custom configurations (dataset, mapping, visual options) and to see directly the result.

To use it, clone the repository and install the NPM dependencies.

To activate the sandbox, run:

`npm run sandbox`

It will create a localhost running all the example configurations at the address

http://localhost:9000

### Creating a build and testing locally in RAWGraphs app

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

And test it locally by starting the app:

```shell
yarn start
```

Everytime you will create a new build of `rawgraphs-chart` your local version of `rawgraphs-app` will be updated.

## Contributing

This repository cointains only the charts that are used in the public version of RAWGraphs.

This means that we won't add any possible chart, but only the ones we think suits the best the project.

If you want to contribute you're more thank welcome. You will need to sign a [Contributor License Agreement (CLA)](https://en.wikipedia.org/wiki/Contributor_License_Agreement) before making a submission. We adopted CLA to be sure that the project will remain open source. For more information, write us: [hello@rawgraphs.io](mailto:hello@rawgraphs.io).

After doing that, you can:

* help us to close [issues related to charts](https://github.com/rawgraphs/rawgraphs-charts/issues)
* Help us in the development of new charts that apre aprt of our roadmap.

At the moment, we won't accept usolicited pull request with charts not in the roadmap. In the near future it will be possible to add custom charts on the flight, so if you want to add a very specific, quirk or experimental chart stay tuned with the new updates by following our [Twitter account @rawgraphs](https://twitter.com/rawgraphs).

### Resources

Before pulling a new request, please check the following resources to comply with the practices we've defined so far. If you plan to add a new chart, check the RAWGraphs API documentation to understaind how to use them.

- [RAWGraphs dictionary](docs/RAWGraphs-dictionary.md)
- [General principles](docs/good-practices.md)
- [Adding a new chart](docs/add-a-new-chart.md)
- RAWGraphs core API reference