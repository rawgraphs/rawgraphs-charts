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
  tiling: {
    type: 'text',
    label: t('visualOptions.tiling'),
    group: 'chart',
    options: [
      {
        label: t('visualOptions.tilingOptions.treemapBinary'),
        value: 'treemapBinary',
      },
      {
        label: t('visualOptions.tilingOptions.treemapDice'),
        value: 'treemapDice',
      },
      {
        label: t('visualOptions.tilingOptions.treemapSlice'),
        value: 'treemapSlice',
      },
      {
        label: t('visualOptions.tilingOptions.treemapSliceDice'),
        value: 'treemapSliceDice',
      },
      {
        label: t('visualOptions.tilingOptions.treemapSquarify'),
        value: 'treemapSquarify',
      },
    ],
    default: 'treemapSquarify',
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
}
