import { t } from '@rawgraphs/rawgraphs-core'
import icon from './piechart.svg'
import thumbnail from './piechart_thumb.svg'

export const metadata = {
  name: 'Pie chart',
  id: 'rawgraphs.piechart',
  thumbnail,
  icon,
  categories: [t('categories.proportions')],
  description: t('charts.piechart.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/piechart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-pie-chart/',
}
