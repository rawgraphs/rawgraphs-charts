import charts from 'rawcharts'
import chart from 'rawcharts/horizongraph'
import data from '../datasets/Music.csv'

export default {
  chart: chart,
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
    group: { value: ['Category'] },
    x: { value: ['Year_date'] },
    y: { value: ['Revenues-Adjusted'], config: { aggregation: ['sum'] } },
  },
  visualOptions: {
    negativeStyle: 'mirrored',
    bands: 3,
  },
}
