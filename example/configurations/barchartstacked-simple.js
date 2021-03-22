import barchartstacked from 'rawcharts/barchartstacked'
import data from '../datasets/letters-freq.tsv'

export default {
  chart: barchartstacked,
  data,
  dataTypes: {
    Letter: 'string',
    Language: 'string',
    'Frequency (%)': 'number',
  },
  mapping: {
    stacks: { value: ['Letter'] },
    bars: {
      value: ['Frequency (%)'],
      config: { aggregation: ['sum'] },
    },
    series: { value: ['Language'] },
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
    sortSeriesBy: 'valueDescending',
    useSameScale: false,
  },
}
