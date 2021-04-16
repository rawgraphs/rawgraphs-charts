export const dimensions = [
  {
    id: 'value',
    name: 'Y Axis',
    validTypes: ['number'],
    required: true,
  },

  {
    id: 'group',
    name: 'Groups',
    validTypes: ['number', 'date', 'string'],
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
]
