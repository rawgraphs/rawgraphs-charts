# RAWGraphs dictionary

to keep consistent our guides, we drafted this small dictionary.

The power (and limitation) of RAWGraphs is that the data input is a single plain table. 

#### Chart

Charts are the combination of [dimensions](#dimension), [mapping](mapping) and [visual options](visual-option), outputs and render function and outputs the visualizations.

they returns the visual object (usually an SVG node) that the user can then download.

#### Data column

A column of the input dataset. RAWgraphs requires as input a single plain table. Each column must have a unique header in the first row.

#### Dimension

Dimensions are the data inputs required to render a [chart](#chart), allowing the user to choose the appropriate [data column](data-column) to be passed to the [mapping](#mapping) and to create the data structure needed by the chart.

While often dimensions are directly binded to visual variables (e.g. in a [blubble chart]() dimensions are `x` and `y` position, `color` and `size`), dimensions can have a more complex role in the mapping. For example, they can be used to group data, or to create nested structures as in a [treemap]().

#### Mapping

Each [chart](#chart) requires an appropriate data structure to be rendered.  In short, the mapping transforms [data columns](data-column) into the 'something else' charts need to work with through the [dimensions](#dimension).

Mapping returns a data table strucuterd as need by the chart.

#### Visual variable

Visual property of the shapes representing data, for example posizion, color or shape. even this term is almost never directly used in RAWGraphs documentation, is the basic concept used to conceive the tool.

#### Visual option

Visual features of the [chart](#chart) not related to data, for example the artboard width and height, text style, margins, etc.

An exception are colour scale that are exposed as visual options to enable users to choose their own palette.