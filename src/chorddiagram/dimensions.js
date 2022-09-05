/*
Copied from:
https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/arcdiagram/dimensions.js
*/

export const dimensions = [
  {
    id: 'source',
    name: 'Source node',
    validTypes: ['number', 'date', 'string'],
    required: true,
  },
  {
    id: 'target',
    name: 'Target node',
    validTypes: ['number', 'date', 'string'],
    required: true,
  },
  {
    id: 'size',
    name: 'Size',
    validTypes: ['number'],
    required: false,
    aggregation: true,
    aggregationDefault: 'sum',
  },
]