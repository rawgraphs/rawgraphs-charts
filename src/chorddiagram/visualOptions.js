export const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 50,
    group: 'artboard',
  },

  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 50,
    group: 'artboard',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 50,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard',
  },

  ringWidth: {
    type: 'number',
    label: 'Ring width',
    default: 10,
    group: 'chart',
  },

  chordPadding: {
    type: 'number',
    label: 'Groups padding',
    default: 10,
    group: 'chart',
  },

  ribbonPadding: {
    type: 'number',
    label: 'Chords padding',
    default: 1,
    group: 'chart',
  },

  chordPaddingSource: {
    type: 'number',
    label: 'Source inner padding',
    default: 1,
    group: 'chart',
  },

  chordPaddingTarget: {
    type: 'number',
    label: 'Target inner padding',
    default: 5,
    group: 'chart',
  },

  sortNodesBy: {
    type: 'text',
    label: 'Sort groups by',
    group: 'chart',
    options: [
      { label: 'Size (descending)', value: 'totalDescending' },
      { label: 'Size (ascending)', value: 'totalAscending' },
      { label: 'None', value: 'none' },
    ],
    default: 'none',
  },

  sortRibbonsBy: {
    type: 'text',
    label: 'Sort chords by',
    group: 'chart',
    options: [
      { label: 'Size (descending)', value: 'totalDescending' },
      { label: 'Size (ascending)', value: 'totalAscending' },
      { label: 'None', value: 'none' },
    ],
    default: 'none',
  },

  showHeads: {
    type: 'boolean',
    label: 'Show arrow heads',
    default: true,
    group: 'chart',
  },

  headRadius: {
    disabled: {
      showHeads: false,
    },
    type: 'number',
    label: 'Arrows heads radius',
    default: 20,
    group: 'chart',
  },

  chordColors: {
    type: 'colorScale',
    label: 'Chord Colors',
    dimension: 'source',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },

  chordOpacity: {
    type: 'number',
    label: 'Chord opacity',
    default: 0.7,
    min: 0.1,
    max: 1,
    step: 0.05,
    group: 'colors',
  },

  showChordGroupLabels: {
    type: 'boolean',
    label: 'Show Chord Group Labels',
    default: true,
    group: 'labels',
  },

  showValues: {
    type: 'boolean',
    label: 'Show nodes values',
    default: true,
    group: 'labels',
  },
}
