import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'source',
    name: t('dimensions.sourceNode'),
    validTypes: ['number', 'date', 'string'],
    required: true,
  },
  {
    id: 'target',
    name: t('dimensions.targetNode'),
    validTypes: ['number', 'date', 'string'],
    required: true,
  },
  {
    id: 'size',
    name: t('dimensions.size'),
    validTypes: ['number'],
    required: false,
    aggregation: true,
    aggregationDefault: 'sum',
  },
]
