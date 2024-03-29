import treemap from 'rawcharts/treemap'
import data from '../datasets/simple-hierarchy.tsv'

export default {
  chart: treemap,
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
    width: 500,
    height: 500,
    drawHierarchy: true,
    showLabelsOutline: true,
    showHierarchyLabels: true,
    padding: 10,
  },
}
