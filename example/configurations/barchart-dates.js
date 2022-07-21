import barchart from 'rawcharts/barchart'
import data from '../datasets/stacked-simple-dates.tsv'

export default {
  chart: barchart,
  data,
  dataTypes: {
    date: { type: 'date', dateFormat: 'YYYY-MM-DD' },
    first: 'number',
    second: 'number',
  },
  mapping: {
    bars: { value: ['date'] },
    size: {
      value: 'first',
    },
  },
  visualOptions: {
    width: 600,
    height: 400,
    padding: 0,
    setsPadding: 1,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 40,
  },
}
