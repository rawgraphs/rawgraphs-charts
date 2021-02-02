export const dimensions = [
  {
    id: 'axes',
    name: 'Spokes',
    validTypes: ['number'],
    required: true,
    multiple: true,
    minValues: 3,
    aggregation: true,
    aggregationDefault: {
      number: 'sum',
      string: 'csvDistinct',
      date: 'csvDistinct',
    },
  },

  {
    id: 'name',
    name: 'Name',
    validTypes: ['number', 'string', 'date'],
    required: false,
  },

  {
    id: 'color',
    name: 'Color',
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
    name: 'Series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
]
