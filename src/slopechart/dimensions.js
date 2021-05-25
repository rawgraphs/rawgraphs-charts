export const dimensions = [
  {
    id: 'source',
    name: 'Source',
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'target',
    name: 'Target',
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'name',
    name: 'Label',
    validTypes: ['number', 'date', 'string'],
    required: false,
  },
  {
    id: 'color',
    name: 'Color',
    validTypes: ['number', 'date', 'string'],
    required: false,
  },
  {
    id: 'series',
    name: 'Series',
    validTypes: ['number', 'string', 'date'],
    required: false,
  },
]
