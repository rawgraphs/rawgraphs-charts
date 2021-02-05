import barchart from 'rawcharts/barchartmultiset'
import data from '../datasets/letters-freq.tsv'

export default {
  chart: barchart,
  data,
  dataTypes: {
    Letter: 'string',
    Language: 'string',
    'Frequency (%)': 'number',
  },
  mapping: {
    groups: { value: ['Letter'] },
    bars: {
      value: ['Frequency (%)'],
      config: { aggregation: ['sum'] },
    },
    series: { value: ['Language'] },
  },
  visualOptions: {
    width: 1000,
    height: 700,
    padding: 0,
    setsPadding: 1,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    sortSeriesBy: 'Value (descending)',
    useSameScale: false,
  },
}
