import barchart from 'rawcharts/barchart'
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
    series: { value: ['category'] },
    bars: { value: ['bar'] },
    size: { value: ['value'] },
    color: { value: ['category'] },
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
