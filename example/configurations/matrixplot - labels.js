import matrixplot from 'rawcharts/matrixplot'
import data from '../datasets/Music.csv'

export default {
  chart: matrixplot,
  data,
  dataTypes: {
    Category: 'string',
    Format: 'string',
    Year: 'number',
    Year_date: 'date',
    Units: 'number',
    Revenues: 'number',
    'Revenues-Adjusted': 'number',
  },
  mapping: {
    x: { value: ['Category'] },
    y: { value: ['Year'] },
    color: {
      value: ['Format'],
      config: { aggregation: ['csvDistinct'] },
    },
    label: {
      value: ['Category', 'Units'],
      config: { aggregation: ['csvDistinct', 'sum'] },
    },
    size: {
      value: ['Revenues-Adjusted'],
      config: { aggregation: ['sum'] },
    },
  },
  visualOptions: {
    width: 1000,
    height: 1500,
    marginTop: 100,
    marginLeft: 100,
    sortXAxisBy: 'Total value (ascending)',
    sortYAxisBy: 'Original',
    showLabels: true,
  },
}
