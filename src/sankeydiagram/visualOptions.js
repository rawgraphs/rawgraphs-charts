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

  nodesWidth: {
    type: 'number',
    label: 'Nodes width',
    default: 5,
    group: 'chart',
  },

  nodesPadding: {
    type: 'number',
    label: 'Padding',
    default: 5,
    group: 'chart',
  },

  alignment: {
    type: 'text',
    label: 'Nodes alignment',
    group: 'chart',
    options: ['Left', 'Right', 'Center', 'Justify'],
    default: 'Left',
  },

  iterations: {
    type: 'number',
    label: 'Iterations (attempts to solve overlaps)',
    default: 6,
    group: 'chart',
  },

  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'source',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },

  showValues: {
    type: 'boolean',
    label: 'Show nodes values',
    default: false,
    group: 'Labels',
  },
}
