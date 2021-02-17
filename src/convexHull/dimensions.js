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
    id: 'group',
    name: 'Group',
    validTypes: ['string'],
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
