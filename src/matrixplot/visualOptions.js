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

	rounding: {
    type: "number",
    label: "Rounding radius",
    default: 0,
    group: "chart",
  },

  padding: {
    type: "number",
    label: "Space between rows and lines",
    default: 2,
    group: "chart",
  },

  sortXAxisBy: {
    type: "text",
    label: "Sort X axis by",
    group: "chart",
    options: ["Total value (descending)", "Total value (ascending)", "Name", "Original"],
    default: "Original"
  },

  sortYAxisBy: {
    type: "text",
    label: "Sort Y axis by",
    group: "chart",
    options: ["Total value (descending)", "Total value (ascending)", "Name", "Original"],
    default: "Original"
  },

	showGrid: {
    type: 'boolean',
    label: 'Show grid',
    default: false,
    group: 'chart'
  },

  showLabels: {
    type: 'boolean',
    label: 'Show labels',
    default: false,
    group: 'labels'
  },

  label1Style: {
    type: "text",
    label: "Labels 1 style",
    group: "series",
    options: ["Primary", "Secondary", "Tertiary"],
    default: "Primary"
  },

	label2Style: {
    type: "text",
    label: "Labels 1 style",
    group: "series",
    options: ["Primary", "Secondary", "Tertiary"],
    default: "Secondary"
  },

	label3Style: {
    type: "text",
    label: "Labels 1 style",
    group: "series",
    options: ["Primary", "Secondary", "Tertiary"],
    default: "Tertiary"
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
