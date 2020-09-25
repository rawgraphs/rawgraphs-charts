export const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard',
  },

  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard',
  },

  minDiameter: {
    type: 'number',
    label: 'Minimum diameter',
    default: 1,
    group: 'chart',
  },

  maxDiameter: {
    type: 'number',
    label: 'Maximum diameter',
    default: 20,
    group: 'chart',
  },

  nodePadding: {
    type: 'number',
    label: 'Padding between nodes',
    default: 1,
    group: 'chart',
  },

  simulationStrength: {
    type: 'number',
    label: 'Simulation strength (%)',
    default: 0.05,
    group: 'chart',
  },

  sortSeriesBy: {
    type: 'text',
    label: 'Vertically sort series by',
    group: 'series',
    options: [
      'Total value (descending)',
      'Total value (ascending)',
      'Name',
      'Original',
    ],
    default: 'Original',
  },

  colorScale: {
    type: 'colorScale',
    label: 'The color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'chart',
  },
}

// showLegend,
// legendWidth,
