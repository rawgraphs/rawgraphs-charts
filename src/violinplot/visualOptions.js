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

  padding: {
    type: 'number',
    label: 'Padding between shapes',
    default: 10,
    group: 'chart',
  },

  binsNumber: {
    type: 'number',
    label: 'Shape resolution', //amount of bins used to compute the histogram
    default: 10,
    group: 'chart',
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
      'Monotone Y',
      'Natural',
      'Step',
      'Step After',
      'Step Before',
    ],
    group: 'chart',
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
