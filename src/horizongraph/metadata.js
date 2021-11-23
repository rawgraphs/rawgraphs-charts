import { t } from '@rawgraphs/rawgraphs-core'
import icon from './horizongraph.svg'
import thumbnail from './horizongraph_thumb.svg'

export const metadata = {
  name: 'Horizon graph',
  id: 'rawgraphs.horizongraph',
  thumbnail,
  icon,
  categories: [t('categories.time series'), t('categories.correlations')],
  description: t('charts.horizongraph.description'),
  code:
    'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/horizongraph',
  tutorial: 'https://rawgraphs.io/learning/how-to-make-a-horizon-graph/',
}
