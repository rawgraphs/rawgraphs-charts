export const visualOptions = {
  
   
  showPoints : {
    type: 'boolean',
    label: 'Show points',
    default: false,
    group: 'chart'
  },

  pointsRadius : {
    type: 'number',
    label: 'Points radius (px)',
    default: 5,
    group: 'chart',
    //#TODO: not implemented in lib/frontend
    disabled: {
      showPoints: false
    }
  },

  interpolation: {
    type: "text",
    label: "Interpolation",
    default: "Cardinal",
    options: [
      "Basis",
      "Bundle",
      "Cardinal",
      "Catmull–Rom",
      "Linear",
      "Monotone X",
      "Natural",
      "Step",
      "Step After",
      "Step Before",
    ],
    group: "chart",
  },

  strokeWidth: {
    type: "number",
    label: "Stroke width",
    default: 1.5,
    options: [
      { label: 'light', value: 1 },
      { label: 'medium', value: 1.5 },
      { label: 'bold', value: 3 },
    ],
    group: "chart",
  },

}


// showLegend,
// legendWidth,
// marginTop = 20,
// marginRight = 20,
// marginBottom = 20,
// marginLeft = 20