import chart from 'rawcharts/bumpchart'
import data from '../datasets/covid_countries.tsv'

export default {
  chart: chart,
  data,
  dataTypes: {
    country: 'string',
    week: 'number',
    deaths: 'number',
  },
  mapping: {
    streams: { value: ['country'] },
    x: { value: ['week'] },
  },
  visualOptions: {
    width: 1000,
    height: 700,
    useSameScale: true,
    labelsType: 'On point',
    streamsPadding: 2,
    marginTop: 0,
  },
}
