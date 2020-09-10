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

	sizeOnlyLeaves: {
    type: "boolean",
    label: "Size only leaf nodes",
    default: true,
    group: "chart",
  },

	label1Style: {
		type: "text",
		label: "Labels 1 style",
		group: "labels",
		options: ["Primary", "Secondary", "Tertiary"],
		default: "Primary"
	},

	label2Style: {
		type: "text",
		label: "Labels 1 style",
		group: "labels",
		options: ["Primary", "Secondary", "Tertiary"],
		default: "Secondary"
	},

	label3Style: {
		type: "text",
		label: "Labels 1 style",
		group: "labels",
		options: ["Primary", "Secondary", "Tertiary"],
		default: "Tertiary"
	},

	colorScale : {
    type: 'colorScale',
    label: 'The color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral'
    },
    group: 'color'
  },

}
