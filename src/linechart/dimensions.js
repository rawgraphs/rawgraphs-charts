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
    id: 'y',
    name: t('dimensions.y'),
    operation: 'get',
    validTypes: ['number', 'date'],
    required: true,
    aggregation: true,
    aggregationDefault: 'sum',
  },
  {
    id: 'lines',
    name: t('dimensions.lines'),
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
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
