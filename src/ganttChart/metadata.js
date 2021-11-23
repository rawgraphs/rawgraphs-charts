import { t } from '@rawgraphs/rawgraphs-core'
import icon from './ganttChart.svg'
import thumbnail from './ganttChart_thumb.svg'

export const metadata = {
  name: 'Gantt chart',
  thumbnail,
  icon,
  categories: [t('categories.time series'), t('categories.correlations')],
  description: t('charts.ganttChart.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/ganttChart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-gantt-chart/',
}
