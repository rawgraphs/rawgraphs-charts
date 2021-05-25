export const dimensions = [
  {
    id: 'name',
    name: 'Pie label',
    validTypes: ['number', 'date', 'string'],
    required: false,
  },

  {
    id: 'arcs',
    name: 'Arcs',
    validTypes: ['number'],
    required: true,
    multiple: true,
  },
]
