import alluvialdiagram from 'rawcharts/alluvialdiagram'
import data from '../datasets/athletes.csv'

export default {
  chart: alluvialdiagram,
  data,
  dataTypes: {
    nationality: 'string',
    sport: 'string',
  },
  mapping: {
    steps: { value: ['nationality', 'sport'] },
  },
  visualOptions: {
    width: 805,
    height: 1050,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    background: 'white',
    nodesWidth: 5,
    nodesPadding: 5,
    sortNodesBy: 'Total value (descending)',
  },
}
