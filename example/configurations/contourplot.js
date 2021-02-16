import contourPlot from 'rawcharts/contourPlot'
import data from '../datasets/Movies.tsv'

export default {
  chart: contourPlot,
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
    y: { value: ['Box Office (Millions, adjusted for inflation)'] },
  },
  visualOptions: {
    width: 800,
    height: 600,
    marginTop: 50,
    marginRight: 50,
    marginBottom: 50,
    marginLeft: 50,
    showLegend: true,
    showCountLabels: true,
    showLabelsOutline: true,
    autoHideLabels: true,
    showPoints: true,
  },
}
