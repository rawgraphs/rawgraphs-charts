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
    default: 20,
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
    default: 20,
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
  sortCirclesBy: {
    type: 'text',
    label: t('visualOptions.sortCirclesBy'),
    group: 'chart',
    options: [
      {
        label: t('visualOptions.sortCirclesByOptions.descending'),
        value: 'descending',
      },
      {
        label: t('visualOptions.sortCirclesByOptions.ascending'),
        value: 'ascending',
      },
      {
        label: t('visualOptions.sortCirclesByOptions.original'),
        value: 'original',
      },
    ],
    default: 'descending',
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
  showHierarchyLabels: {
    type: 'boolean',
    label: t('visualOptions.showHierarchyLabels'),
    default: false,
    group: 'labels',
  },
  hierarchyLabelsStyle: {
    type: 'text',
    label: t('visualOptions.hierarchyLabelsStyle'),
    group: 'labels',
    options: [
      {
        label: t('visualOptions.hierarchyLabelsStyleOptions.onPath'),
        value: 'onPath',
      },
      {
        label: t('visualOptions.hierarchyLabelsStyleOptions.onPoint'),
        value: 'onPoint',
      },
    ],
    default: 'onPoint',
    disabled: {
      showHierarchyLabels: false,
    },
  },
  autoHideLabels: {
    type: 'boolean',
    label: t('visualOptions.autoHideLabels'),
    default: false,
    group: 'labels',
  },
}
