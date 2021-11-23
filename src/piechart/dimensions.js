import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'arcs',
    name: t('dimensions.arcs'),
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
    validTypes: ['number', 'date', 'string'],
    required: false,
    operation: 'get',
  },
]
