import React from "react"
import { Link } from "react-router-dom"
import preval from 'babel-plugin-preval/macro'

const configurations = preval`
  const fs = require('fs');
  module.exports = fs.readdirSync(__dirname + '/../configurations').filter(item => item[0] !== '.');
`

const ChartList = ({ props }) => {
  return (
    <div className="chart-list">
      {configurations.map(conf => {
        const confName = conf.replace(".js", "")
        return (
          <div key={confName}>
            <Link to={`/${confName}`}>{confName}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default ChartList