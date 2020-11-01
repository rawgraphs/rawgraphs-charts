import barchartstacked from 'rawcharts/barchartstacked'
import data from '../datasets/Music.csv'

export default {
  chart: barchartstacked,
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
    stacks: { value: ['Year'] },
    bars: { value: ['Category'] },
    size: { value: ['Revenues-Adjusted'] },
    color: { value: ['Category'] },
  },
  visualOptions: {
    width: 1000,
    height: 700,
    padding: 3,
    marginTop: 20,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    sortSeriesBy: 'Value (descending)',
  },
}
