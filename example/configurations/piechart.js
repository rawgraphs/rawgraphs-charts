import chart from 'rawcharts/piechart'
import data from '../datasets/gdp.tsv'

export default {
  chart: chart,
  data,
  dataTypes: {
    'Service (US$MM)': 'number',
    'Industrial (US$MM)': 'number',
    'Agricultural (US$MM)': 'number',
    Country: 'string',
  },
  mapping: {
    // series: { value: ['Country'] },
    series: { value: [] },
    arcs: {
      value: ['Service (US$MM)', 'Industrial (US$MM)', 'Agricultural (US$MM)'],
      config: { aggregation: ['sum', 'sum', 'sum'] },
    },
  },
  visualOptions: {
    width: 800,
    height: 600,
    marginTop: 20,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    showSeriesLabels: true,
    showLegend: true,
    drawDonut: true,
    sortPiesBy: 'totalDescending',
    showGrid: true,
    showArcValues: true,
    sortArcsBy: 'totalDescending',
  },
}
