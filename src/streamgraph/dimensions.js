import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'x',
    name: t('dimensions.x'),
    operation: 'get',
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'size',
    name: t('dimensions.size'),
    operation: 'get',
    validTypes: ['number'],
    aggregation: true,
    aggregationDefault: 'sum',
  },
  {
    id: 'streams',
    name: t('dimensions.streams'),
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
  {
    id: 'series',
    name: t('dimensions.series'),
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
]
