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

// Compute tick values for continuous scales with optional outer ticks.
export const getAxisTickValues = ({
  scale,
  auto = true,
  amount,
  outer = false,
}) => {
  const hasTicks = typeof scale.ticks === 'function'

  if (auto) {
    return hasTicks ? scale.ticks() : scale.domain?.() ?? []
  }

  if (outer) {
    const ticks = hasTicks ? scale.ticks(amount) : scale.domain?.() ?? []
    const domain = scale.domain?.() ?? []
    return getUniqueTicks(ticks.concat(domain))
  }

  return hasTicks ? scale.ticks(amount) : scale.domain?.() ?? []
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
  position = 'bottom',
}) => {
  const tickValues = getAxisTickValues({
    scale: xScale,
    auto: xTicksAuto ?? true,
    amount: xTicksAmount,
    outer: xTicksOuter ?? false,
  })

  const axis = d3.axisBottom(xScale).tickValues(tickValues)

  if (tickSizeOuter !== undefined) {
    axis.tickSizeOuter(tickSizeOuter)
  }

  return (g) =>
    g
      .attr(
        'transform',
        `translate(0,${
          position === 'top'
            ? 0
            : yDomain[0] >= 0
            ? serieHeight
            : yScale(0)
        })`
      )
      .call(position === 'top' ? d3.axisTop(xScale).tickValues(tickValues) : axis)
      .call((selection) => {
        if (!label) return
        selection
          .append('text')
          .attr('x', position === 'top' ? 0 : serieWidth)
          .attr('dy', position === 'top' ? -5 : -5)
          .attr('text-anchor', position === 'top' ? 'start' : 'end')
          .attr('display', showLabel ? null : 'none')
          .text(label)
          .styles(axisLabelStyles)
      })
}

// Reusable left axis for continuous charts with optional label.
export const createYAxis = ({
  yScale,
  xOffset = 0,
  yTicksAuto = true,
  yTicksAmount,
  yTicksOuter = false,
  label,
  showLabel = true,
  axisLabelStyles = {},
  tickSizeOuter,
}) => {
  const tickValues = getAxisTickValues({
    scale: yScale,
    auto: yTicksAuto ?? true,
    amount: yTicksAmount,
    outer: yTicksOuter ?? false,
  })

  const axis = d3.axisLeft(yScale).tickValues(tickValues)

  if (tickSizeOuter !== undefined) {
    axis.tickSizeOuter(tickSizeOuter)
  }

  return (g) =>
    g
      .attr('transform', `translate(${xOffset},0)`)
      .call(axis)
      .call((selection) => {
        if (!label) return
        selection
          .append('text')
          .attr('x', 4)
          .attr('text-anchor', 'start')
          .attr('dominant-baseline', 'hanging')
          .attr('display', showLabel ? null : 'none')
          .text(label)
          .styles(axisLabelStyles)
      })
}
