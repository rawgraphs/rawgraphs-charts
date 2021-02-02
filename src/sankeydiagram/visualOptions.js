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
    label: 'Nodes padding',
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
    label: 'Amount of iterations (higher values can require long time)',
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
}
