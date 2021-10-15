import chart from 'rawcharts/slopechart'
import data from '../datasets/government-receipts-of-gdp.csv'

export default {
  chart: chart,
  data,
  dataTypes: {
    country: 'string',
    1970: 'number',
    1979: 'number',
  },
  mapping: {
    source: { value: ['1970'] },
    target: { value: ['1979'] },
    // name: { value: ['country'] },
    color: { value: ['country'] },
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
