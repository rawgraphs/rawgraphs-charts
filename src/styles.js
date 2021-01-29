import { selection, select, transition } from 'd3'
selection.prototype.styles = styles
transition.prototype.styles = styles

//other approach
// export const multiStyles = function (styles) {
//   return function (selection) {
//     for (const property in styles) {
//       selection.style(property, styles[property])
//     }
//   }
// }

//adapted from https://github.com/gka/d3-jetpack/blob/master/src/st.js
function styles(name, value) {
  if (typeof name == 'object') {
    for (var key in name) {
      addStyle(this, key, name[key])
    }
    return this
  } else if (typeof name === 'function') {
    return this.each(styleFunction(name))
  } else {
    return arguments.length == 1
      ? this.style(name)
      : addStyle(this, name, value)
  }

  function addStyle(sel, style, value) {
    style = style.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()

    var pxStyles =
      'top left bottom right padding-top padding-left padding-bottom padding-right border-top b-width border-left-width border-botto-width m border-right-width margin-top margin-left margin-bottom margin-right font-size width stroke-width line-height margin padding border border-radius max-width min-width max-height min-height'

    if (~pxStyles.indexOf(style)) {
      sel.style(
        style,
        typeof value == 'function' ? wrapPx(value) : addPx(value)
      )
    } else {
      sel.style(style, value)
    }

    return sel
  }

  function addPx(d) {
    return d.match ? d : d + 'px'
  }
  function wrapPx(fn) {
    return function () {
      var val = fn.apply(this, arguments)
      return addPx(val)
    }
  }
  function styleFunction(value) {
    return function () {
      var v = value.apply(this, arguments)
      for (var key in v) {
        addStyle(select(this), key, v[key])
      }
    }
  }
}
