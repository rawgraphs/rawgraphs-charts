# RAWGraphs Charts

This repository contains a curated selection of charts included in [RAWGraphs app](https://github.com/rawgraphs/rawgraphs-app). It uses the [RAWGraphs core](https://github.com/rawgraphs/rawgraphs-core) API to define charts behaviours.

If you'd like to contribute, please check the "[contributing](#contributing)" section.

The repository contains also a sandbox environment to test directly the charts in development.

Charts are still in beta version, breaking changes may occur.

## Installation

If you want to run the repository locally on your machine, be sure you have the following requirements installed.

### Requirements

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/)

### Instructions (Mac OS)

Open the terminal and browse the folder where you want to install the charts and clone the repository from the command line:

```shell
git clone https://github.com/rawgraphs/rawgraphs-charts.git
```

Browse the folder containing the repository:

```shell
cd rawgraphs-charts
```

Install client-side dependencies:

```shell
npm install
```

You can now run the sandbox environment to test your charts:

```shell
npm run sandbox
```

## Contributing

This repository cointains only the charts that are used in the public version of [RAWGraphs](https://app.rawgraphs.io/).

This means that we won't add any possible chart, but only the ones we think suits the best the project.

If you want to contribute you're more thank welcome. You will need to sign a [Contributor License Agreement (CLA)](https://en.wikipedia.org/wiki/Contributor_License_Agreement) before making a submission. We adopted CLA to be sure that the project will remain open source. For more information, write us: [hello@rawgraphs.io](mailto:hello@rawgraphs.io).

After doing that, you can:

- help us to close [issues related to charts](https://github.com/rawgraphs/rawgraphs-charts/issues)
- Help us in the development of [new charts listed on the roadmap](https://github.com/rawgraphs/rawgraphs-charts/projects/2).

At the moment, we won't accept usolicited pull request with charts not in the roadmap. In the near future it will be possible to add custom charts on the flight, so if you want to add a very specific, quirk or experimental chart stay tuned with the new updates by following our [Twitter account @rawgraphs](https://twitter.com/rawgraphs).

### Resources

Before pulling a new request, please check the following resources to comply with the practices we've defined so far. If you plan to add a new chart, check the RAWGraphs API documentation to understaind how to use them.

- [RAWGraphs glossary](https://rawgraphs.io/rawgraphs-core/docs/glossary)
- [General principles](docs/good-practices.md)
- [Adding a new chart](docs/add-a-new-chart.md)
- [RAWGraphs core API reference](https://rawgraphs.io/rawgraphs-core)

## License

RAWGraphs is provided under the [Apache License 2.0](https://github.com/rawgraphs/rawgraphs-charts/blob/master/LICENSE):

> Copyright (c), 2013-2021 DensityDesign Lab, Calibro, INMAGIK \<hello@rawgraphs.io\>
>
> Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
> You may obtain a copy of the License at
>
> http://www.apache.org/licenses/LICENSE-2.0
>
> Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
>
> See the License for the specific language governing permissions and limitations under the License.
