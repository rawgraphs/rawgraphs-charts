import circlepacking from 'rawcharts/circlepacking'
import data from '../datasets/WineTasting.tsv'

export default {
  chart: circlepacking,
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
      value: ['Root'],
      config: { aggregation: ['csvDistinct'] },
    },
    label: {
      value: ['results'],
      config: { aggregation: ['sum'] },
    },
    // size: {
    //   value: ['results'],
    //   config: { aggregation: ['sum'] },
    // },
  },
  visualOptions: {
    width: 800,
    height: 700,
    showLegend: true,
    showLabelsOutline: true,
    showHierarchyLabels: true,
    autoHideLabels: true,
  },
}
