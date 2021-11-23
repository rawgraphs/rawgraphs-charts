import { t } from '@rawgraphs/rawgraphs-core'

export const dimensions = [
  {
    id: 'xValue',
    name: t('dimensions.xValue'),
    operation: 'get',
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'size',
    name: t('dimensions.size'),
    operation: 'get',
    validTypes: ['number', 'date'],
    required: false,
  },
  {
    id: 'color',
    name: t('dimensions.color'),
    operation: 'get',
    validTypes: ['number', 'string', 'date'],
    required: false,
  },
  {
    id: 'label',
    name: t('dimensions.label'),
    validTypes: ['number', 'date', 'string'],
    required: false,
    multiple: true,
  },
  {
    id: 'series',
    name: t('dimensions.group'),
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
]
