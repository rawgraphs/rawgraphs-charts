import circlepacking from 'rawcharts/circlepacking'
import data from '../datasets/simple-hierarchy.tsv'

export default {
  chart: circlepacking,
  data,
  dataTypes: {
    Level1: 'string',
    Level2: 'string',
    Size: 'number',
  },
  mapping: {
    hierarchy: { value: ['Level1', 'Level2'] },
    color: {
      value: ['Level1'],
      config: { aggregation: ['csvDistinct'] },
    },
    label: {
      value: ['Level2', 'Size'],
      config: { aggregation: ['csvDistinct', 'sum', 'csvDistinct'] },
    },
    size: {
      value: ['Size'],
      config: { aggregation: ['sum'] },
    },
  },
  visualOptions: {
    width: 2500,
    height: 2500,
    showLegend: true,
    legendWidth: 200,
  },
}
