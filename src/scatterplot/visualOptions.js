export const visualOptions = {
  
  xOrigin : {
    type: 'boolean',
    label: 'Set x origin to 0',
    default: false,
    group: 'chart'
  },

  yOrigin : {
    type: 'boolean',
    label: 'Set y origin to 0',
    default: false,
    group: 'chart'
  },

  maxRadius : {
    type: 'number',
    label: 'Max radius (px)',
    default: 10,
    step: 'any',
    group: 'chart'
  },

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

}


// showLegend,
// legendWidth,
// marginTop = 20,
// marginRight = 20,
// marginBottom = 20,
// marginLeft = 20