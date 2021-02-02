export const dimensions = [
  {
    id: 'stacks',
    name: 'X Axis',
    validTypes: ['number', 'string', 'date'],
    required: true,
    operation: 'get',
  },

  {
    id: 'bars',
    name: 'Sizes',
    validTypes: ['number'],
    required: true,
    multiple: true,
    operation: 'get',
    // aggregation: true,
    // aggregationDefault: {
    //   number: 'sum',
    // }, @TODO: allow aggregation on multiple values
  },

  {
    id: 'series',
    name: 'Series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
]
