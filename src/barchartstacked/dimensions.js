export const dimensions = [
  {
    id: 'bars',
    name: 'Groups',
    validTypes: ['number', 'string', 'date'],
    required: true,
    operation: 'get',
  },

  {
    id: 'stacks',
    name: 'X Axis',
    validTypes: ['number', 'string', 'date'],
    required: true,
    operation: 'get',
  },

  {
    id: 'size',
    name: 'size',
    operation: 'get',
    validTypes: ['number'],
    required: false,
    aggregation: true,
    aggregationDefault: 'sum',
  },

  {
    id: 'series',
    name: 'series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
]
