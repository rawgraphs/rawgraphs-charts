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
    default: 10,
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
  interpolation: {
    type: 'text',
    label: t('visualOptions.interpolation'),
    default: 'curveMonotoneX',
    options: [
      {
        label: t('visualOptions.interpolationOptions.curveBasis'),
        value: 'curveBasis',
      },
      {
        label: t('visualOptions.interpolationOptions.curveCardinal'),
        value: 'curveCardinal',
      },
      {
        label: t('visualOptions.interpolationOptions.curveCatmullRom'),
        value: 'curveCatmullRom',
      },
      {
        label: t('visualOptions.interpolationOptions.curveLinear'),
        value: 'curveLinear',
      },
      {
        label: t('visualOptions.interpolationOptions.curveMonotoneX'),
        value: 'curveMonotoneX',
      },
      {
        label: t('visualOptions.interpolationOptions.curveNatural'),
        value: 'curveNatural',
      },
      {
        label: t('visualOptions.interpolationOptions.curveStep'),
        value: 'curveStep',
      },
      {
        label: t('visualOptions.interpolationOptions.curveStepAfter'),
        value: 'curveStepAfter',
      },
      {
        label: t('visualOptions.interpolationOptions.curveStepBefore'),
        value: 'curveStepBefore',
      },
    ],
    group: 'chart',
  },
  streamsOffset: {
    type: 'text',
    label: t('visualOptions.streamsOffset'),
    group: 'chart',
    options: [
      {
        label: t('visualOptions.streamsOffsetOptions.stackOffsetExpand'),
        value: 'stackOffsetExpand',
      },
      {
        label: t('visualOptions.streamsOffsetOptions.stackOffsetSilhouette'),
        value: 'stackOffsetSilhouette',
      },
      {
        label: t('visualOptions.streamsOffsetOptions.stackOffsetNone'),
        value: 'stackOffsetNone',
      },
    ],
    default: 'stackOffsetNone',
  },
  streamsPadding: {
    type: 'number',
    label: t('visualOptions.streamsPadding'),
    default: 1,
    group: 'chart',
  },
  showYAxis: {
    type: 'boolean',
    label: t('visualOptions.showYAxis'),
    default: false,
    group: 'chart',
    disabled: {
      streamsOffset: 'stackOffsetSilhouette',
    },
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
  showGrid: {
    type: 'boolean',
    label: t('visualOptions.showSeriesGrid'),
    default: false,
    group: 'series',
  },
  colorScale: {
    type: 'colorScale',
    label: t('visualOptions.colorScale'),
    dimension: 'streams',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },
  showLabels: {
    type: 'boolean',
    label: t('visualOptions.showStreams'),
    default: true,
    group: 'Labels',
  },
  labelsType: {
    type: 'text',
    label: t('visualOptions.labelsType'),
    group: 'Labels',
    options: ['On path', 'On point'],
    default: 'On point',
    disabled: {
      showLabels: false,
    },
  },
  showLabelsOutline: {
    type: 'boolean',
    label: t('visualOptions.showLabelsOutline'),
    default: false,
    group: 'Labels',
    disabled: {
      showLabels: false,
    },
  },
}
