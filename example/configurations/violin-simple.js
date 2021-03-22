import violinplot from 'rawcharts/violinplot'
import data from '../datasets/cities.csv'

export default {
  chart: violinplot,
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
    padding: 100,
    marginLeft: 100,
    interpolation: 'Linear',
    sortGroupsBy: 'valueDescending',
  },
}
