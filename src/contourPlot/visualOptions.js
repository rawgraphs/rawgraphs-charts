import { t } from '@rawgraphs/rawgraphs-core'

export const visualOptions = {
  marginTop: {
    type: 'number',
    label: t('visualOptions.marginTop'),
    default: 50,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    label: t('visualOptions.marginRight'),
    default: 50,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    label: t('visualOptions.marginBottom'),
    default: 50,
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
  xOrigin: {
    type: 'boolean',
    label: t('visualOptions.xOrigin'),
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },
  yOrigin: {
    type: 'boolean',
    label: t('visualOptions.yOrigin'),
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },
  bandwidth: {
    type: 'number',
    label: t('visualOptions.bandwidth'),
    default: 20,
    step: 1,
    min: 1,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },
  showPoints: {
    type: 'boolean',
    label: t('visualOptions.showDotsOnData'),
    default: false,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },
  dotsDiameter: {
    type: 'number',
    label: t('visualOptions.dotsDiameter'),
    default: 2,
    group: 'chart',
    disabled: {
      showPoints: false,
    },
    requiredDimensions: ['x', 'y'],
  },
  colorScale: {
    type: 'colorScale',
    label: t('visualOptions.colorScale'),
    domain: 'colorDomain',
    default: {
      scaleType: 'sequential',
      interpolator: 'interpolateBlues',
    },
    group: 'colors',
    requiredDimensions: ['x', 'y'],
  },
  showBandLabels: {
    type: 'boolean',
    label: t('visualOptions.showBandLabels'),
    default: false,
    group: 'labels',
    requiredDimensions: ['x', 'y'],
  },
  labelThresholds: {
    type: 'number',
    label: t('visualOptions.labelThresholds'),
    default: 5,
    step: 1,
    min: 1,
    group: 'labels',
    disabled: {
      showBandLabels: false,
    },
    requiredDimensions: ['x', 'y'],
  },
  showLabelsOutline: {
    type: 'boolean',
    label: t('visualOptions.showLabelsOutline'),
    default: false,
    group: 'labels',
    disabled: {
      showBandLabels: false,
    },
    requiredDimensions: ['x', 'y'],
  },
  autoHideLabels: {
    type: 'boolean',
    label: t('visualOptions.autoHideLabels'),
    default: false,
    group: 'labels',
    disabled: {
      showBandLabels: false,
    },
    requiredDimensions: ['x', 'y'],
  },
}
