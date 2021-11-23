import { t } from '@rawgraphs/rawgraphs-core'

export const visualOptions = {
  // Artboard
  marginTop: {
    type: 'number',
    label: t('visualOptions.marginTop'),
    default: 40,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    label: t('visualOptions.marginRight'),
    default: 40,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    label: t('visualOptions.marginBottom'),
    default: 10,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    label: t('visualOptions.marginLeft'),
    default: 40,
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
  // chart
  nonOverlap: {
    type: 'number',
    label: t('visualOptions.nonOverlap'),
    default: 5,
    group: 'chart',
  },
  showDots: {
    type: 'boolean',
    label: t('visualOptions.showDots'),
    default: true,
    group: 'chart',
  },
  dotsDiameter: {
    type: 'number',
    label: t('visualOptions.dotsDiameter'),
    default: 5,
    group: 'chart',
    disabled: {
      showDots: false,
    },
  },
  // series
  columnsNumber: {
    type: 'number',
    label: t('visualOptions.gridColumns'),
    default: 0,
    group: 'series',
  },
  showSeriesLabels: {
    type: 'boolean',
    label: t('visualOptions.showSeriesLabels'),
    default: true,
    group: 'series',
  },
  showGrid: {
    type: 'boolean',
    label: t('visualOptions.showGrid'),
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
