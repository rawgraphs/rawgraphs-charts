import chart from 'rawcharts/bumpchart'
import data from '../datasets/Music-ranking.tsv'

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
    Rank: 'number',
    // Year_date: {
    //   type: 'date',
    //   dateFormat: 'YYYY-MM-DD',
    // },
  },
  mapping: {
    // series: { value: ['Category'] },
    streams: { value: ['Category'] },
    x: { value: ['Year'] },
    size: { value: ['Revenues-Adjusted'] },
    rank: { value: ['Rank'], config: { aggregation: ['mean'] } },
    //color: { value: ['Category'] },
  },
  visualOptions: {
    useSameScale: true,
    // streamsOffset: 'stackOffsetSilhouette',
    interpolation: 'curveLinear',
  },
}
