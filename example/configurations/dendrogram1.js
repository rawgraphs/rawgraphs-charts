import dendrogram from 'rawcharts/dendrogram'
import data from '../datasets/WineTasting.tsv'

export default {
  chart: dendrogram,
  data,
  dataTypes: {
    Root: 'string',
    Level1: 'string',
    Level2: 'string',
    Level3: 'string',
    results: 'number',
  },
  mapping: {
    hierarchy: { value: ['Root', 'Level1', 'Level2'] },
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
    width: 500,
    height: 1500,
    marginRight: 100,
    showHierarchyLabels: true,
    sizeOnlyLeaves: false,
    layout: 'Cluster Dendogram',
    maxRadius: 15,
    sortBy: 'Size (ascending)',
    showLabelsOutline: true,
  },
}
