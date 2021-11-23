import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'steps',
    name: t('dimensions.steps'),
    validTypes: ['number', 'date', 'string'],
    required: true,
    multiple: true,
    minValues: 2,
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
