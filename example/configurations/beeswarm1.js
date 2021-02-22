import beeswarm from 'rawcharts/beeswarm'
import data from '../datasets/Movies.tsv'

export default {
  chart: beeswarm,
  data,
  dataTypes: {
    'IMDB ID': 'string',
    Rank: 'number',
    Year: 'number',
    Title: 'string',
    Genre: 'string',
    Rating: 'number',
    'Runtime (minutes)': 'number',
    Certificate: 'string',
    'Real Worldwide Box Office (Millions)': 'number',
    'Box Office (Millions, adjusted for inflation)': 'number',
    'Budget (Millions)': 'number',
    'Budget (Millions, adjusted for inflation)': 'number',
    ROI: 'number',
  },
  mapping: {
    xValue: { value: ['Year'] },
    series: { value: ['Genre'] },
    color: { value: ['Genre'] },
    label: { value: ['Title', 'Year'] },
    size: { value: ['Budget (Millions, adjusted for inflation)'] },
  },
  visualOptions: {
    width: 500,
    height: 500,
    marginLeft: 50,
    marginBottom: 50,
    autoHideLabels: true,
  },
}
