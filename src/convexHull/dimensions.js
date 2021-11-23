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
    id: 'group',
    name: t('dimensions.group'),
    validTypes: ['string'],
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
