export const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 20,
    group: 'artboard',
  },

  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 20,
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
    default: 20,
    group: 'artboard',
  },

  bands: {
    type: 'number',
    label: 'Number of bands',
    default: 4,
    group: 'chart',
  },

  padding: {
    type: 'number',
    label: 'Padding',
    default: 1,
    group: 'chart',
  },

  interpolation: {
    type: 'text',
    label: 'Curve type',
    default: 'curveMonotoneX',
    options: [
      { label: 'Basis', value: 'curveBasis' },
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

  negativeStyle: {
    type: 'text',
    label: 'Show negative values as',
    group: 'chart',
    options: [
      { label: 'Mirrored', value: 'mirrored' },
      { label: 'Offset', value: 'top' },
    ],
    default: 'mirrored',
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
