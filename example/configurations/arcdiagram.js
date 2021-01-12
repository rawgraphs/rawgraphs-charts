import arcdiagram from 'rawcharts/arcdiagram'
import data from '../datasets/energy.csv'

export default {
  chart: arcdiagram,
  data,
  dataTypes: {
    source: 'string',
    target: 'string',
    value: 'number',
  },
  mapping: {
    source: { value: ['source'] },
    target: { value: ['target'] },
    size: {
      value: ['value'],
      config: { aggregation: ['sum'] },
    },
  },
  visualOptions: {
    width: 1200,
    height: 700,
  },
}
