/*
Copied and customized from:
https://github.com/rawgraphs/rawgraphs-charts/tree/master/example/configurations/arcdiagram
*/

import chorddiagram from 'rawcharts/chorddiagram'
import data from '../datasets/energy.csv'

export default {
  chart: chorddiagram,
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
    height: 1200,
    marginTop: 200,
    marginRight: 200,
    marginBottom: 200,
    marginLeft: 100,
    ringWidth: 15,
    ringPadding: 20,
    colorRing: 'blue',
    colorChords: 'red',
    showChordGroupLabels: true,
  },
}
