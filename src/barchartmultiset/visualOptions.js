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
  setsPadding: {
    type: 'number',
    label: t('visualOptions.setsPadding'),
    default: 4,
    group: 'chart',
  },
  barsPadding: {
    type: 'number',
    label: t('visualOptions.barsPadding'),
    default: 1,
    group: 'chart',
  },
  SortXAxisBy: {
    type: 'text',
    label: t('visualOptions.SortXAxisBy'),
    group: 'chart',
    options: [
      'Total value (descending)',
      'Total value (ascending)',
      'Name',
      'Original',
    ],
    default: 'Name',
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
      {
        label: t('visualOptions.sortSeriesByOptions.valueDescending'),
        value: 'valueDescending',
      },
      {
        label: t('visualOptions.sortSeriesByOptions.valueAscending'),
        value: 'valueAscending',
      },
      {
        label: t('visualOptions.sortSeriesByOptions.name'),
        value: 'name',
      },
      {
        label: t('visualOptions.sortSeriesByOptions.none'),
        value: 'none',
      },
    ],
    default: 'valueDescending',
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
    default: true,
    group: 'series',
  },
  colorScale: {
    type: 'colorScale',
    label: t('visualOptions.colorScale'),
    dimension: 'bars',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },
}
