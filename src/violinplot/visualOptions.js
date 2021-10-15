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
    default: 30,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard',
  },

  padding: {
    type: 'number',
    label: 'Padding',
    default: 10,
    group: 'chart',
  },

  binsNumber: {
    type: 'number',
    label: 'Number of bins',
    default: 10,
    group: 'chart',
  },

  sortGroupsBy: {
    type: 'text',
    label: 'Sort violins by',
    group: 'chart',
    options: [
      { label: 'Total value (descending)', value: 'valueDescending' },
      { label: 'Total value (ascending)', value: 'valueAscending' },
      { label: 'Name', value: 'name' },
      { label: 'Original', value: 'none' },
    ],
    default: 'valueDescending',
  },

  interpolation: {
    type: 'text',
    label: 'Curve type',
    default: 'Monotone Y',
    options: [
      'Basis',
      'Bundle',
      'Cardinal',
      'Catmull–Rom',
      'Linear',
      'Monotone Y',
      'Natural',
      'Step',
      'Step After',
      'Step Before',
    ],
    group: 'chart',
  },

  showDots: {
    type: 'boolean',
    label: 'Show dots on data values',
    default: false,
    group: 'chart',
  },

  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    disabled: {
      showDots: false,
    },
    default: 2,
    group: 'chart',
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

  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'schemeCategory10',
    },
    group: 'colors',
  },
}
