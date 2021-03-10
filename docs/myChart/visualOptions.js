export const visualOptions = {
  // one object for each visual option
  // example option
  // optionID: {                // unique id, used in the render.js
  //   type: 'number',          // type of input. Can be: number, text, boolean, colorScale
  //   label: 'Option label',   // the label displayed in the interface
  //   default: 20,             // default value
  //   group: 'Panel name',        // in which panel of the interface the option will be displayed
  // },

  dotsRadius: {
    type: 'number',
    label: 'Dots radius',
    default: 5,
    group: 'chart',
  },

  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'color',
  },
}
