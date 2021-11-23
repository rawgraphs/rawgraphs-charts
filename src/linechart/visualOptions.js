import { t } from '@rawgraphs/rawgraphs-core'

export const visualOptions = {
  marginTop: {
    type: 'number',
    label: t('visualOptions.marginTop'),
    default: 10,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    label: t('visualOptions.marginRight'),
    default: 15,
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
  showPoints: {
    type: 'boolean',
    label: t('visualOptions.showDotsOnData'),
    default: false,
    group: 'chart',
  },
  dotsDiameter: {
    type: 'number',
    label: t('visualOptions.dotsDiameter'),
    default: 2,
    group: 'chart',
    disabled: {
      showPoints: false,
    },
  },
  interpolation: {
    type: 'text',
    label: t('visualOptions.curveType'),
    default: 'Linear',
    options: [
      {
        label: t('visualOptions.interpolationOptions.Basis'),
        value: 'Basis',
      },
      {
        label: t('visualOptions.interpolationOptions.Bundle'),
        value: 'Bundle',
      },
      {
        label: t('visualOptions.interpolationOptions.Cardinal'),
        value: 'Cardinal',
      },
      {
        label: t('visualOptions.interpolationOptions.CatmullRom'),
        value: 'CatmullRom',
      },
      {
        label: t('visualOptions.interpolationOptions.Linear'),
        value: 'Linear',
      },
      {
        label: t('visualOptions.interpolationOptions.MonotoneX'),
        value: 'MonotoneX',
      },
      {
        label: t('visualOptions.interpolationOptions.Natural'),
        value: 'Natural',
      },
      {
        label: t('visualOptions.interpolationOptions.Step'),
        value: 'Step',
      },
      {
        label: t('visualOptions.interpolationOptions.StepAfter'),
        value: 'StepAfter',
      },
      {
        label: t('visualOptions.interpolationOptions.StepBefore'),
        value: 'StepBefore',
      },
    ],
    group: 'chart',
  },
  yOrigin: {
    type: 'boolean',
    label: t('visualOptions.yOrigin'),
    default: false,
    group: 'chart',
    requiredDimensions: ['y'],
  },
  columnsNumber: {
    type: 'number',
    label: t('visualOptions.columnsNumber'),
    default: 0,
    group: 'series',
  },
  xTicksAuto: {
    type: 'boolean',
    label: t('visualOptions.xTicksAuto'),
    default: true,
    group: 'axes',
  },
  xTicksAmount: {
    type: 'number',
    label: t('visualOptions.xTicksAmount'),
    default: 1,
    group: 'axes',
    disabled: {
      xTicksAuto: true,
    },
  },
  xTicksOuter: {
    type: 'boolean',
    label: t('visualOptions.xTicksOuter'),
    default: false,
    group: 'axes',
    disabled: {
      xTicksAuto: true,
    },
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
  useSameScale: {
    type: 'boolean',
    label: t('visualOptions.useSameScale'),
    default: true,
    group: 'series',
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
  showLabels: {
    type: 'boolean',
    label: t('visualOptions.showLabels'),
    default: true,
    group: 'labels',
  },
  labelsPosition: {
    type: 'text',
    label: t('visualOptions.labelsPosition'),
    options: ['inline', 'side'],
    default: 'inline',
    group: 'labels',
    disabled: {
      showLabels: false,
    },
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
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },
}
