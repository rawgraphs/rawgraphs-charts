export const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 50,
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

  sortGroupsBy: {
    type: 'text',
    label: 'Sort groups by',
    group: 'chart',
    options: [
      { label: 'Original', value: '' },
      { label: 'Start date (ascending)', value: 'ascending' },
      { label: 'Start date (descending)', value: 'descending' },
      { label: 'Name', value: 'group' },
    ],
    default: '',
  },

  barPadding: {
    type: 'number',
    label: 'Padding (%)',
    default: 0,
    group: 'chart',
    step: 0.1,
    min: 0,
    max: 1,
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

  alignLabels: {
    type: 'boolean',
    label: 'Labels position',
    default: false,
    group: 'labels',
  },
}
