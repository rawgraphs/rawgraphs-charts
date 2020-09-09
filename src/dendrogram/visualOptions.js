export const visualOptions = {

  marginTop : {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard',
  },

  marginRight : {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard',
  },

  marginBottom : {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard',
  },

  marginLeft : {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard',
  },

  colorScale : {
    type: 'colorScale',
    label: 'The color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'chart'
  },

	maxRadius: {
		type: 'number',
		label: 'Maximum radius',
		default: 20,
		group: 'chart'
	},

	layout: {
    type: "text",
    label: "Layout algorythm",
    group: "chart",
    options: ["Cluster Dendogram", "Tree"],
    default: "Tree"
  },

	separationStress: {
		type: 'number',
		label: 'Separation multiplier',
		default: 2,
		group: 'chart'
	},

}
