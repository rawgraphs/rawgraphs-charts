import { t } from '@rawgraphs/rawgraphs-core'

export const visualOptions = {
  // Artboard
  marginTop: {
    type: 'number',
    label: t('visualOptions.marginTop'),
    default: 10,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    label: t('visualOptions.marginRight'),
    default: 2,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    label: t('visualOptions.marginBottom'),
    default: 2,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    label: t('visualOptions.marginLeft'),
    default: 2,
    group: 'artboard',
  },
  showLegend: {
    type: 'boolean',
    label: t('visualOptions.showLegend'),
    default: false,
    group: 'artboard',
  },
  legendWidth: {
    type: 'number',
    label: t('visualOptions.legendWidth'),
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  // chart
  drawDonut: {
    type: 'boolean',
    label: t('visualOptions.drawDonut'),
    default: false,
    group: 'chart',
  },
  arcTichkness: {
    type: 'number',
    label: t('visualOptions.arcTichkness'),
    default: 10,
    group: 'chart',
    disabled: {
      drawDonut: false,
    },
  },
  sortArcsBy: {
    type: 'text',
    label: t('visualOptions.sortArcsBy'),
    group: 'series',
    options: [
      {
        label: t('visualOptions.sortArcsByOptions.totalDescending'),
        value: 'totalDescending',
      },
      {
        label: t('visualOptions.sortArcsByOptions.totalAscending'),
        value: 'totalAscending',
      },
      {
        label: t('visualOptions.sortArcsByOptions.name'),
        value: 'name',
      },
      {
        label: t('visualOptions.sortArcsByOptions.original'),
        value: 'original',
      },
    ],
    default: 'name',
  },
  // colors
  colorScale: {
    type: 'colorScale',
    label: t('visualOptions.colorScale'),
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
    label: t('visualOptions.showPiesTitles'),
    default: true,
    group: 'labels',
  },
  showArcValues: {
    type: 'boolean',
    label: t('visualOptions.showArcValues'),
    default: false,
    group: 'labels',
  },
  // series
  sortPiesBy: {
    type: 'text',
    label: t('visualOptions.sortPiesBy'),
    group: 'series',
    options: [
      {
        label: t('visualOptions.sortPiesByOptions.totalDescending'),
        value: 'totalDescending',
      },
      {
        label: t('visualOptions.sortPiesByOptions.totalAscending'),
        value: 'totalAscending',
      },
      {
        label: t('visualOptions.sortPiesByOptions.name'),
        value: 'name',
      },
      {
        label: t('visualOptions.sortPiesByOptions.original'),
        value: 'original',
      },
    ],
    default: 'name',
  },
  columnsNumber: {
    type: 'number',
    label: t('visualOptions.gridColumns'),
    default: 0,
    group: 'series',
  },
  showGrid: {
    type: 'boolean',
    label: t('visualOptions.showGrid'),
    default: false,
    group: 'series',
  },
}
