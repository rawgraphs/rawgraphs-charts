import linechart from 'rawcharts/linechart'
import data from '../datasets/simple-linechart-negatives.tsv'

export default {
  chart: linechart,
  data,
  dataTypes: {
    category: 'string',
    x: 'number',
    y: 'number',
  },
  mapping: {
    series: { value: ['category'] },
    lines: { value: ['category'] },
    x: { value: ['x'] },
    y: { value: ['y'] },
    color: { value: ['category'] },
  },
  visualOptions: {
    width: 1000,
    height: 800,
    showPoints: true,
    interpolation: 'Natural',
    pointsRadius: 2,
    columnsNumber: 2,
    gutterX: 50,
    gutterY: 50,
    marginLeft: 50,
    marginBottom: 20,
    marginRight: 15,
    marginTop: 10,
    sortSeriesBy: 'Total value (descending)',
    labelsPosition: 'inline',
    showLabels: true,
  },
}
