import alluvialdiagram from 'rawcharts/alluvialdiagram'
import data from '../datasets/Titanic.tsv'

export default {
  chart: alluvialdiagram,
  data,
  dataTypes: {
    Class: 'number',
    Survival: 'string',
    Name: 'string',
    Gender: 'string',
    'Age group': 'string',
    Age: 'number',
    'Siblings / Spouse aboard': 'number',
    'Parents / Children aboard': 'number',
    'Ticket number': 'number',
    Fare: 'number',
    'Fare group': 'number',
    Cabin: 'string',
    'Port of Embarkation': 'string',
    Boat: 'string',
    Destination: 'string',
  },
  mapping: {
    steps: { value: ['Class', 'Survival', 'Age group', 'Gender'] },
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
  },
}
