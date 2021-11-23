import { t } from '@rawgraphs/rawgraphs-core'

export const visualOptions = {
  marginTop: {
    type: 'number',
    label: t('visualOptions.marginTop'),
    default: 20,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    label: t('visualOptions.marginRight'),
    default: 10,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    label: t('visualOptions.marginBottom'),
    default: 20,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    label: t('visualOptions.marginLeft'),
    default: 50,
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
    container: 'width',
    containerCondition: {
      showLegend: true,
    },
  },
  padding: {
    type: 'number',
    label: t('visualOptions.padding'),
    default: 1,
    group: 'chart',
  },
  barsOrientation: {
    type: 'text',
    label: t('visualOptions.barsOrientation'),
    group: 'chart',
    options: [
      {
        label: t('visualOptions.barsOrientationOptions.vertical'),
        value: 'vertical',
      },
      {
        label: t('visualOptions.barsOrientationOptions.horizontal'),
        value: 'horizontal',
      },
    ],
    default: 'vertical',
  },
  sortBarsBy: {
    type: 'text',
    label: t('visualOptions.sortBarsBy'),
    group: 'chart',
    options: [
      {
        label: t('visualOptions.sortBarsByOptions.totalDescending'),
        value: 'totalDescending',
      },
      {
        label: t('visualOptions.sortBarsByOptions.totalAscending'),
        value: 'totalAscending',
      },
      {
        label: t('visualOptions.sortBarsByOptions.name'),
        value: 'name',
      },
      {
        label: t('visualOptions.sortBarsByOptions.original'),
        value: 'original',
      },
    ],
    default: 'name',
  },
  useSameScale: {
    type: 'boolean',
    label: t('visualOptions.useSameScale'),
    default: true,
    group: 'series',
  },
  columnsNumber: {
    type: 'number',
    label: t('visualOptions.columnsNumber'),
    default: 0,
    group: 'series',
  },
  sortSeriesBy: {
    type: 'text',
    label: t('visualOptions.sortSeriesBy'),
    group: 'series',
    options: [
      'Total value (descending)',
      'Total value (ascending)',
      'Name',
      'Original',
    ],
    default: 'Total value (descending)',
  },
  showSeriesLabels: {
    type: 'boolean',
    label: t('visualOptions.showSeriesLabels'),
    default: true,
    group: 'series',
  },
  repeatAxesLabels: {
    type: 'boolean',
    label: t('visualOptions.repeatAxesLabels'),
    default: false,
    group: 'series',
  },
  showGrid: {
    type: 'boolean',
    label: t('visualOptions.showSeriesGrid'),
    default: false,
    group: 'series',
  },
  colorScale: {
    type: 'colorScale',
    label: t('visualOptions.colorScale'),
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },
}
