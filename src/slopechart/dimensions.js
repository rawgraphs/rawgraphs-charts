import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'source',
    name: t('dimensions.source'),
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'target',
    name: t('dimensions.target'),
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'name',
    name: t('dimensions.name'),
    validTypes: ['number', 'date', 'string'],
    required: false,
  },
  {
    id: 'color',
    name: t('dimensions.color'),
    validTypes: ['number', 'date', 'string'],
    required: false,
  },
  {
    id: 'series',
    name: t('dimensions.series'),
    validTypes: ['number', 'string', 'date'],
    required: false,
  },
]
