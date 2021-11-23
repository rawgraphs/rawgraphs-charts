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
  }, // {
  //   id: 'weight',
  //   name: 'Density weight',
  //   validTypes: ['number'],
  //   required: false,
  // },
]
