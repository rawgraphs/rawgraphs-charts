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

  xOrigin: {
    type: 'boolean',
    label: 'Set X origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },

  yOrigin: {
    type: 'boolean',
    label: 'Set Y origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },

  bandwidth: {
    type: 'number',
    label: 'Bandwidth',
    default: 20,
    step: 1,
    min: 1,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },

  showPoints: {
    type: 'boolean',
    label: 'Show dots on data values',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },

  dotsDiameter: {
    type: 'number',
    label: 'Dots diameter',
    default: 2,
    group: 'chart',
    disabled: {
      showPoints: false,
    },
    requiredDimensions: ['x', 'y'],
  },

  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    domain: 'colorDomain',
    default: {
      scaleType: 'sequential',
      interpolator: 'interpolateBlues',
    },
    group: 'colors',
    requiredDimensions: ['x', 'y'],
  },

  showBandLabels: {
    type: 'boolean',
    label: 'Show band labels',
    default: false,
    group: 'labels',
    requiredDimensions: ['x', 'y'],
  },

  labelThresholds: {
    type: 'number',
    label: 'Labels threshold steps',
    default: 5,
    step: 1,
    min: 1,
    group: 'labels',
    disabled: {
      showBandLabels: false,
    },
    requiredDimensions: ['x', 'y'],
  },

  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels',
    disabled: {
      showBandLabels: false,
    },
    requiredDimensions: ['x', 'y'],
  },

  autoHideLabels: {
    type: 'boolean',
    label: 'Auto hide labels',
    default: false,
    group: 'labels',
    disabled: {
      showBandLabels: false,
    },
    requiredDimensions: ['x', 'y'],
  },
}
