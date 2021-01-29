export const dimensions = [
  {
    id: 'source',
    name: 'source node',
    validTypes: ['number', 'date', 'string'],
    required: true,
  },
  {
    id: 'target',
    name: 'target node',
    validTypes: ['number', 'date', 'string'],
    required: true,
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
