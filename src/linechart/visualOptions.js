export const visualOptions = {

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
  gutter: {
    type: "number",
    label: "Space between series",
    default: 2,
    group: "series",
  },
  sortSeriesBy: {
    type: "text",
    label: "Sort series by",
    group: "series",
	options: ["Total value (descending)", "Total value (ascending)", "Name", "Original"],
	default: "Total value (descending)"
  },

}


// showLegend,
// legendWidth,
// marginTop = 20,
// marginRight = 20,
// marginBottom = 20,
// marginLeft = 20
