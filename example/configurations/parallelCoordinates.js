import chart from 'rawcharts/parallelcoordinates'
import data from '../datasets/cars.csv'

export default {
  chart: chart,
  data,
  // name,brand,economy (mpg),cylinders,displacement (cc),power (hp),weight (lb),0-60 mph (s),year

  dataTypes: {
    name: 'string',
    brand: 'string',
    'economy (mpg)': 'number',
    cylinders: 'number',
    'displacement (cc)': 'number',
    'power (hp)': 'number',
    'weight (lb)': 'number',
    '0-60 mph (s)': 'number',
    year: 'number',
  },
  mapping: {
    dimensions: {
      value: ['economy (mpg)', 'displacement (cc)', '0-60 mph (s)'],
    },
    color: { value: ['brand'] },
  },
  visualOptions: {
    width: 1200,
    height: 700,
    orientation: 'vertical',
  },
}
