import ganttChart from 'rawcharts/ganttChart'
import data from '../datasets/italian-presidents.tsv'

export default {
  chart: ganttChart,
  data,
  dataTypes: {
    Politician: 'string',
    'Start date': {
      type: 'date',
      dateFormat: 'YYYY-MM-DD',
    },
    'End date': {
      type: 'date',
      dateFormat: 'YYYY-MM-DD',
    },
    Role: 'string',
  },
  mapping: {
    startDate: { value: ['Start date'] },
    endDate: { value: ['End date'] },
    group: { value: ['Role'] },
    //color: { value: ['Role'] },
  },
  visualOptions: {
    width: 700,
    height: 500,
    showLegend: true,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 15,
    marginLeft: 50,
    alignLabels: true,
    sortGroupsBy: 'ascending',
    barPadding: 0.8,
  },
}
