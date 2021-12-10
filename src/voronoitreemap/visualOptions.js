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

  seed: {
    type: 'number',
    label: 'Seed for random computations',
    default: 0,
    // step: 0.1,
    // min: 0,
    // max: 1,
    group: 'chart',
  },

  padding: {
    type: 'number',
    label: 'Padding',
    default: 2,
    group: 'chart',
  },

  clipToPolygon: {
    type: 'boolean',
    label: 'Clip to polygon',
    default: true,
    group: 'chart',
  },

  edges: {
    type: 'number',
    label: 'Polygon edges',
    default: 3,
    min: 3,
    group: 'chart',
    disabled: {
      clipToPolygon: false,
    },
  },

  rotation: {
    type: 'number',
    label: 'Polygon rotation',
    default: 0,
    min: 0,
    max: 360,
    group: 'chart',
    disabled: {
      clipToPolygon: false,
    },
  },

  isRegular: {
    type: 'boolean',
    label: 'Regular polygon',
    default: true,
    disabled: {
      clipToPolygon: false,
    },
    group: 'chart',
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

  labelStyles: {
    type: 'text',
    label: 'Label',
    group: 'labels',
    options: [
      { label: 'Primary', value: 'labelPrimary' },
      { label: 'Secondary', value: 'labelSecondary' },
      { label: 'Italic', value: 'labelItalic' },
    ],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic'],
  },

  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels',
  },

  showHierarchyLabels: {
    type: 'boolean',
    label: 'Show hierarchy labels',
    default: false,
    group: 'labels',
  },
}
