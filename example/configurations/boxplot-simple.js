import boxplot from 'rawcharts/boxplot'
import data from '../datasets/cities.csv'

export default {
  chart: boxplot,
  data,
  dataTypes: {
    Continent: 'string',
    Country: 'string',
    City: 'string',
    Population: 'number',
  },
  mapping: {
    group: {
      value: ['Continent'],
    },
    value: {
      value: ['Population'],
    },
    color: {
      value: ['Continent'],
      config: { aggregation: ['csvDistinct', 'sum'] },
    },
  },
  visualOptions: {
    width: 1000,
    height: 700,
    padding: 50,
  },
}
