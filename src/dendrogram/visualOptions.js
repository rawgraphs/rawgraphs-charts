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
    default: 150,
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

  maxDiameter: {
    type: 'number',
    label: 'Max diameter',
    default: 20,
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

  layout: {
    type: 'text',
    label: 'Layout algorythm',
    group: 'chart',
    options: ['Cluster Dendogram', 'Tree'],
    default: 'Tree',
  },

  sortBy: {
    type: 'text',
    label: 'Sort nodes by',
    group: 'chart',
    options: ['Size (descending)', 'Size (ascending)', 'Name', 'Original'],
    default: 'Size (descending)',
  },

  sizeOnlyLeaves: {
    type: 'boolean',
    label: 'Size only leaf nodes',
    default: true,
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
    group: 'color',
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

  showHierarchyLabels: {
    type: 'boolean',
    label: 'Show hierarchy labels',
    default: true,
    group: 'labels',
  },

  showLabelsOutline: {
    type: 'boolean',
    label: 'Show outline',
    default: false,
    group: 'labels',
  },
}
