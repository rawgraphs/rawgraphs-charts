import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'hierarchy',
    name: t('dimensions.hierarchy'),
    validTypes: ['number', 'date', 'string'],
    required: true,
    multiple: true,
  },
  {
    id: 'size',
    name: t('dimensions.size'),
    validTypes: ['number'],
    required: false,
    aggregation: true,
    aggregationDefault: 'sum',
  },
  {
    id: 'color',
    name: t('dimensions.color'),
    validTypes: ['number', 'date', 'string'],
    required: false,
    aggregation: true,
    aggregationDefault: {
      number: 'sum',
      string: 'csvDistinct',
      date: 'csvDistinct',
    },
  },
  {
    id: 'label',
    name: t('dimensions.label'),
    validTypes: ['number', 'date', 'string'],
    required: false,
    multiple: true,
    aggregation: true,
    aggregationDefault: 'csvDistinct',
  },
]
