export const dimensions = [
  {
    id: 'value',
    name: 'Value',
    validTypes: ['number'],
    required: true,
  },

  {
    id: 'group',
    name: 'Group',
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
