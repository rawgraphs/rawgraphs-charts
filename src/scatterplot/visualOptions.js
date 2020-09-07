export const visualOptions = {
  marginTop: {
    type: "number",
    label: "Margin (top)",
    default: 10,
    group: "artboard",
  },

  marginRight: {
    type: "number",
    label: "Margin (right)",
    default: 10,
    group: "artboard",
  },

  marginBottom: {
    type: "number",
    label: "Margin (bottom)",
    default: 10,
    group: "artboard",
  },

  marginLeft: {
    type: "number",
    label: "Margin (left)",
    default: 10,
    group: "artboard",
  },

  showLegend: {
    type: "boolean",
    label: "Show legend",
    default: false,
    group: "artboard",
  },

  legendWidth: {
    type: "number",
    label: "Legend width",
    default: 200,
    group: "artboard",
    disabled: {
      showLegend: false,
    },
  },

  xOrigin: {
    type: "boolean",
    label: "Set x origin to 0",
    default: false,
    group: "chart",
  },

  yOrigin: {
    type: "boolean",
    label: "Set y origin to 0",
    default: false,
    group: "chart",
  },

  maxRadius: {
    type: "number",
    label: "Max radius (px)",
    default: 10,
    step: "any",
    group: "chart",
  },

  showPoints: {
    type: "boolean",
    label: "Show points",
    default: false,
    group: "chart",
  },

  pointsRadius: {
    type: "number",
    label: "Points radius (px)",
    default: 5,
    group: "chart",
    //#TODO: not implemented in lib/frontend
    disabled: {
      showPoints: false,
    },
  },

  colorScale: {
    type: "colorScale",
    label: "The color scale",
    dimension: "color",
    default: {
      scaleType: "ordinal",
      interpolator: "interpolateSpectral",
    },
    group: "chart",
  },
};
