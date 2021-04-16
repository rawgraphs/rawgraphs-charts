export const dimensions = [
  {
    id: 'xValue',
    name: 'X Axis',
    operation: 'get',
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'size',
    name: 'Size',
    operation: 'get',
    validTypes: ['number', 'date'],
    required: false,
  },
  {
    id: 'color',
    name: 'Color',
    operation: 'get',
    validTypes: ['number', 'string', 'date'],
    required: false,
  },
  {
    id: 'label',
    name: 'Label',
    validTypes: ['number', 'date', 'string'],
    required: false,
    multiple: true,
  },
  {
    id: 'series',
    name: 'Groups',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
]
