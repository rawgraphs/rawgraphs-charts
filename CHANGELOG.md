## v1.0.0-beta.23 (upcoming)

#### Changes:

- _bar chart_: fixed sorting
- _bump chart_: fixed issue related to vertical padding
- _gantt chart_: now "start date" and "end date" visual variables accepts numbers

## v1.0.0-beta.22

#### New features:

- _slope chart_: added chart

#### Changes:

- _slope chart_: fixed legend

## v1.0.0-beta.21

- Fixed package info

## v1.0.0-beta.20

#### New features:

- Added links to tutorials and to source code for each chart

#### Changes:

- using @rawgraphs/rawgraphs-core 1.0.0-beta.15
- _Alluvial diagram_: added message to prevent visualization overflows if the number of items is too high
- _Streamgraph_: removed padding (creating many issues). Filtered streams with zero values to avoid glitches.
- Updated empty bootstrap chart

## v1.0.0-beta.19

#### New features:

- _parallel coordinates_: added chart

#### Changes:

- Fixed dimensions and visual options names
- all the charts now uses `diameter` as visual variable instead of `radius`
- _Barchart_: horizontal/vertical orientation of bar variable is now called `barsOrientation` (breaking change)
- _Multiset barchart_: added repeat axes labels option
- _Stacked barchart_: added repeat axes labels option
- _Radar chart_: added series sorting

#### Bugfixing:

- _line chart_: added "Start at 0" option (fix \#79)
- _alluvial diagram_: now nodes are properly sorted if their label is a number (fix \#82)

## v1.0.0-beta.18

#### New features:

- _Voronoi diagram_: added chart
- _Horizon graph_: added chart
- _Sunburst_: added `auto hide labels` visual option
- _Sunburst_: possible to define style for hierarchical labels
- _Sunburst_: If no labels are mapped by default is shown the hierarchical label
- _Circle packing_: possible to put hierarchy labels on path or on point

#### Bugfixing:

- _bump chart_: removed unused visual variable `sortStreamsBy`
- Margins are now in the `artboard` group for all the charts

#### Changes:

- _beeswarm diagram_: `series` dimension is now called `Y Axis`
- _bump chart_: removed unused options in `streamsOffset`
- _bump chart_: vertical axis disabled when `stack` is `stackOffsetSilhouette`
- _treemap_: removed unused `drawHierarchy` visual option
- increased default left margin in all charts to `50px`

## v1.0.0-beta.17

- _alluvial diagram_: fixed links sorting and sizes calculation
- _stream graph_: fixed padding
- _bump chart_: fixed padding
- _stacked barchart_: fixed sorting
- _multiset barchart_: fixed sorting
- _violin plot_: added sorting

## v1.0.0-beta.16

#### 8 mar 2021

- _gantt chart_: first version
- bugs fixing
- update rawgraphs-core version

## v1.0.0-beta.15

#### 25 feb 2021

- updated dependencies: d3, rawgraphs-core

## v1.0.0-beta.14

#### 24 feb 2021

- .npmingore

## v1.0.0-beta.13

#### 23 feb 2021

- publishing on npm, no repository

## v1.0.0-beta.12

#### 22 feb 2021

- fixed labels in circular dendogram

## v1.0.0-beta.11

#### 22 feb 2021

- using public version of core

## v1.0.0-beta.10

#### 19 feb 2021

- _hexagonal binning_: first version
- _box plot_: added colors, labels and styles support
- _box plot_: it is possible to set box width
- _box plot_: `values` dimension renamed to `Y Axis`.
- _box plot_: added "Start from 0" visual option.
- _stream graph_: first version
- _contour plot_: first version
- _convex hull_: first version
- _bump chart_: first version
- _violin plot_: area anchors are now in the middle of the bin.
- _radar chart_: error message when negative values are loaded
- _radar chart_: minor fix
- _violin plot_: paths are now closed adding a point after and before the bins

## v1.0.0-beta.9

#### 08 feb 2021

- _multiset barchart_: warning when the padding is too high
- _multiset barchart_: possible to sort sets
- _multiset barchart_: added styles support
- _multiset barchart_: `group` dimension now is called `sets`
- _line chart_: added grid for series
- _line chart_: fixed margins in series
- _alluvial diagram_: added blend mode option
- _alluvial diagram_: added 'show values' option
- _alluvial diagram_: added styles support
- _alluvial diagram_: fixed horizontal scale
- _sankey diagram_: added 'show values' option

#### 05 feb 2021

- added example for requiredDimensions in bubble chart visual options
- always using colorScale for bubble chart (support for defaultColor)
- _stacked barchart_: possible to sort x axis
- _stacked barchart_: fixed legend

#### 03 feb 2021

- added option to show data points in _violin plot_
- added styles to _violin plot_
- added axes labels to _violin plot_
- added styles to _circular dendrogram_
- added label mapping to _circular dendrogram_
- in _circular dendrogram_ if no labels are mapped, by default label are the leaf level of hierarchy
- added styles to _stacked barchart_
- added ability to show series grid in _stacked barchart_
- added styles to _multiset barchart_
- added ability to show series grid in _multiset barchart_
- small fixes to _multiset barchart_ and _multiset barchart_
- axes in _bar chart_ are now placed on the zero value
- added styles to _bar chart_
- added ability to show series grid in _bar chart_
- in _bar chart_ is now possible to sort bars by value

#### 02 feb 2021

- fixed size in alluvial diagram
- added option to hide hierarchy labels in _circular dendrogram_
- removed injected css in _circular dendrogram_
- added option to hide hierarchy labels in _linear dendrogram_
- removed injected css in _linear dendrogram_
- in _stacked barchart_ the dimension 'stacks' has been renamed 'X Axis'
- added colors to _alluvial diagram_ based on source node
- renaming `radarChart` folder to `radarchart`
- _radar chart_ no longer has `name` dimension
- added styles to _radar chart_
- added ability to show series grid in _radar chart_
- added series label style in styles

## v1.0.0-beta.8

#### 01 feb 2021

- _bar charts_ now accepts dates in `bar` dimension
- added _bar chart multiset_
- added _stacked bar chart_
- minor fix in barchart, barchart multiset and barchart stacked grouping
- added option to hide hierarchy in sunburst
- using core beta 1.0.0-beta.4 (support for styles)

## v1.0.0-beta.7

#### 25 jan 2021

- added box plot

## v1.0.0-beta.6

#### 23 jan 2021

- added violin plot

## v1.0.0-beta.5

#### 12 jan 2021

- added arc diagram
- fix: radar chart now asks for at least three dimensions as spokes

## v1.0.0-beta.4

#### 11 jan 2021

- added radar chart

#### 5 Jan 2021

- added empty chart to bootstrap new charts

## v1.0.0-beta.3

#### 15 Dec 2020

- Bugfixing bar chart
- Added horizontal bar chart

## v1.0.0-beta.2

#### 01 Dec 2020

Features:

- Matrix plot: using `undefined` for default color in custom mapping

## v1.0.0-beta.1

#### 01 Dec 2020

Features:

- Added repeated labels for matrix plot

## v0.0.39

#### 27 Nov 2020

Features:

- Refined Treemap
