import chart from 'rawcharts/slopechart'
import data from '../datasets/simple-linechart-negatives.tsv'

export default {
  chart: chart,
  data,
  dataTypes: {
    x: 'number',
    y: 'number',
    category: 'string',
  },
  mapping: {
    source: { value: ['x'] },
    target: { value: ['y'] },
    series: { value: ['category'] },
    color: { value: ['category'] },
  },
  visualOptions: {
    width: 800,
    height: 600,
  },
}
