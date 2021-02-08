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
    series: { value: ['Format'] },
    lines: { value: ['Format'] },
    x: { value: ['Year_date'] },
    y: {
      value: ['Revenues-Adjusted'],
      config: { aggregation: ['sum'] },
    },
    color: { value: ['Category'] },
  },
  visualOptions: {
    width: 1000,
    height: 3000,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 15,
    marginLeft: 50,
    showPoints: true,
    showSeriesLabels: true,
    repeatAxesLabels: true,
    showLabels: true,
    labelsPosition: 'side',
    interpolation: 'Natural',
    pointsRadius: 1.5,
    columnsNumber: 2,
    sortSeriesBy: 'Total value (descending)',
  },
}
