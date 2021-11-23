import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'bars',
    name: t('dimensions.bars'),
    validTypes: ['number', 'string', 'date'],
    required: true,
    operation: 'get',
  },
  {
    id: 'size',
    name: t('dimensions.size'),
    operation: 'get',
    validTypes: ['number'],
    required: false,
    aggregation: true,
    aggregationDefault: 'sum',
  },
  {
    id: 'color',
    name: t('dimensions.color'),
    operation: 'get',
    validTypes: ['number', 'string', 'date'],
    required: false,
    aggregation: true,
    aggregationDefault: {
      number: 'sum',
      string: 'csvDistinct',
      date: 'csvDistinct',
    },
  },
  {
    id: 'series',
    name: t('dimensions.series'),
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
]
