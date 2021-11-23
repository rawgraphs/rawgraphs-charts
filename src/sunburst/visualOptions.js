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
    default: 10,
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
  padding: {
    type: 'number',
    label: t('visualOptions.padding'),
    default: 2,
    group: 'chart',
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
  showHierarchyLabels: {
    type: 'boolean',
    label: t('visualOptions.showHierarchyLabels'),
    default: true,
    group: 'labels',
  },
  labelHierarchyStyle: {
    type: 'text',
    label: t('visualOptions.labelHierarchyStyle'),
    group: 'labels',
    options: [
      {
        label: t('visualOptions.labelHierarchyStyleOptions.labelPrimary'),
        value: 'labelPrimary',
      },
      {
        label: t('visualOptions.labelHierarchyStyleOptions.labelSecondary'),
        value: 'labelSecondary',
      },
      {
        label: t('visualOptions.labelHierarchyStyleOptions.labelItalic'),
        value: 'labelItalic',
      },
    ],
    default: 'labelItalic',
    disabled: {
      showHierarchyLabels: false,
    },
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
