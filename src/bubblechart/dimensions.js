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
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'size',
    name: t('dimensions.size'),
    validTypes: ['number'],
    required: false,
  },
  {
    id: 'color',
    name: t('dimensions.color'),
    validTypes: ['number', 'date', 'string'],
    required: false,
  },
  {
    id: 'connectedBy',
    name: t('dimensions.connectedBy'),
    validTypes: ['number', 'date'],
    required: false,
  },
  {
    id: 'label',
    name: t('dimensions.label'),
    validTypes: ['number', 'date', 'string'],
    required: false,
    multiple: true,
  },
]
