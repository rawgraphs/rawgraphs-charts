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
  linksOpacity: {
    type: 'number',
    label: t('visualOptions.linksOpacity'),
    default: 1,
    step: 0.1,
    min: 0,
    max: 1,
    group: 'chart',
  },
  linksBlendMode: {
    type: 'text',
    label: t('visualOptions.linksBlendMode'),
    group: 'chart',
    options: ['normal', 'multiply'],
    default: 'multiply',
  },
  sortNodesBy: {
    type: 'text',
    label: t('visualOptions.sortNodesBy'),
    group: 'chart',
    options: [
      {
        label: t('visualOptions.sortNodesByOptions.sizeDescending'),
        value: 'sizeDescending',
      },
      {
        label: t('visualOptions.sortNodesByOptions.sizeAscending'),
        value: 'sizeAscending',
      },
      {
        label: t('visualOptions.sortNodesByOptions.name'),
        value: 'name',
      },
      {
        label: t('visualOptions.sortNodesByOptions.auto'),
        value: 'auto',
      },
    ],
    default: 'sizeAscending',
  },
  verticalAlignment: {
    type: 'text',
    label: t('visualOptions.verticalAlignment'),
    group: 'chart',
    options: ['Top', 'Center', 'Bottom'],
    default: 'Center',
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
