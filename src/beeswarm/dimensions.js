export const dimensions = [
  {
    id: 'xValue',
    name: 'x axis',
    operation: 'get',
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'size',
    name: 'size',
    operation: 'get',
    validTypes: ['number', 'date'],
    required: false,
  },
  {
    id: 'color',
    name: 'color',
    operation: 'get',
    validTypes: ['number', 'string', 'date'],
    required: false,
  },
  {
    id: 'label',
    name: 'label',
    validTypes: ['number', 'date', 'string'],
    required: false,
    multiple: false,
  },
  {
    id: 'series',
    name: 'series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
]
