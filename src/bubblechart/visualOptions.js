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
  maxDiameter: {
    type: 'number',
    label: t('visualOptions.maxDiameter'),
    default: 15,
    step: 1,
    group: 'chart',
    requiredDimensions: ['x', 'y'],
  },
  showStroke: {
    type: 'boolean',
    label: t('visualOptions.showStroke'),
    default: false,
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
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },
  labelStyles: {
    type: 'text',
    label: t('visualOptions.labelStyles'),
    group: 'labels',
    options: [
      {
        label: t('visualOptions.labelStylesOptions.labelPrimary'),
        value: 'labelPrimary',
      },
      {
        label: t('visualOptions.labelStylesOptions.labelSecondary'),
        value: 'labelSecondary',
      },
      {
        label: t('visualOptions.labelStylesOptions.labelItalic'),
        value: 'labelItalic',
      },
    ],
    default: 'labelPrimary',
    repeatFor: 'label',
    repeatDefault: ['labelPrimary', 'labelSecondary', 'labelItalic'],
  },
  showLabelsOutline: {
    type: 'boolean',
    label: t('visualOptions.showLabelsOutline'),
    default: false,
    group: 'labels',
  },
  autoHideLabels: {
    type: 'boolean',
    label: t('visualOptions.autoHideLabels'),
    default: false,
    group: 'labels',
  },
}
