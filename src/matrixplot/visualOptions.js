import { t } from '@rawgraphs/rawgraphs-core'

export const visualOptions = {
  marginTop: {
    type: 'number',
    label: t('visualOptions.marginTop'),
    default: 100,
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
  rounding: {
    type: 'number',
    label: t('visualOptions.rounding'),
    default: 0,
    min: 0,
    max: 100,
    step: 1,
    group: 'chart',
  },
  padding: {
    type: 'number',
    label: t('visualOptions.padding'),
    default: 2,
    group: 'chart',
  },
  sortXAxisBy: {
    type: 'text',
    label: t('visualOptions.sortXAxisBy'),
    group: 'chart',
    options: [
      'Total value (descending)',
      'Total value (ascending)',
      'Name',
      'Original',
    ],
    default: 'Original',
  },
  sortYAxisBy: {
    type: 'text',
    label: t('visualOptions.sortYAxisBy'),
    group: 'chart',
    options: [
      'Total value (descending)',
      'Total value (ascending)',
      'Name',
      'Original',
    ],
    default: 'Original',
  },
  showGrid: {
    type: 'boolean',
    label: t('visualOptions.showGrid'),
    default: false,
    group: 'chart',
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
