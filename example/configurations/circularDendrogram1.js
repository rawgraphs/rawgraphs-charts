import circularDendrogram from 'rawcharts/circularDendrogram'
import data from '../datasets/WineTasting.tsv'

export default {
  chart: circularDendrogram,
  data,
  dataTypes: {
    Root: 'string',
    Level1: 'string',
    Level2: 'string',
    Level3: 'string',
    results: 'number',
  },
  mapping: {
    hierarchy: { value: ['Root', 'Level1', 'Level2', 'Level3'] },
    color: {
      value: ['Level1'],
      config: { aggregation: ['csvDistinct'] },
    },
    label: {
      value: ['Level2', 'results'],
      config: { aggregation: ['csvDistinct', 'sum'] },
    },
    size: {
      value: ['results'],
      config: { aggregation: ['sum'] },
    },
  },
  visualOptions: {
    width: 800,
    height: 800,
    marginRight: 50,
    showHierarchyLabels: true,
    layout: 'Cluster Dendogram',
    maxRadius: 15,
    sortBy: 'Size (ascending)',
  },
}
