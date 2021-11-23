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
  minDiameter: {
    type: 'number',
    label: t('visualOptions.minDiameter'),
    default: 2,
    group: 'chart',
  },
  maxDiameter: {
    type: 'number',
    label: t('visualOptions.maxDiameter'),
    default: 30,
    group: 'chart',
  },
  linkOpacity: {
    type: 'number',
    label: t('visualOptions.linkOpacity'),
    default: 0.5,
    step: 0.1,
    min: 0,
    max: 1,
    group: 'chart',
  },
  sameSide: {
    type: 'boolean',
    label: t('visualOptions.sameSide'),
    default: false,
    group: 'chart',
  },
  nodeSize: {
    type: 'text',
    label: t('visualOptions.nodeSize'),
    group: 'chart',
    options: [
      {
        label: t('visualOptions.nodeSizeOptions.default'),
        value: 'default',
      },
      {
        label: t('visualOptions.nodeSizeOptions.totalValue'),
        value: 'totalValue',
      },
      {
        label: t('visualOptions.nodeSizeOptions.inValue'),
        value: 'inValue',
      },
      {
        label: t('visualOptions.nodeSizeOptions.outValue'),
        value: 'outValue',
      },
      {
        label: t('visualOptions.nodeSizeOptions.degree'),
        value: 'degree',
      },
      {
        label: t('visualOptions.nodeSizeOptions.outDegree'),
        value: 'outDegree',
      },
      {
        label: t('visualOptions.nodeSizeOptions.inDegree'),
        value: 'inDegree',
      },
    ],
    default: 'totalValue',
  },
  orderNodesBy: {
    type: 'text',
    label: t('visualOptions.orderNodesBy'),
    group: 'chart',
    options: ['Name', 'Links count (degree)', 'Size', 'Minimize overlaps'],
    default: 'Minimize overlaps',
  },
}
