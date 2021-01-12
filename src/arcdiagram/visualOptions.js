export const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard',
  },

  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard',
  },

  minRadius: {
    type: 'number',
    label: 'Minimum Radius',
    default: 2,
    group: 'chart',
  },

  maxRadius: {
    type: 'number',
    label: 'Maxiumum Radius',
    default: 30,
    group: 'chart',
  },

  linkOpacity: {
    type: 'number',
    label: 'Links opacity',
    default: 0.5,
    group: 'chart',
  },

  sameSide: {
    type: 'boolean',
    label: 'Arcs only on the top',
    default: false,
    group: 'chart',
  },

  nodeSize: {
    type: 'text',
    label: 'Nodes size',
    group: 'chart',
    options: [
      'Same size',
      'Total value',
      'Total outgoing value',
      'Total incoming value',
      'Links count',
      'Outgoing links count',
      'Incoming links count',
    ],
    default: 'Total value',
  },

  orderNodesBy: {
    type: 'text',
    label: 'Nodes order',
    group: 'chart',
    options: [
      'Name',
      'Links count (degree)',
      'Total value',
      'Minimize overlaps',
    ],
    default: 'Minimize overlaps',
  },
}
