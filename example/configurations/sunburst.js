import sunburst from 'rawcharts/sunburst'
import data from '../datasets/WineTasting.tsv'

export default {
  chart: sunburst,
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
      value: ['Level1', 'results'],
      config: { aggregation: ['csvDistinct', 'sum'] },
    },
    size: {
      value: ['results'],
      config: { aggregation: ['sum'] },
    },
  },
  visualOptions: {
    width: 500,
    height: 500,
    showHierarchyLabels: true,
  },
}
