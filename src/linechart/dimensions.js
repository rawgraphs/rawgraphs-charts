export const dimensions = [
  {
    id: 'x',
    name: 'x',
    operation: 'get',
    validTypes: ['number', 'date'],
    required: true,
  },

  {
    id: 'y',
    name: 'y',
    operation: 'get',
    validTypes: ['number', 'date'],
    required: true,
    aggregation: true,
    aggregationDefault: 'sum',
  },

  {
    id: 'lines',
    name: 'lines',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },

  {
    id: 'color',
    name: 'color',
    operation: 'get',
    validTypes: ['number', 'string', 'date'],
    required: false,
    aggregation: true,
    aggregationDefault: {
      number: 'sum',
      string: 'csvDistinct',
      date: 'csvDistinct',
    },
  },

  {
    id: 'series',
    name: 'series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
]
