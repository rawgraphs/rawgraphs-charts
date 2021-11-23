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
  nodesWidth: {
    type: 'number',
    label: t('visualOptions.nodesWidth'),
    default: 5,
    group: 'chart',
  },
  nodesPadding: {
    type: 'number',
    label: t('visualOptions.nodesPadding'),
    default: 5,
    group: 'chart',
  },
  alignment: {
    type: 'text',
    label: t('visualOptions.alignment'),
    group: 'chart',
    options: ['Left', 'Right', 'Center', 'Justify'],
    default: 'Left',
  },
  iterations: {
    type: 'number',
    label: t('visualOptions.iterations'),
    default: 6,
    group: 'chart',
  },
  colorScale: {
    type: 'colorScale',
    label: t('visualOptions.colorScale'),
    dimension: 'source',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },
  showValues: {
    type: 'boolean',
    label: t('visualOptions.showValues'),
    default: false,
    group: 'Labels',
  },
}
