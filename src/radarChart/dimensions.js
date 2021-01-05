export const dimensions = [
  {
    id: 'axes',
    name: 'spokes',
    validTypes: ['number', 'date'],
    required: true,
    multiple: true,
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
