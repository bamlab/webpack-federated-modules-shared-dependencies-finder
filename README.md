# Webpack federated modules shared dependencies finder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A tool to manage dependencies of different modules when working with Module Federation.

## Install

```bash
npm install -D @bam.tech/webpack-federated-modules-shared-dependencies-finder
```

## Usage

Import the lib

```bash
const { DependenciesFinder } = require("@bam.tech/webpack-federated-modules-shared-dependencies-finder");
```

Instantiate a `DependenciesFinder` by giving it the wanted path, and you are good to go!

```bash
const dependenciesFinder = new DependenciesFinder(".");
const dependencies = dependenciesFinder.getDependencies();
```

## Adapt to your usage

The `DependenciesFinder` constructor takes the following strategies by default:

| Prop                          |                   Default                   |         Type          | Description                                                                                     |
| :---------------------------- | :-----------------------------------------: | :-------------------: | :---------------------------------------------------------------------------------------------- |
| DependenciesToKeepStrategy    | ProductionNonWorkspaceDependenciesExtractor | DependenciesExtractor | list of the dependencies to keep                                                                |
| DependenciesToRecurseStrategy |  ProductionWorkspaceDependenciesExtractor   | DependenciesExtractor | list of the dependencies of which we'd like to inspect their dependencies and extract if needed |

You can of course extend `DependenciesExtractor` and implement any strategy that suits your use case
