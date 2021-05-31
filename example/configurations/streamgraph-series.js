import chart from 'rawcharts/streamgraph'
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
    // series: { value: ['Category'] },
    streams: { value: ['Category'] },
    x: { value: ['Year_date'] },
    size: { value: ['Revenues-Adjusted'] },
    //color: { value: ['Category'] },
  },
  visualOptions: {
    useSameScale: true,
    streamsOffset: 'Wiggle',
    streamsPadding: 100,
    streamsOrder: 'stackOrderAppearance',
  },
}
