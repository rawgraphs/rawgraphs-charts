import barchart from 'rawcharts/barchartmultiset'
import data from '../datasets/simple-barchart.tsv'

export default {
  chart: barchart,
  data,
  dataTypes: {
    category: 'string',
    bar: 'string',
    value: 'number',
  },
  mapping: {
    sets: { value: ['bar'] },
    bars: { value: ['category'] },
    size: { value: ['value'] },
    color: { value: ['category'] },
  },
  visualOptions: {
    width: 1000,
    height: 700,
    padding: 3,
    marginTop: 20,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    sortSeriesBy: 'Value (descending)',
  },
}
