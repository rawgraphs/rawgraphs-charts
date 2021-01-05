export const dimensions = [
  {
    id: 'groups',
    name: 'groups',
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
    name: 'series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
]
