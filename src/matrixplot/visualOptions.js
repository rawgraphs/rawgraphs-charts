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

  showLabels: {
    type: 'boolean',
    label: 'Show labels',
    default: true,
    group: 'labels'
  },

  labelsStyle: {
    type: "text",
    label: "Labels style",
    group: "series",
    options: ["Primary", "Secondary", "Tertiary"],
    default: "Primary"
  },

}
