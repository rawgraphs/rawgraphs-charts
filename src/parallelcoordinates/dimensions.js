import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'dimensions',
    name: t('dimensions.dimensions'),
    validTypes: ['number', 'date'],
    required: true,
    multiple: true,
  },
  {
    id: 'color',
    name: t('dimensions.color'),
    validTypes: ['number', 'date', 'string'],
    required: false,
  },
]
