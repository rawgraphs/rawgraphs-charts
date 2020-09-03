export const visualOptions = {

  marginTop : {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard',
  },

  marginRight : {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard',
  },

  marginBottom : {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard',
  },

  marginLeft : {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard',
  },

  showPoints : {
    type: 'boolean',
    label: 'Show points',
    default: false,
    group: 'chart'
  },

  pointsRadius : {
    type: 'number',
    label: 'Points radius (px)',
    default: 3,
    group: 'chart',
    //#TODO: not implemented in lib/frontend
    disabled: {
      showPoints: false
    }
  },

  interpolation: {
    type: "text",
    label: "Interpolation",
    default: "Cardinal",
    options: [
      "Basis",
      "Bundle",
      "Cardinal",
      "Catmull–Rom",
      "Linear",
      "Monotone X",
      "Natural",
      "Step",
      "Step After",
      "Step Before",
    ],
    group: "chart",
  },

  strokeWidth: {
    type: "number",
    label: "Stroke width",
    default: 1.5,
    options: [
      { label: 'light', value: 1 },
      { label: 'medium', value: 1.5 },
      { label: 'bold', value: 3 },
    ],
    group: "chart",
  },

  columnsNumber: {
    type: "number",
    label: "Number of columns",
    default: 1,
    group: "series",
  },

  gutterX: {
    type: "number",
    label: "Horizontal space between series",
    default: 25,
    group: "series",
  },

	gutterY: {
		type: "number",
		label: "Vertical space between series",
		default: 50,
		group: "series",
	},

  sortSeriesBy: {
    type: "text",
    label: "Sort series by",
    group: "series",
    options: ["Total value (descending)", "Total value (ascending)", "Name", "Original"],
    default: "Total value (descending)"
  },

  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series labels',
    default: true,
    group: 'series'
  },

  repeatAxesLabels: {
    type: 'boolean',
    label: 'Repeat axis labels for each series',
    default: false,
    group: 'series'
  },

  showLabels: {
    type: 'boolean',
    label: 'Show Labels',
    default: true,
    group: 'labels'
  },

  labelsPosition: {
    type: "text",
    label: "Labels position",
    group: "series",
    options: ["inline", "side"],
    default: "inline"
  },

  labelsShorten: {
    type: 'boolean',
    label: 'Shorten Labels',
    default: false,
    group: 'labels'
  },

  labelsChars: {
    type: "number",
    label: "Max number of charachters",
    default: 1,
    group: "labels",
  },

	colorScale : {
		type: 'colorScale',
		label: 'The color scale',
		dimension: 'color',
		default: {
			scaleType: 'ordinal',
			interpolator: 'interpolateSpectral'
		},
		group: 'chart'
	},

}


// showLegend,
// legendWidth,
