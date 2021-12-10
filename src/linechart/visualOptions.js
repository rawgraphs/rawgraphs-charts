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
    default: 'curveBumpX',
    options: [
      { label: 'Basis', value: 'curveBasis' },
      { label: 'Bundle', value: 'curveBundle' },
      { label: 'Bump', value: 'curveBumpX' },
      { label: 'Cardinal', value: 'curveCardinal' },
      { label: 'Catmull–Rom', value: 'curveCatmullRom' },
      { label: 'Linear', value: 'curveLinear' },
      { label: 'Monotone X', value: 'curveMonotoneX' },
      { label: 'Natural', value: 'curveNatural' },
      { label: 'Step', value: 'curveStep' },
      { label: 'Step After', value: 'curveStepAfter' },
      { label: 'Step Before', value: 'curveStepBefore' },
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

  xTicksAuto: {
    type: 'boolean',
    label: 'Auto-place ticks on x axis',
    default: true,
    group: 'axes',
  },

  xTicksAmount: {
    type: 'number',
    label: 'Max. ticks on x axis',
    default: 1,
    group: 'axes',
    disabled: {
      xTicksAuto: true,
    },
  },

  xTicksOuter: {
    type: 'boolean',
    label: 'Show min/max on x axis',
    default: false,
    group: 'axes',
    disabled: {
      xTicksAuto: true,
    },
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
