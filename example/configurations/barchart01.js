import barchart from 'rawcharts/barchart'
import data from '../datasets/Music.csv'

export default {
  chart: barchart,
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
    series: { value: ['Category'] },
    bars: { value: ['Year'] },
    size: { value: ['Revenues-Adjusted'], config: { aggregation: ['sum'] } },
    color: { value: ['Category'] },
  },
  visualOptions: {
    width: 1000,
    height: 700,
    padding: 1,
    barsOrientation: 'vertical',
  },
}
