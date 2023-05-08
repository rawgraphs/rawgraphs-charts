import barchart from 'rawcharts/barchartmultiset'
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
    groups: {
      value: ['date'],
    },
    bars: {
      value: ['first'],
      config: { aggregation: ['sum'] },
    },
  },
  visualOptions: {
    // width: 600,
    // height: 400,
    // padding: 0,
    // setsPadding: 1,
    // sortSeriesBy: 'Value (descending)',
    // useSameScale: false,
  },
}
