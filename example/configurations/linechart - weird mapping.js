import linechart from 'rawcharts/linechart'
import data from '../datasets/Music.csv'

export default {
  chart: linechart,
  data,
  dataTypes: {
    Category: 'string',
    Format: 'string',
    Year: 'number',
    Year_date: {
      type: 'date',
      dateFormat: 'YYYY-MM-DD',
    },
    Units: 'number',
    Revenues: 'number',
    'Revenues-Adjusted': 'number',
  },
  mapping: {
    //series: { value: [] },
    lines: { value: ['Category'] },
    x: { value: ['Year_date'] },
    y: { value: ['Revenues-Adjusted'] },
    color: { value: ['Format'] },
  },
  visualOptions: {
    width: 1000,
    height: 800,
    showPoints: true,
    interpolation: 'Natural',
    pointsRadius: 2,
    columnsNumber: 2,
    gutterX: 50,
    gutterY: 60,
    marginLeft: 50,
    marginBottom: 20,
    marginRight: 15,
    marginTop: 10,
  },
}
