import bubblechart from 'rawcharts/bubblechart'
import data from '../datasets/bubblechart-series.tsv'

export default {
  chart: bubblechart,
  data,
  dataTypes: {
    Entity: 'string',
    Year: 'number',
    'Total population (Gapminder, HYDE & UN)': 'number',
    'GDP (per capita)': 'number',
    'CO2 emissions (per capita)': 'number',
  },
  mapping: {
    x: { value: ['CO2 emissions (per capita)'] },
    y: { value: ['GDP (per capita)'] },
    size: { value: ['CO2 emissions (per capita)'] },
    connectedBy: { value: ['Year'] },
    label: { value: ['Year'] },
    series: { value: ['Entity'] },
  },
  visualOptions: {
    width: 1000,
    height: 800,
    xOrigin: false,
    showLegend: true,
    showPoints: true,
  },
}
