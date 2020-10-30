export const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'margins',
  },

  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 15,
    group: 'margins',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'margins',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'margins',
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

  showPoints: {
    type: 'boolean',
    label: 'Show points',
    default: false,
    group: 'chart',
  },

  pointsRadius: {
    type: 'number',
    label: 'Points radius (px)',
    default: 3,
    group: 'chart',
    disabled: {
      showPoints: false,
    },
  },

  interpolation: {
    type: 'text',
    label: 'Interpolation',
    default: 'Linear',
    options: [
      'Basis',
      'Bundle',
      'Cardinal',
      'Catmull–Rom',
      'Linear',
      'Monotone X',
      'Natural',
      'Step',
      'Step After',
      'Step Before',
    ],
    group: 'chart',
  },

  columnsNumber: {
    type: 'number',
    label: 'Number of columns',
    default: 0,
    group: 'series',
  },

  sortSeriesBy: {
    type: 'text',
    label: 'Sort series by',
    group: 'series',
    options: [
      'Total value (descending)',
      'Total value (ascending)',
      'Name',
      'Original',
    ],
    default: 'Total value (descending)',
  },

  useSameScale: {
    type: 'boolean',
    label: 'Use same vertical scale',
    default: true,
    group: 'series',
  },

  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series titles',
    default: true,
    group: 'series',
  },

  repeatAxesLabels: {
    type: 'boolean',
    label: 'Repeat axis labels for each series',
    default: false,
    group: 'series',
  },

  showLabels: {
    type: 'boolean',
    label: 'Show Labels',
    default: true,
    group: 'labels',
  },

  labelsPosition: {
    type: 'text',
    label: 'Labels position',
    options: ['inline', 'side'],
    default: 'inline',
    group: 'labels',
    disabled: {
      showLabels: false,
    },
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
