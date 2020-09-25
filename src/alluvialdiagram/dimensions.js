export const dimensions = [
  {
    id: 'steps',
    name: 'steps',
    validTypes: ['number', 'date', 'string'],
    required: true,
    multiple: true,
  },
  {
    id: 'size',
    name: 'size',
    validTypes: ['number'],
    required: false,
    aggregation: true,
    aggregationDefault: 'sum',
  },
]
