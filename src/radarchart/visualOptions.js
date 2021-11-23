import { t } from '@rawgraphs/rawgraphs-core'

export const visualOptions = {
  marginTop: {
    type: 'number',
    label: t('visualOptions.marginTop'),
    default: 30,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    label: t('visualOptions.marginRight'),
    default: 20,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    label: t('visualOptions.marginBottom'),
    default: 0,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    label: t('visualOptions.marginLeft'),
    default: 20,
    group: 'artboard',
  },
  showDots: {
    type: 'boolean',
    label: t('visualOptions.showDotsOnData'),
    default: true,
    group: 'chart',
  },
  dotsDiameter: {
    type: 'number',
    label: t('visualOptions.dotsDiameter'),
    default: 2,
    group: 'chart',
    disabled: {
      showDots: false,
    },
  },
  innerDiameter: {
    type: 'number',
    label: t('visualOptions.innerDiameter'),
    default: 0,
    group: 'chart',
  },
  interpolation: {
    type: 'text',
    label: t('visualOptions.curveType'),
    default: 'Catmull–Rom',
    options: ['Basis', 'Cardinal', 'Catmull–Rom', 'Linear'],
    group: 'chart',
  },
  fillOpacity: {
    type: 'number',
    label: t('visualOptions.fillOpacity'),
    default: 0.5,
    step: 0.1,
    min: 0,
    max: 1,
    group: 'chart',
  },
  labelsPadding: {
    type: 'number',
    label: t('visualOptions.labelsPadding'),
    default: 10,
    group: 'labels',
  },
  colorScale: {
    type: 'colorScale',
    label: t('visualOptions.colorScale'),
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'schemeCategory10',
    },
    group: 'colors',
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
        label: t('visualOptions.sortSeriesByOptions.nameAscending'),
        value: 'nameAscending',
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
  showGrid: {
    type: 'boolean',
    label: t('visualOptions.showSeriesGrid'),
    default: true,
    group: 'series',
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
}
