export const axisLabel = {
  'font-family': 'Arial, sans-serif',
  'font-size': 12,
  fill: 'black',
  'font-weight': 'bold',
}

export const labelPrimary = {
  'font-family': 'Arial, sans-serif',
  'font-size': 10,
  fill: 'black',
  'font-weight': 'bold',
}

export const labelSecondary = {
  'font-family': 'Arial, sans-serif',
  'font-size': 10,
  fill: 'black',
  'font-weight': 'normal',
}

export const labelItalic = {
  'font-family': 'Arial, sans-serif',
  'font-size': 10,
  fill: 'black',
  'font-weight': 'normal',
  'font-style': 'italic',
}

export const labelOutline = {
  'stroke-width': 2,
  'paint-order': 'stroke',
  stroke: 'white',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
}

export const multiStyles = function (styles) {
  return function (selection) {
    for (const property in styles) {
      selection.style(property, styles[property])
    }
  }
}
