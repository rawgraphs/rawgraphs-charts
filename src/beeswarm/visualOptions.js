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
    default: 50,
    group: 'artboard',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 100,
    group: 'artboard',
  },

  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard',
  },

  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
    container: 'width',
    containerCondition: {
      showLegend: true,
    },
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
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },
}

// showLegend,
// legendWidth,
