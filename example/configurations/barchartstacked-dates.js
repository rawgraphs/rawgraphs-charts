import barchartstacked from 'rawcharts/barchartstacked'
import data from '../datasets/multiset-test.tsv'

export default {
  chart: barchartstacked,
  data,
  dataTypes: {
    date: { type: 'date', dateFormat: 'YYYY-MM-DD' },
    first: 'number',
    second: 'number',
  },
  mapping: {
    stacks: { value: ['date'] },
    bars: {
      value: ['first', 'second'],
      config: { aggregation: ['sum', 'sum'] },
    },
  },
  visualOptions: {
    width: 1000,
    height: 700,
    padding: 3,
    stacksPadding: 0,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    sortSeriesBy: 'name',
    useSameScale: true,
  },
}
