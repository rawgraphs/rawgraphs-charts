import bubblechart from 'rawcharts/bubblechart'
import data from '../datasets/Movies.tsv'

export default {
  chart: bubblechart,
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
    color: { value: ['Box Office (Millions, adjusted for inflation)'] },
    label: {
      value: ['Title', 'Budget (Millions, adjusted for inflation)', 'Title'],
    },
    size: { value: ['Box Office (Millions, adjusted for inflation)'] },
    //connectedBy: { value: ['Year'] },
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
    autoHideLabels: true,
    labelStyles: ['labelPrimary', 'labelItalic', 'labelSecondary'],
  },
}
