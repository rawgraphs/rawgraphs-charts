import barchart from 'rawcharts/barchart'
import data from '../datasets/multiset-test.tsv'

export default {
  chart: barchart,
  data,
  dataTypes: {
    date: { type: 'date', dateFormat: 'YYYY-MM-DD' },
    first: 'number',
    second: 'number',
  },
  mapping: {
    series: { value: [] },
    bars: { value: ['date'], config: { aggregation: ['sum'] } },
    size: { value: ['first'] },
    color: { value: ['second'] },
  },
  visualOptions: {
    width: 1000,
    height: 700,
    padding: 3,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 50,
    sortSeriesBy: 'Value (descending)',
    barsOrientation: 'horizontal',
  },
}
