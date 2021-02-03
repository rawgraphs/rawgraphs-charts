import barchart from 'rawcharts/barchartmultiset'
import data from '../datasets/fake-multiset.tsv'

export default {
  chart: barchart,
  data,
  dataTypes: {
    group: 'string',
    Value_1: 'number',
    Value_2: 'number',
    Value_3: 'number',
  },
  mapping: {
    groups: { value: ['group'] },
    bars: {
      value: ['Value_1', 'Value_2', 'Value_3'],
      config: { aggregation: ['sum', 'sum', 'sum'] },
    },
    // series: { value: ['Language'] },
  },
  visualOptions: {
    width: 1000,
    height: 700,
    padding: 3,
    stacksPadding: 0,
    marginTop: 50,
    marginBottom: 50,
    marginRight: 50,
    marginLeft: 50,
    sortSeriesBy: 'Value (descending)',
    useSameScale: false,
  },
}
