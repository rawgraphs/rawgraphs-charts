import * as d3 from 'd3'
import './d3-styles'

// Remove duplicate tick values when concatenating scale ticks with domains.
// Coerces to number to work consistently with time scales.
export const getUniqueTicks = (values) => {
  const seen = new Set()
  return values.filter((value) => {
    const key = +value
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

// Compute tick values for temporal/continuous scales with optional outer ticks.
export const getTemporalTickValues = ({
  xScale,
  xTicksAuto = true,
  xTicksAmount,
  xTicksOuter = false,
}) => {
  if (xTicksAuto) {
    return xScale.ticks()
  }

  if (xTicksOuter) {
    return getUniqueTicks(xScale.ticks(xTicksAmount).concat(xScale.domain()))
  }

  return xScale.ticks(xTicksAmount)
}

// Reusable bottom axis for temporal charts, including baseline handling and label.
export const createXAxis = ({
  xScale,
  yScale,
  serieHeight,
  serieWidth,
  yDomain,
  xTicksAuto,
  xTicksAmount,
  xTicksOuter,
  label,
  showLabel = true,
  axisLabelStyles = {},
  tickSizeOuter,
}) => {
  const tickValues = getTemporalTickValues({
    xScale,
    xTicksAuto,
    xTicksAmount,
    xTicksOuter,
  })

  const axis = d3.axisBottom(xScale).tickValues(tickValues)

  if (tickSizeOuter !== undefined) {
    axis.tickSizeOuter(tickSizeOuter)
  }

  return (g) =>
    g
      .attr(
        'transform',
        `translate(0,${yDomain[0] >= 0 ? serieHeight : yScale(0)})`
      )
      .call(axis)
      .call((selection) => {
        if (!label) return
        selection
          .append('text')
          .attr('x', serieWidth)
          .attr('dy', -5)
          .attr('text-anchor', 'end')
          .attr('display', showLabel ? null : 'none')
          .text(label)
          .styles(axisLabelStyles)
      })
}
