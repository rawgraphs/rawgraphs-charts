import chart from 'rawcharts/bumpchart'
import data from '../datasets/banks-rankings.tsv'

export default {
  chart: chart,
  data,
  dataTypes: {
    Bank: 'string',
    Year: {
      type: 'date',
      dateFormat: 'YYYY',
    },
    Rank: 'number',
  },
  mapping: {
    // series: { value: ['Category'] },
    streams: { value: ['Bank'] },
    x: { value: ['Year'] },
    size: { value: ['Rank'] },
    //size: { value: ['Revenues-Adjusted'] },
    //color: { value: ['Category'] },
  },
  visualOptions: {
    useSameScale: true,
    streamsOffset: 'stackOffsetSilhouette',
    streamsOrder: 'stackOrderInsideOut',
    //interpolation: 'curveLinear',
    streamsPadding: 5,
    labelsType: 'On path',
  },
}
