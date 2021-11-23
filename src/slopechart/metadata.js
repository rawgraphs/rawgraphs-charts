import { t } from '@rawgraphs/rawgraphs-core'
import icon from './slopechart.svg'
import thumbnail from './slopechart_thumb.svg'

export const metadata = {
  name: 'Slope chart',
  id: 'rawgraphs.slopechart',
  thumbnail,
  icon,
  categories: [t('categories.correlations')],
  description: t('charts.slopechart.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/slopechart',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-slope-graph/',
}
