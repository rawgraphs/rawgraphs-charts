import linechart from 'rawcharts/linechart'
import data from '../datasets/Music.csv'

export default {
  chart: linechart,
  data,
  dataTypes: {
    Category: 'string',
    Format: 'string',
    Year: 'number',
    Units: 'number',
    Revenues: 'number',
    'Revenues-Adjusted': 'number',
    Year_date: {
      type: 'date',
      dateFormat: 'YYYY-MM-DD',
    },
  },
  mapping: {
    //series: { value: undefined },
    lines: { value: ['Category'] },
    x: { value: ['Year_date'] },
    y: { value: ['Revenues-Adjusted'] },
    //color: { value: ['Category'] },
  },
  visualOptions: {
    width: 1000,
    height: 700,
    showPoints: true,
    interpolation: 'Natural',
    pointsRadius: 2,
    marginLeft: 50,
    marginBottom: 20,
    marginRight: 15,
  },
}
