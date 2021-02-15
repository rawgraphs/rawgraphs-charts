export const dimensions = [
  {
    id: 'x',
    name: 'X Axis',
    operation: 'get',
    validTypes: ['number', 'date'],
    required: true,
  },

  {
    id: 'size',
    name: 'Size',
    operation: 'get',
    validTypes: ['number'],
    aggregation: true,
    aggregationDefault: 'sum',
  },

  {
    id: 'streams',
    name: 'Streams',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },

  {
    id: 'series',
    name: 'Series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
]
