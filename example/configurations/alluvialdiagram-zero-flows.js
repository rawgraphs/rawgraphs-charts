import alluvialdiagram from 'rawcharts/alluvialdiagram'
import data from '../datasets/alluvial-sample.csv'

export default {
  chart: alluvialdiagram,
  data,
  dataTypes: {
    // step 1,step 2,step 3,step 4,Value
    // string, string, string, string, number
    'step 1': 'string',
    'step 2': 'string',
    'step 3': 'string',
    'step 4': 'string',
    Value: 'number',
  },
  mapping: {
    steps: { value: ['step 1', 'step 2', 'step 3', 'step 4'] },
    size: { value: 'Value' },
  },
  visualOptions: {
    width: 1200,
    height: 700,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    background: 'white',
    nodesWidth: 50,
    sortNodesBy: 'Total value (descending)',
    showValues: true,
  },
}
