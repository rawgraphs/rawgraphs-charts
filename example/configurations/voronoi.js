import chart from 'rawcharts/voronoidiagram'
import data from '../datasets/Movies.tsv'

export default {
  chart: chart,
  data,
  dataTypes: {
    Year: {
      type: 'date',
      dateFormat: 'YYYY',
    },
    'Box Office (Millions, adjusted for inflation)': 'number',
    'Budget (Millions, adjusted for inflation)': 'number',
    Rating: 'number',
    Title: 'string',
    Genre: 'string',
  },
  mapping: {
    x: { value: ['Budget (Millions, adjusted for inflation)'] },
    y: { value: ['Year'] },
    color: { value: ['Genre'] },
    label: { value: ['Title', 'Genre'] },
  },
  visualOptions: {
    width: 800,
    height: 600,
    marginTop: 50,
    marginRight: 50,
    marginBottom: 50,
    marginLeft: 50,
    showLegend: true,
    showLabelsOutline: true,
    showPoints: true,
    pointsRadius: 3,
    autoHideLabels: true,
  },
}
