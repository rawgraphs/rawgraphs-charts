import barchartstacked from 'rawcharts/barchartstacked'
import data from '../datasets/simple-stacked-barchart-series.tsv'

export default {
  chart: barchartstacked,
  data,
  dataTypes: {
    serie: 'string',
    bar: 'string',
    base: 'number',
    value1: 'number',
    value2: 'number',
    value3: 'number',
  },
  mapping: {
    stacks: { value: ['bar'] },
    bars: {
      value: ['value1', 'value2', 'value3'],
      config: { aggregation: ['sum', 'sum', 'sum'] },
    },
    series: { value: ['serie'] },
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
