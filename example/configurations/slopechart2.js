import chart from 'rawcharts/slopechart'
import data from '../datasets/slope_football.tsv'

export default {
  chart: chart,
  data,
  dataTypes: {
    Teams: 'string',
    '2018-2019': 'number',
    '2019-2020': 'number',
    Difference: 'number',
    Status: 'string',
    Championship: 'string',
  },
  mapping: {
    source: { value: ['2018-2019'] },
    target: { value: ['2019-2020'] },
    name: { value: ['Teams'] },
    color: { value: ['Difference'] },
    series: { value: [] },
    // series: { value: ['Championship'] },
  },
  visualOptions: {
    width: 800,
    height: 600,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 50,
    showLegend: false,
  },
}
