import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'startDate',
    name: t('dimensions.startDate'),
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'endDate',
    name: t('dimensions.endDate'),
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
    id: 'color',
    name: t('dimensions.color'),
    validTypes: ['string'],
    required: false,
  },
]
