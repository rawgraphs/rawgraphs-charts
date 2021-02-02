export const dimensions = [
  {
    id: 'steps',
    name: 'steps',
    validTypes: ['number', 'date', 'string'],
    required: true,
    multiple: true,
    minValues: 2,
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
