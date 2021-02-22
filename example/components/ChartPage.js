import React, { useState, useEffect } from "react"
import ChartPreview from "./ChartPreview"
import ChartList from "./ChartList"

const ChartPage = ({ match }) => {
  const confName = match.params.confName
  const [chartInfo, setChartInfo] = useState(null)

  useEffect(() => {
    import(`../configurations/${confName}`).then(result => {
      setChartInfo(result.default)
    })
  }, [confName])

  if (!chartInfo) {
    return null
  }

  return (
    <div className="chart-page">
      <ChartList />
      <div className="chart-preview">
        <ChartPreview {...chartInfo} />
      </div>
    </div>
  )
}

export default ChartPage