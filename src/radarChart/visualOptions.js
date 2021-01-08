export const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 30,
    group: 'margins',
  },

  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 20,
    group: 'margins',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 0,
    group: 'margins',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 20,
    group: 'margins',
  },

  showDots: {
    type: 'boolean',
    label: 'Show dots',
    default: true,
    group: 'chart',
  },

  dotsRadius: {
    type: 'number',
    label: 'Dots radius',
    default: 2,
    group: 'chart',
  },

  innerRadius: {
    type: 'number',
    label: 'Inner radius',
    default: 0,
    group: 'chart',
  },

  interpolation: {
    type: 'text',
    label: 'Interpolation',
    default: 'Catmull–Rom',
    options: ['Basis', 'Cardinal', 'Catmull–Rom', 'Linear'],
    group: 'chart',
  },

  fillOpacity: {
    type: 'number',
    label: 'Fill opacity',
    default: 0.5,
    group: 'chart',
  },

  labelsPadding: {
    type: 'number',
    label: 'Axis labels padding',
    default: 10,
    group: 'labels',
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

  columnsNumber: {
    type: 'number',
    label: 'Number of columns',
    default: 0,
    group: 'series',
  },

  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series labels',
    default: true,
    group: 'series',
  },
}
