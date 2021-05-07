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
    default: 15,
    group: 'artboard',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
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

  showPoints: {
    type: 'boolean',
    label: 'Show dots on data values',
    default: false,
    group: 'chart',
  },

  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    default: 2,
    group: 'chart',
    disabled: {
      showPoints: false,
    },
  },

  interpolation: {
    type: 'text',
    label: 'Curve type',
    default: 'Linear',
    options: [
      { label: 'Basis', value: 'Basis' },
      { label: 'Bundle', value: 'Bundle' },
      { label: 'Cardinal', value: 'Cardinal' },
      { label: 'Catmull–Rom', value: 'CatmullRom' },
      { label: 'Linear', value: 'Linear' },
      { label: 'Monotone X', value: 'MonotoneX' },
      { label: 'Natural', value: 'Natural' },
      { label: 'Step', value: 'Step' },
      { label: 'Step After', value: 'StepAfter' },
      { label: 'Step Before', value: 'StepBefore' },
    ],
    group: 'chart',
  },

  yOrigin: {
    type: 'boolean',
    label: 'Set Y origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['y'],
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
    label: 'Use same scale',
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
    label: 'Show labels',
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

  showGrid: {
    type: 'boolean',
    label: 'Show series grid',
    default: true,
    group: 'series',
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
