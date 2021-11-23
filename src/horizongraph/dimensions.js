import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'x',
    name: t('dimensions.x'),
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'y',
    name: t('dimensions.y'),
    validTypes: ['number'],
    aggregation: true,
    aggregationDefault: 'sum',
    required: false,
  },
  {
    id: 'group',
    name: t('dimensions.group'),
    validTypes: ['number', 'date', 'string'],
    required: false,
  },
]
