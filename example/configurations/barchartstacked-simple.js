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
    bars: { value: ['Format'] },
    size: { value: ['Revenues-Adjusted'] },
  },
  visualOptions: {
    width: 1000,
    height: 700,
    padding: 3,
    marginTop: 50,
    marginBottom: 50,
    marginRight: 50,
    marginLeft: 50,
    sortSeriesBy: 'Value (descending)',
    useSameScale: false,
  },
}
