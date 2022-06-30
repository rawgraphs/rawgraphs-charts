import charts from 'rawcharts'
import chart from 'rawcharts/horizongraph'
import data from '../datasets/simple-horizon.tsv'

export default {
  chart: chart,
  data,
  dataTypes: {
    group: 'string',
    value: 'number',
    xpos: 'number',
  },
  mapping: {
    group: { value: ['group'] },
    x: { value: ['xpos'] },
    y: { value: ['value'], config: { aggregation: ['sum'] } },
  },
  visualOptions: {
    negativeStyle: 'mirrored',
    bands: 3,
  },
}
