import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'stacks',
    name: t('dimensions.stacks'),
    validTypes: ['number', 'string', 'date'],
    required: true,
    operation: 'get',
  },
  {
    id: 'bars',
    name: t('dimensions.size'),
    validTypes: ['number'],
    required: true,
    multiple: true,
    operation: 'get',
    aggregation: true,
    aggregationDefault: {
      number: 'sum',
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
