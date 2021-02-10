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
    default: 100,
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
    label: 'Set x origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },

  yOrigin: {
    type: 'boolean',
    label: 'Set y origin to 0',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },

  radius: {
    type: 'number',
    label: 'hex radius (px)',
    default: 8,
    step: 1,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },

  weightSize: {
    type: 'boolean',
    label: 'Weight size',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },

  showPoints: {
    type: 'boolean',
    label: 'Show points',
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },

  pointsRadius: {
    type: 'number',
    label: 'Points radius (px)',
    default: 1,
    group: 'chart',
    disabled: {
      showPoints: false,
    },
    requiredDimensions: ['x', 'y'],
  },

  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'sequential',
      interpolator: 'interpolateBlues',
    },
    group: 'colors',
  },
}
