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
  //
  // tiling: {
  //   type: "text",
  //   label: "Tiling method",
  //   group: "chart",
  //   options: ["Binary", "Dice", "Slice", "Slice and dice", "Squarify"],
  //   default: "Squarify"
  // },

  padding: {
    type: 'number',
    label: 'Padding between treemap levels',
    default: 2,
    group: 'chart',
  },

  sortCirclesBy: {
    type: 'text',
    label: 'Sort series by',
    group: 'series',
    options: ['Size (descending)', 'Size (ascending)', 'Original'],
    default: 'Size (descending)',
  },

  colorScale: {
    type: 'colorScale',
    label: 'The color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },

  label1Style: {
    type: 'text',
    label: 'Labels 1 style',
    group: 'labels',
    options: ['Primary', 'Secondary', 'Tertiary'],
    default: 'Primary',
  },

  label2Style: {
    type: 'text',
    label: 'Labels 1 style',
    group: 'labels',
    options: ['Primary', 'Secondary', 'Tertiary'],
    default: 'Secondary',
  },

  label3Style: {
    type: 'text',
    label: 'Labels 1 style',
    group: 'labels',
    options: ['Primary', 'Secondary', 'Tertiary'],
    default: 'Tertiary',
  },
}
