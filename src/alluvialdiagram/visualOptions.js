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

  nodesWidth: {
    type: "number",
    label: "Bars width (px)",
    default: 5,
    group: "chart",
  },

  nodesPadding: {
    type: "number",
    label: "Vertical padding (px)",
    default: 5,
    group: "chart",
  },

	linksOpacity: {
		type: "number",
    label: "Links opacity (0-1)",
    default: 1,
    group: "chart",
	},

	sortNodesBy: {
    type: "text",
    label: "Vertically sort bars by",
    group: "chart",
    options: ["Total value (descending)", "Total value (ascending)", "Name", "Minimize Overlaps"],
    default: "Total value (ascending)"
  },

	verticalAlignment: {
    type: "text",
    label: "Align bars groups vertically",
    group: "chart",
    options: ["Top", "Center", "Bottom"],
    default: "Center"
  },

}
