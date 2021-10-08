export const visualOptions = {
  // Artboard
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard',
  },

  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 2,
    group: 'artboard',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 2,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 2,
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
  },

  // chart

  drawDonut: {
    type: 'boolean',
    label: 'Draw as donuts',
    default: false,
    group: 'chart',
  },

  arcTichkness: {
    type: 'number',
    label: 'Donut thickness',
    default: 10,
    group: 'chart',
    disabled: {
      drawDonut: false,
    },
  },

  sortArcsBy: {
    type: 'text',
    label: 'Sort arcs by',
    group: 'series',
    options: [
      { label: 'Size (descending)', value: 'totalDescending' },
      { label: 'Size (ascending)', value: 'totalAscending' },
      { label: 'Name', value: 'name' },
      { label: 'Original', value: 'original' },
    ],
    default: 'name',
  },

  // colors

  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    domain: 'colorDomain',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },

  // labels

  showSeriesLabels: {
    type: 'boolean',
    label: 'Show pies titles',
    default: true,
    group: 'labels',
  },

  showArcValues: {
    type: 'boolean',
    label: 'Show values on arcs',
    default: false,
    group: 'labels',
  },

  // series

  sortPiesBy: {
    type: 'text',
    label: 'Sort pies by',
    group: 'series',
    options: [
      { label: 'Size (descending)', value: 'totalDescending' },
      { label: 'Size (ascending)', value: 'totalAscending' },
      { label: 'Name', value: 'name' },
      { label: 'Original', value: 'original' },
    ],
    default: 'name',
  },

  columnsNumber: {
    type: 'number',
    label: 'Grid columns',
    default: 0,
    group: 'series',
  },

  showGrid: {
    type: 'boolean',
    label: 'Show grid',
    default: false,
    group: 'series',
  },
}
