import { t } from '@rawgraphs/rawgraphs-core'
import icon from './linechart.svg'
import thumbnail from './linechart_thumb.svg'

export const metadata = {
  name: 'Line chart',
  id: 'rawgraphs.linechart',
  thumbnail,
  icon,
  categories: [t('categories.time series'), t('categories.correlations')],
  description: t('charts.linechart.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/linechart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-line-chart/',
}
