import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'axes',
    name: t('dimensions.axes'),
    validTypes: ['number'],
    required: true,
    multiple: true,
    minValues: 3,
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
