export const dimensions = [
  {
    id: 'x',
    name: 'X Axis',
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'y',
    name: 'Y Axis',
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'color',
    name: 'Color',
    validTypes: ['number', 'date', 'string'],
    required: false,
  },
  {
    id: 'label',
    name: 'Label',
    validTypes: ['number', 'date', 'string'],
    required: false,
    multiple: true,
  },
]
