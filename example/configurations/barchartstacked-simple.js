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
    },
    series: { value: ['Language'] },
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
