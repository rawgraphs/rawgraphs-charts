import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'value',
    name: t('dimensions.value'),
    validTypes: ['number'],
    required: true,
  },
  {
    id: 'group',
    name: t('dimensions.group'),
    validTypes: ['number', 'date', 'string'],
    required: false,
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
]
