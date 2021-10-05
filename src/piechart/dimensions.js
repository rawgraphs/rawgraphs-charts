export const dimensions = [
  {
    id: 'arcs',
    name: 'Arcs',
    validTypes: ['number'],
    required: true,
    multiple: true,
    operation: 'get',
    aggregation: true,
    aggregationDefault: {
      number: 'sum',
    },
  },

  {
    id: 'series',
    name: 'Series',
    validTypes: ['number', 'date', 'string'],
    required: false,
    operation: 'get',
  },
]
