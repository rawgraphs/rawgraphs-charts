export const dimensions = [
  {
    id: 'x',
    name: 'x axis',
    validTypes: ['number', 'date'],
    required: true,
  },

  {
    id: 'y',
    name: 'y axis',
    validTypes: ['number'],
    aggregation: true,
    aggregationDefault: 'sum',
    required: false,
  },

  {
    id: 'group',
    name: 'Groups',
    validTypes: ['number', 'date', 'string'],
    required: false,
  },
]
