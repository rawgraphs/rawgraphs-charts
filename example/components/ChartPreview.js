import React, { useRef, useEffect } from "react"
import { chart as rawChart, parseDataset } from "@rawgraphs/rawgraphs-core"

const ChartPreview = ({ chart, data, mapping, dataTypes, visualOptions }) => {

  const domRef = useRef(null)

  useEffect(() => {
    const { dataset } = parseDataset(data, dataTypes)
    const viz = rawChart(chart, {
      data: dataset,
      mapping,
      dataTypes,
      visualOptions,
    })
    viz.renderToDOM(domRef.current)
  }, [chart, data, mapping, dataTypes, visualOptions])

  return (
    <div ref={domRef} className="chart-container"></div>
  )
}

export default ChartPreview